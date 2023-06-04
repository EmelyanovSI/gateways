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
