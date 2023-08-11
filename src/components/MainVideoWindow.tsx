import { styled } from '@rtcapp/webrtc-ui/build/styles';
import { useState } from 'react';
import * as React from 'react';

import { LocalVideo } from './LocalVideo';
import { CallSettings } from './callConfiguration';

const Container = styled('div')`
  position: relative;
`;

let timeout: null | ReturnType<typeof setTimeout> = null;

export const MainVideoWindow = () => {
  const [showControls, setShowControls] = useState<boolean>(false);

  const toggleControls = () => setShowControls(prevState => !prevState);

  const handleDelayedControlToggle = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => {
      toggleControls();
      timeout = null;
    }, 3000);
  };

  return (
    <Container
      onMouseEnter={toggleControls}
      onMouseLeave={toggleControls}
      onTouchStart={toggleControls}
      onTouchEnd={handleDelayedControlToggle}>
      <LocalVideo />
      <CallSettings visible={showControls} />
    </Container>
  );
};
