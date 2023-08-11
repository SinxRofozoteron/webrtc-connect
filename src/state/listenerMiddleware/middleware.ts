import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit';

import { type RootState, type AppDispatch } from '../store';
import { setActiveVideoDevice } from '../slices';

import { startLocalStream, stopLocalStream } from './actions';
import {
  startLocalStreamEffect,
  stopLocalStreamEffect,
  changeVideoDeviceEffect
} from './effects';

const listenerMiddleware = createListenerMiddleware();

export type AppStartListening = TypedStartListening<RootState, AppDispatch>;

const startListening = listenerMiddleware.startListening as AppStartListening;

startListening({
  effect: startLocalStreamEffect,
  actionCreator: startLocalStream
});

startListening({
  effect: stopLocalStreamEffect,
  actionCreator: stopLocalStream
});

startListening({
  actionCreator: setActiveVideoDevice,
  effect: changeVideoDeviceEffect
});

export default listenerMiddleware;
