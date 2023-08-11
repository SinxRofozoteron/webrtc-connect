import { type ListenerEffectAPI } from '@reduxjs/toolkit';

import { type RootState, type AppDispatch } from '../../../store';
import { getDevices } from '../../../../utils/media/devices.utils';
import {
  setVideoDevices,
  setAudioInputDevices,
  setAudioOutputDevices,
  setActiveAudioInputDevice,
  setActiveAudioOutputDevice,
  setActiveVideoDevice,
  setIsLocalStreamActive
} from '../../../slices';
import { type startLocalStream, stopLocalStream } from '../../actions';

import { getLocalStream, setLocalStream } from './stream';
/**
 * Starts local stream and sets up listener for stream stop action
 */
export const startLocalStreamEffect = async (
  _: ReturnType<typeof startLocalStream>,
  listenerApi: ListenerEffectAPI<RootState, AppDispatch>
) => {
  // Make sure there are no active localStream
  const isLocalStreamActive = getLocalStream();
  if (isLocalStreamActive) {
    const waitForStreamToStop = listenerApi.condition(
      (_, currentState) => currentState.localStream.isLocalStreamActive === false
    );
    listenerApi.dispatch(stopLocalStream());
    // Wait for stream state to clear
    await waitForStreamToStop;
  }

  const { videoDevices, audioInputDevices, audioOutputDevices } = await getDevices();

  const initialVideoDeviceId = videoDevices.length ? videoDevices[0]!.deviceId : null;
  if (initialVideoDeviceId) {
    listenerApi.dispatch(setActiveVideoDevice(initialVideoDeviceId));
  }

  const initialAudioInputDeviceId = audioInputDevices.length
    ? audioInputDevices[0]!.deviceId
    : null;
  if (initialAudioInputDeviceId) {
    listenerApi.dispatch(setActiveAudioInputDevice(initialAudioInputDeviceId));
  }

  const initialAudioOutputDeviceId = audioOutputDevices.length
    ? audioOutputDevices[0]!.deviceId
    : null;
  if (initialAudioOutputDeviceId) {
    listenerApi.dispatch(setActiveAudioOutputDevice(initialAudioOutputDeviceId));
  }

  const initialConstraints: MediaStreamConstraints = {
    audio: initialAudioInputDeviceId
      ? {
          deviceId: initialAudioInputDeviceId
        }
      : true,
    video: initialVideoDeviceId
      ? {
          deviceId: initialVideoDeviceId
        }
      : true
  };

  const localStream = await navigator.mediaDevices.getUserMedia(initialConstraints);
  setLocalStream(localStream);
  listenerApi.dispatch(setIsLocalStreamActive(true));

  const devicesWithLabels = await getDevices();
  listenerApi.dispatch(
    setVideoDevices(devicesWithLabels.videoDevices.map(device => device.toJSON()))
  );
  listenerApi.dispatch(
    setAudioInputDevices(
      devicesWithLabels.audioInputDevices.map(device => device.toJSON())
    )
  );
  listenerApi.dispatch(
    setAudioOutputDevices(
      devicesWithLabels.audioOutputDevices.map(device => device.toJSON())
    )
  );
};
