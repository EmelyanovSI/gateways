import { Status, ThemeMode } from '../constants';

export interface ThemeState {
  mode: ThemeMode;
}

export interface FetchState {
  status: Status;
  message: string;
}
