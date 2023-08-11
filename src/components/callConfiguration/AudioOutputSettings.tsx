import Typography from '@rtcapp/webrtc-ui/build/Typography';
import Grid from '@rtcapp/webrtc-ui/build/Grid';
import TextField, { type TextFieldProps } from '@rtcapp/webrtc-ui/build/TextField';
import MenuItem from '@rtcapp/webrtc-ui/build/MenuItem';
import { FormattedMessage, useIntl } from 'react-intl';
import * as React from 'react';

import { useDispatch, useSelector } from '../../hooks';
import { setActiveAudioOutputDevice } from '../../state/slices';

const AUDIO_OUTPUT_SETTINGS_LABEL_ID = 'local-audio-output-settings';

export const AudioOutputSettings = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const audioOutputDevices = useSelector(state => state.localStream.audioOutputDevices);
  const activeAudioOutputDevice = useSelector(
    state => state.localStream.activeDevices.audioOutput
  );

  const handleDeviceChange: TextFieldProps['onChange'] = e => {
    dispatch(setActiveAudioOutputDevice(e.target.value));
  };

  return (
    <>
      <Typography id={AUDIO_OUTPUT_SETTINGS_LABEL_ID} color="text.primary">
        <FormattedMessage id="mainVideoWindow.settings.audioOutput.label" />
      </Typography>
      <Grid container aria-labelledby={AUDIO_OUTPUT_SETTINGS_LABEL_ID} width="100%">
        <Grid width="100%">
          <TextField
            color="secondary"
            select
            placeholder={intl.formatMessage({
              id: 'mainVideoWindow.settings.noDevices'
            })}
            value={activeAudioOutputDevice}
            onChange={handleDeviceChange}
            fullWidth>
            {audioOutputDevices.map(device => (
              <MenuItem key={device.deviceId} value={device.deviceId}>
                {device.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
    </>
  );
};
