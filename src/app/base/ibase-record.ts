import { ChangeType } from './change-type';

export interface IBaseRecord {
  endpoint: string;
  id?: string;
  changeType?: ChangeType;
}
