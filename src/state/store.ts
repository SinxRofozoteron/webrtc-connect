import {
  configureStore as configureRTKStore,
  type PreloadedState,
  type StateFromReducersMapObject
} from '@reduxjs/toolkit';

import listenerMiddleware from './listenerMiddleware/middleware';
import { localStreamReducer } from './slices';

export const reducersMap = {
  localStream: localStreamReducer
};

export type RootState = StateFromReducersMapObject<typeof reducersMap>;

export const configureStore = (preloadedState?: PreloadedState<RootState>) => {
  const rootStore = configureRTKStore({
    devTools: {
      name: 'WebRTC'
    },
    preloadedState,
    reducer: reducersMap,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().prepend(listenerMiddleware.middleware)
  });

  return rootStore;
};

export type RootStore = ReturnType<typeof configureStore>;

export type AppDispatch = RootStore['dispatch'];
