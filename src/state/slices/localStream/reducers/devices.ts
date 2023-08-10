import { type PayloadAction } from '@reduxjs/toolkit';

import { type LocalStreamState, type MediaDevice } from '../types';

export const setVideoDevicesReducer = (
  state: LocalStreamState,
  action: PayloadAction<MediaDevice[]>
) => {
  state.videoDevices = action.payload;
};

export const setAudioInputDevicesReducer = (
  state: LocalStreamState,
  action: PayloadAction<MediaDevice[]>
) => {
  state.audioInputDevices = action.payload;
};

export const setAudioOutputDevicesReducer = (
  state: LocalStreamState,
  action: PayloadAction<MediaDevice[]>
) => {
  state.audioOutputDevices = action.payload;
};

export const setActiveVideoDeviceReducer = {
  prepare: (deviceId: string | null) => {
    return {
      payload: deviceId
    };
  },
  reducer: (state: LocalStreamState, action: PayloadAction<string | null>) => {
    state.activeDevices.video = action.payload;
  }
};

export const setActiveAudioInputDeviceReducer = {
  prepare: (deviceId: string | null) => {
    return {
      payload: deviceId
    };
  },
  reducer: (state: LocalStreamState, action: PayloadAction<string | null>) => {
    state.activeDevices.audioInput = action.payload;
  }
};

export const setActiveAudioOutputDeviceReducer = {
  prepare: (deviceId: string | null) => {
    return {
      payload: deviceId
    };
  },
  reducer: (state: LocalStreamState, action: PayloadAction<string | null>) => {
    state.activeDevices.audioOutput = action.payload;
  }
};
