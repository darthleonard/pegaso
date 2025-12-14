import { Injectable } from '@angular/core';
import { localDatabase } from '../database/local-database';
import { Capacitor } from '@capacitor/core';
// Avoid direct dependency on @capacitor/filesystem package so code compiles
// Use runtime Plugins object when available.
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
export class DatabaseExportService {
  // Export DB to CSV. On web triggers download. On native saves to Documents via Capacitor Filesystem.
  async exportDatabaseCSV(filename = 'pegasus_database.csv') {
    const tables = localDatabase.tables.map((t) => t.name);
    const rows: string[] = [];
    rows.push('table,id,json');

    for (const tableName of tables) {
      try {
        const records = await localDatabase.table(tableName).toArray();
        for (const r of records) {
          const id = (r && (r as any).id) || '';
          const json = JSON.stringify(r);
          const safeJson = json.replace(/"/g, '""');
          rows.push(`${tableName},${id},"${safeJson}"`);
        }
      } catch (err) {
        console.error(`Error exporting table ${tableName}:`, err);
      }
    }

    const csv = rows.join('\n');

    // If running on web, use blob download
    if (Capacitor.getPlatform && Capacitor.getPlatform() === 'web') {
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return { platform: 'web' };
    }

    // Native: write to Documents directory via Capacitor Filesystem
    try {
      if (FilesystemPlugin && FilesystemPlugin.writeFile) {
        await FilesystemPlugin.writeFile({
          path: filename,
          data: csv,
          directory: Directory.Documents,
          recursive: true,
        });
        return {
          platform: 'native',
          path: filename,
          directory: Directory.Documents,
        };
      } else {
        throw new Error('Filesystem plugin not available');
      }
    } catch (err) {
      console.error('Error saving file natively', err);
      // fallback to web download
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return { platform: 'web' };
    }
  }
}
