import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { NODE_ENV, Env } from '../constants';
import themeReducer from './themeSlice';
import {
  ThemeState
} from './state';

interface Reducer<T> {
  theme: ThemeState & T;
}

const isProduction = NODE_ENV === Env.Production;

const [
  themePersistor
] = [
  { key: 'theme', storage, blacklist: [] }
];

export const store = configureStore({
  reducer: combineReducers<Reducer<PersistPartial>>({
    theme: persistReducer<ThemeState>(themePersistor, themeReducer)
  }),
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    });

    if (!isProduction) {
      return middleware.concat(logger);
    }

    return middleware;
  },
  devTools: !isProduction,
  preloadedState: {},
  enhancers: []
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
