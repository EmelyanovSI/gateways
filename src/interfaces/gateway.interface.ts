import { Device } from '@interfaces/device.interface';

export interface Gateway {
  serialNumber: string;
  name: string;
  ipv4Address: string;
  devices: Device[];
}
