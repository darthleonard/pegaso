import { IBaseRecord } from "src/app/base/ibase-record";

const ENDPOINT = 'bills' as const;

export type Bill = IBaseRecord &{
  endpoint: typeof ENDPOINT;
  cable?: number;
  creation_date?: string;
  electricity?: number;
  gas?: number;
  house?: number;
  id?: string;
  las_mod_date?: string;
  month: string;
  water?: number;
};
