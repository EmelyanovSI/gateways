import { DeviceStatus } from '../constants';

export interface Device {
  uid: number;
  vendor: string;
  dateCreated: Date;
  status: DeviceStatus;
}
