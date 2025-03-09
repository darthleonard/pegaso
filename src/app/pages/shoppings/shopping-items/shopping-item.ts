import { IBaseRecord } from 'src/app/base/ibase-record';

const ENDPOINT = 'shoppingItems' as const;

export type ShoppingItem = IBaseRecord & {
  endpoint: typeof ENDPOINT;
  id: string;
  creation_date: Date;
  last_mod_date: Date;
  item_name: string;
  description: string;
};
