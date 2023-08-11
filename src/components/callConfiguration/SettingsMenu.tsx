import Stack from '@rtcapp/webrtc-ui/build/Stack';
import { styled } from '@rtcapp/webrtc-ui/build/styles';
import Fade from '@rtcapp/webrtc-ui/build/Fade';
import * as React from 'react';

import { VideoSettings } from './VideoSettings';
import { AudioInputSettings } from './AudioInputSettings';

const StyledStack = styled(Stack)(({ theme }) => ({
  position: 'absolute',
  width: '16rem',
  height: '70vh',
  backgroundColor: theme.palette.background.paper,
  alignItems: 'center',
  opacity: '0.8 !important',
  borderRadius: '1.5rem',
  color: theme.palette.text.secondary,
  padding: '5px',
  right: '5px',
  top: 'calc(10px + 4rem + 5px)',
  [theme.breakpoints.up('sm')]: {
    padding: '10px',
    right: '20px',
    top: 'calc(20px + 5rem + 5px)'
  },
  [theme.breakpoints.up('md')]: {
    padding: '20px',
    borderRadius: '3rem',
    height: '70%',
    width: '20rem'
  }
}));

type SettingsMenuProps = {
  open: boolean;
};

export const SettingsMenu = ({ open }: SettingsMenuProps) => {
  return (
    <Fade in={open} unmountOnExit>
      <StyledStack gap={1}>
        <VideoSettings />
        <AudioInputSettings />
      </StyledStack>
    </Fade>
  );
};
