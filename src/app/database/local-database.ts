import Dexie from 'dexie';

export class LocalDatabase extends Dexie {
  bills: Dexie.Table<{ id: string; month: string }, string>;
  fuel: Dexie.Table<{ id: string; fill_date: Date }, string>;

  constructor() {
    super('pegasus');
    this.version(1).stores({
      bills: 'id, month',
      fuel: 'id, fill_date',
    });
    this.bills = this.table('bills');
    this.fuel = this.table('fuel');
    console.log('Database initialized');
  }
}

export const localDatabase = new LocalDatabase();