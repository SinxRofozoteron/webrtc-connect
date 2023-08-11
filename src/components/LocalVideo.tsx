import { useRef, useEffect } from 'react';
import { styled } from '@rtcapp/webrtc-ui/build/styles';
import * as React from 'react';

import { useDispatch, useSelector } from '../hooks';
import { startLocalStream, stopLocalStream } from '../state/listenerMiddleware/actions';
import {
  // eslint-disable-next-line prettier/prettier
  getLocalStream 
} from '../state/listenerMiddleware/effects/manageLocalStream/stream';

const Video = styled('video')(({ theme }) => ({
  position: 'fixed',
  '@media (orientation: portrait)': {
    height: '100vh'
  },
  '@media (orientation: landscape)': {
    width: '100vw'
  },
  left: '0',
  top: '0',
  [theme.breakpoints.up('sm')]: {
    position: 'relative',
    height: 'auto',
    width: '100%',
    borderRadius: '5rem'
  }
}));

export const LocalVideo = () => {
  const dispatch = useDispatch();
  const videoRef = useRef<HTMLVideoElement>(null);

  const streamIsActive = useSelector(state => state.localStream.isLocalStreamActive);

  const localStream = getLocalStream();

  useEffect(() => {
    dispatch(startLocalStream());

    return () => {
      dispatch(stopLocalStream());
    };
  }, []);

  useEffect(() => {
    if (videoRef.current && localStream && streamIsActive) {
      videoRef.current.srcObject = localStream;
    }
  }, [localStream]);

  return <Video ref={videoRef} autoPlay playsInline controls={false} />;
};
