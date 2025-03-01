import { IBaseRecord } from 'src/app/base/ibase-record';

const ENDPOINT = 'fuel' as const;

export type Fuel = IBaseRecord & {
  endpoint: typeof ENDPOINT;
  id: string;
  creation_date: Date;
  last_mod_date: Date;
  fill_date: Date;
  total: number;
  fuel_amount: number;
  odometer: number;
};
