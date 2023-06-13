export enum Env {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Staging = 'staging'
}

export enum ThemeMode {
  Light = 'light',
  Dark = 'dark'
}

export enum DeviceStatus {
  Online = 'online',
  Offline = 'offline'
}

export const {
  NODE_ENV = Env.Development,
  REACT_APP_API_URI
} = process.env;
