import { Component, OnInit } from '@angular/core';
import { localDatabase } from 'src/app/database/local-database';
import { OfflineDataService } from 'src/app/services/offline-data.service';
import { ChangeType } from 'src/app/base/change-type';
import { Bill } from '../bills/bill';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.page.html',
  styleUrls: ['./sync.page.scss'],
  standalone: false,
})
export class SyncPage implements OnInit {
  constructor(private readonly offlineDataService: OfflineDataService) {}

  newBills: Bill[] = [];
  editedBills: Bill[] = [];
  deletedBills: Bill[] = [];

  tables: {
    name: string;
    newRecords: any[];
    editedRecords: any[];
    deletedRecords: any[];
  }[] = [];

  ngOnInit(): void {
    for (const table of localDatabase.tables) {
      this.offlineDataService.getAllRecords(table.name).then((r) => {
        this.tables.push({
          name: table.name,
          newRecords: r.filter((b) => b.changeType === ChangeType.New),
          editedRecords: r.filter((b) => b.changeType === ChangeType.Edited),
          deletedRecords: r.filter((b) => b.changeType === ChangeType.Deleted),
        });
      });
    }
  }
}
