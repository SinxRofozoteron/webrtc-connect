import SettingsIcon from '@rtcapp/webrtc-ui/build/icons/Settings';
import Fade from '@rtcapp/webrtc-ui/build/Fade';
import Fab from '@rtcapp/webrtc-ui/build/Fab';
import { styled } from '@rtcapp/webrtc-ui/build/styles';
import { useIntl } from 'react-intl';
import * as React from 'react';

const StyledFab = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  right: '5px',
  top: '5px',
  [theme.breakpoints.up('sm')]: {
    right: '20px',
    top: '20px'
  }
}));

type CallSettingsButtonProps = {
  onClick: () => void;
  visible: boolean;
};

export const CallSettingsButton = ({ onClick, visible }: CallSettingsButtonProps) => {
  const intl = useIntl();

  const label = intl.formatMessage({ id: 'common.settings' });

  return (
    <Fade in={visible}>
      <StyledFab onClick={onClick} aria-label={label}>
        <SettingsIcon />
      </StyledFab>
    </Fade>
  );
};
