import React from 'react';
import AppWrapper from '@rtcapp/webrtc-ui/build/AppWrapper';
import { useTheme, styled } from '@rtcapp/webrtc-ui/build/styles';
import useMediaQuery from '@rtcapp/webrtc-ui/build/useMediaQuery';
import Grid from '@rtcapp/webrtc-ui/build/Grid';
import { Provider } from 'react-redux';

import messages from './locales';
import { configureStore } from './state/store';
import { MainVideoWindow } from './components/MainVideoWindow';

export type AppProps = {
  locale: string;
};

const GridContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    marginTop: '6rem'
  },
  [theme.breakpoints.up('xl')]: {
    width: 'calc(100% - 2 * 5rem - 2 * 10px)',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '10px'
  }
}));

const AppContent = () => {
  const theme = useTheme();

  const isXs = useMediaQuery(theme.breakpoints.down('sm'));

  return isXs ? (
    <MainVideoWindow />
  ) : (
    <GridContainer container>
      <Grid xs={12} sm={9} lg={8} xl={6} paddingRight="10px" paddingLeft="10px">
        <MainVideoWindow />
      </Grid>
    </GridContainer>
  );
};

const store = configureStore();

export const App = ({ locale }: AppProps) => {
  return (
    <AppWrapper messages={messages} locale={locale}>
      <Provider store={store}>
        <AppContent />
      </Provider>
    </AppWrapper>
  );
};
