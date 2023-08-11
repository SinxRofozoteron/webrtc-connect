import { type ListenerEffectAPI } from '@reduxjs/toolkit';

import { type RootState, type AppDispatch } from '../../../store';
import { type setActiveVideoDevice, setIsLocalStreamActive } from '../../../slices';
import { stopLocalStream } from '../../actions';

import { getLocalStream, setLocalStream } from './stream';

export const changeVideoDeviceEffect = async (
  action: ReturnType<typeof setActiveVideoDevice>,
  listenerApi: ListenerEffectAPI<RootState, AppDispatch>
) => {
  const newDeviceId = action.payload;
  const currentStream = getLocalStream();

  if (newDeviceId && currentStream) {
    const { activeDevices } = listenerApi.getState().localStream;

    const constraints: MediaStreamConstraints = {
      audio: activeDevices.audioInput
        ? {
            deviceId: activeDevices.audioInput
          }
        : true,
      video: {
        deviceId: newDeviceId
      }
    };

    const newStream = await navigator.mediaDevices.getUserMedia(constraints);

    const waitForStreamToStop = listenerApi.condition(
      (_, currentState) => currentState.localStream.isLocalStreamActive === false
    );
    listenerApi.dispatch(stopLocalStream());
    // Wait for stream state to clear
    await waitForStreamToStop;

    setLocalStream(newStream);
    listenerApi.dispatch(setIsLocalStreamActive(true));
  }
};
