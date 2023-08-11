import { type ListenerEffectAPI } from '@reduxjs/toolkit';

import { type stopLocalStream } from '../../actions';
import { type RootState, type AppDispatch } from '../../../store';
import { setIsLocalStreamActive } from '../../../slices';

import { getLocalStream, setLocalStream } from './stream';

export const stopLocalStreamEffect = (
  _: ReturnType<typeof stopLocalStream>,
  listenerApi: ListenerEffectAPI<RootState, AppDispatch>
) => {
  const localStream = getLocalStream();

  if (localStream) {
    localStream.getTracks().forEach(track => {
      track.stop();
    });

    setLocalStream(null);

    listenerApi.dispatch(setIsLocalStreamActive(false));
  } else {
    console.warn(
      'stopLocalStreamEffect was invoked, but there is no active local stream'
    );
  }
};
