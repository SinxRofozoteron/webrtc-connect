import Typography from '@rtcapp/webrtc-ui/build/Typography';
import Grid from '@rtcapp/webrtc-ui/build/Grid';
import TextField, { type TextFieldProps } from '@rtcapp/webrtc-ui/build/TextField';
import MenuItem from '@rtcapp/webrtc-ui/build/MenuItem';
import { FormattedMessage, useIntl } from 'react-intl';
import * as React from 'react';

import { useDispatch, useSelector } from '../../hooks';
import { setActiveVideoDevice } from '../../state/slices';

const VIDEO_SETTINGS_LABEL_ID = 'local-video-settings';

export const VideoSettings = () => {
  const dispatch = useDispatch();
  const intl = useIntl();

  const videoDevices = useSelector(state => state.localStream.videoDevices);
  const activeVideoDevice = useSelector(state => state.localStream.activeDevices.video);

  const handleDeviceChange: TextFieldProps['onChange'] = e => {
    console.log(e.target.value, 'CHANGED');
    dispatch(setActiveVideoDevice(e.target.value));
  };

  return (
    <>
      <Typography id={VIDEO_SETTINGS_LABEL_ID} color="text.primary">
        <FormattedMessage id="mainVideoWindow.settings.video.label" />
      </Typography>
      <Grid container aria-labelledby={VIDEO_SETTINGS_LABEL_ID} width="100%">
        {activeVideoDevice ? (
          <Grid width="100%">
            <TextField
              select
              color="secondary"
              placeholder={intl.formatMessage({
                id: 'mainVideoWindow.settings.noDevices'
              })}
              value={activeVideoDevice}
              onChange={handleDeviceChange}
              fullWidth>
              {videoDevices.map(device => (
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
