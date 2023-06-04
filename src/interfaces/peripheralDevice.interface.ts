import { DeviceStatus } from '@constants';

export interface PeripheralDevice {
  uid: number;
  vendor: string;
  dateCreated: Date;
  status: DeviceStatus;
}
