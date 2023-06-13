import { DeviceStatus } from '../constants';

export interface Device {
  uid: number;
  vendor: string;
  dateCreated: string;
  status: DeviceStatus;
}
