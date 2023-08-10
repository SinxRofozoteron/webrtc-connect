import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit';

import { type RootState, type AppDispatch } from '../store';

import { startLocalStream, stopLocalStream } from './actions';
import { startLocalStreamEffect, stopLocalStreamEffect } from './effects';

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
})

export default listenerMiddleware;
