import { PeripheralDevice } from '@interfaces/peripheralDevice.interface';

export interface Gateway {
  serialNumber: string;
  name: string;
  ipv4Address: string;
  devices: PeripheralDevice[];
}
