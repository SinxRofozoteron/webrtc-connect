import { type PayloadAction } from '@reduxjs/toolkit';

import { type LocalStreamState } from '../types';

export const setIsLocalStreamActiveReducer = (
  state: LocalStreamState,
  action: PayloadAction<boolean>
) => {
  state.isLocalStreamActive = action.payload;
};
