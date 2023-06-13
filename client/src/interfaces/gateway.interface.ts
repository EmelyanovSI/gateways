import { Device } from './device.interface';

export interface Gateway {
  serialNumber: string;
  name: string;
  ip: string;
  devices: Device[];
}
