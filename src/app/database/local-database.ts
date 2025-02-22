import Dexie from 'dexie';

export class LocalDatabase extends Dexie {
  bills: Dexie.Table<{ id: string; month: string }, string>;

  constructor() {
    super('pegasus');
    this.version(1).stores({
      bills: 'id, month',
    });
    this.bills = this.table('bills');
    console.log('Database initialized');
  }
}

export const localDatabase = new LocalDatabase();