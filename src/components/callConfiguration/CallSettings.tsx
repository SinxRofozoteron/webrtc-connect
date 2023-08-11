import { useState } from 'react';
import * as React from 'react';

import { CallSettingsButton } from './CallSettingsButton';
import { SettingsMenu } from './SettingsMenu';

type CallSettingsProps = {
  visible: boolean;
};

export const CallSettings = ({ visible }: CallSettingsProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <>
      <CallSettingsButton onClick={handleMenuToggle} visible={menuOpen || visible} />
      <SettingsMenu open={menuOpen} />
    </>
  );
};
