import { type ValueOf } from 'ts-essentials';

import { type DEVICE_KINDS } from '../../../constants/media';

export type MediaDevice = {
  deviceId: string;
  groupId: string;
  kind: ValueOf<typeof DEVICE_KINDS>;
  label: null | string;
};

export type LocalStreamState = {
  isLocalStreamActive: boolean;
  videoDevices: MediaDevice[];
  audioInputDevices: MediaDevice[];
  audioOutputDevices: MediaDevice[];
  activeDevices: {
    video: string | null;
    audioInput: string | null;
    audioOutput: string | null;
  };
};
