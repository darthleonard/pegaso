import Dexie from 'dexie';

export class LocalDatabase extends Dexie {
  bills: Dexie.Table<{ id: string; month: string }, string>;
  fuel: Dexie.Table<{ id: string; fill_date: Date }, string>;
  shoppingItems: Dexie.Table<{ id: string; item_name: string }, string>;

  constructor() {
    super('pegasus');
    this.version(1).stores({
      bills: 'id, month',
      fuel: 'id, fill_date',
      shoppingItems: 'id, item_name',
    });
    this.bills = this.table('bills');
    this.fuel = this.table('fuel');
    this.shoppingItems = this.table('shoppingItems');
    console.log('Database initialized');
  }
}

export const localDatabase = new LocalDatabase();
