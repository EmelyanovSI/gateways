export enum Env {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Staging = 'staging'
}

export enum DeviceStatus {
  Online = 'online',
  Offline = 'offline'
}

export const Default = {
  PORT: 3000,
  ERROR_STATUS_CODE: 500,
  ERROR_MESSAGE: 'Something went wrong',
  MAX_DEVICES_COUNT: 10
};

export const GATEWAYS = [{
  serialNumber: 'ABC123',
  name: 'Default Gateway',
  ip: '192.168.1.1',
  devices: [{
    uid: 1,
    vendor: 'Default Vendor'
  }, {
    uid: 2,
    vendor: 'Another Vendor'
  }]
}, {
  serialNumber: 'ABC1234',
  name: 'Gateway 2',
  ip: '192.168.1.2',
  devices: [{
    uid: 3,
    vendor: 'Vendor A'
  }, {
    uid: 4,
    vendor: 'Vendor B'
  }]
}, {
  serialNumber: '123',
  name: 'Gateway 1',
  ip: '192.168.1.3',
  devices: []
}];
