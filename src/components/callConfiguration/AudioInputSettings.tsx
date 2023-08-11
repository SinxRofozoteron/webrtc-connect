import Typography from '@rtcapp/webrtc-ui/build/Typography';
import Grid from '@rtcapp/webrtc-ui/build/Grid';
import TextField, { type TextFieldProps } from '@rtcapp/webrtc-ui/build/TextField';
import MenuItem from '@rtcapp/webrtc-ui/build/MenuItem';
import { FormattedMessage, useIntl } from 'react-intl';
import * as React from 'react';

import { useDispatch, useSelector } from '../../hooks';
import { setActiveAudioInputDevice } from '../../state/slices';

const AUDIO_INPUT_SETTINGS_LABEL_ID = 'local-audio-input-settings';

export const AudioInputSettings = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const audioInputDevices = useSelector(state => state.localStream.audioInputDevices);
  const activeAudioInputDevice = useSelector(
    state => state.localStream.activeDevices.audioInput
  );

  const handleDeviceChange: TextFieldProps['onChange'] = e => {
    dispatch(setActiveAudioInputDevice(e.target.value));
  };

  return (
    <>
      <Typography id={AUDIO_INPUT_SETTINGS_LABEL_ID} color="text.primary">
        <FormattedMessage id="mainVideoWindow.settings.audioInput.label" />
      </Typography>
      <Grid container aria-labelledby={AUDIO_INPUT_SETTINGS_LABEL_ID} width="100%">
        {activeAudioInputDevice ? (
          <Grid width="100%">
            <TextField
              color="secondary"
              placeholder={intl.formatMessage({
                id: 'mainVideoWindow.settings.noDevices'
              })}
              select
              value={activeAudioInputDevice}
              onChange={handleDeviceChange}
              fullWidth>
              {audioInputDevices.map(device => (
                <MenuItem key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        ) : null}
      </Grid>
    </>
  );
};
