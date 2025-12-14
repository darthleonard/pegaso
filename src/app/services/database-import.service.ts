import { Injectable } from '@angular/core';
import { localDatabase } from '../database/local-database';
import { Capacitor } from '@capacitor/core';
// Avoid direct dependency on @capacitor/filesystem package so code compiles
const CapacitorPlugins: any =
  (Capacitor as any).Plugins || (window as any).Capacitor?.Plugins;
const FilesystemPlugin: any = CapacitorPlugins?.Filesystem;
const Directory: any = (Capacitor as any).Directory ||
  (CapacitorPlugins && CapacitorPlugins.Directory) || {
    Documents: 'DOCUMENTS',
  };

@Injectable({
  providedIn: 'root',
})
export class DatabaseImportService {
  // Import either from a web File or from a native filename in Documents (Capacitor)
  async importDatabaseFromCSV(options: {
    file?: File;
    nativeFilename?: string;
  }) {
    let text = '';

    if (options.file) {
      text = await options.file.text();
    } else if (options.nativeFilename) {
      // read from Capacitor Filesystem
      try {
        if (!FilesystemPlugin || !FilesystemPlugin.readFile) {
          throw new Error('Filesystem plugin not available');
        }
        const result = await FilesystemPlugin.readFile({
          path: options.nativeFilename,
          directory: Directory.Documents,
        });
        // result.data is base64 encoded string
        const b64 = result.data;
        // decode base64 to UTF-8 string
        const bytes = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
        text = new TextDecoder().decode(bytes);
      } catch (err) {
        console.error('Error reading native file', err);
        throw err;
      }
    } else {
      throw new Error('No source provided for import');
    }

    // parse CSV (expect header table,id,json)
    const lines = text.split(/\r?\n/).filter((l) => l.trim().length > 0);
    if (lines.length <= 1) return;
    const header = lines[0].split(',');
    if (header[0] !== 'table' || header[1] !== 'id' || header[2] !== 'json') {
      throw new Error('Invalid CSV header');
    }

    const parsed: Record<string, any[]> = {};
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const firstComma = line.indexOf(',');
      if (firstComma === -1) continue;
      const secondComma = line.indexOf(',', firstComma + 1);
      if (secondComma === -1) continue;
      const table = line.substring(0, firstComma);
      const id = line.substring(firstComma + 1, secondComma);
      let jsonField = line.substring(secondComma + 1).trim();
      if (jsonField.startsWith('"') && jsonField.endsWith('"')) {
        jsonField = jsonField.substring(1, jsonField.length - 1);
      }
      const jsonStr = jsonField.replace(/""/g, '"');
      try {
        const obj = JSON.parse(jsonStr);
        if (!parsed[table]) parsed[table] = [];
        parsed[table].push(obj);
      } catch (err) {
        console.error(`Error parsing JSON on line ${i + 1}`, err);
        throw err;
      }
    }

    // backup
    const tableNames = localDatabase.tables.map((t) => t.name);
    const backup: Record<string, any[]> = {};
    for (const tn of tableNames) {
      backup[tn] = await localDatabase.table(tn).toArray();
    }

    // apply import inside transaction
    try {
      await localDatabase.transaction('rw', tableNames, async () => {
        for (const tn of tableNames) {
          const newRecords = parsed[tn] || [];
          await localDatabase.table(tn).clear();
          if (newRecords.length) {
            await localDatabase.table(tn).bulkPut(newRecords);
          }
        }
      });
    } catch (err) {
      console.error('Import failed, attempting to restore backup:', err);
      try {
        await localDatabase.transaction('rw', tableNames, async () => {
          for (const tn of tableNames) {
            await localDatabase.table(tn).clear();
            const records = backup[tn] || [];
            if (records.length) await localDatabase.table(tn).bulkPut(records);
          }
        });
      } catch (restoreErr) {
        console.error(
          'Failed to restore backup after import failure:',
          restoreErr
        );
        throw new Error(
          'Import failed and restore also failed. Data may be inconsistent.'
        );
      }

      throw new Error('Import failed and was restored: ' + err);
    }
  }
}
