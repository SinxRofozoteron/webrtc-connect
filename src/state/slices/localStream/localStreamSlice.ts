import { createSlice } from '@reduxjs/toolkit';

import { type LocalStreamState } from './types';
import {
  setAudioInputDevicesReducer,
  setAudioOutputDevicesReducer,
  setVideoDevicesReducer,
  setActiveAudioInputDeviceReducer,
  setActiveAudioOutputDeviceReducer,
  setActiveVideoDeviceReducer,
  setIsLocalStreamActiveReducer
} from './reducers';

export const initialLocalStreamState: LocalStreamState = {
  isLocalStreamActive: false,
  audioInputDevices: [],
  audioOutputDevices: [],
  videoDevices: [],
  activeDevices: {
    audioInput: null,
    audioOutput: null,
    video: null
  }
};

export const localStreamSlice = createSlice({
  name: 'localStream',
  initialState: initialLocalStreamState,
  reducers: {
    setAudioInputDevices: setAudioInputDevicesReducer,
    setAudioOutputDevices: setAudioOutputDevicesReducer,
    setVideoDevices: setVideoDevicesReducer,
    setActiveAudioInputDevice: setActiveAudioInputDeviceReducer,
    setActiveAudioOutputDevice: setActiveAudioOutputDeviceReducer,
    setActiveVideoDevice: setActiveVideoDeviceReducer,
    setIsLocalStreamActive: setIsLocalStreamActiveReducer
  }
});

export const {
  setAudioInputDevices,
  setAudioOutputDevices,
  setVideoDevices,
  setActiveAudioInputDevice,
  setActiveAudioOutputDevice,
  setActiveVideoDevice,
  setIsLocalStreamActive
} = localStreamSlice.actions;

export const localStreamReducer = localStreamSlice.reducer;
