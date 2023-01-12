import { createSlice } from '@reduxjs/toolkit';

const navMenu = createSlice({
  name: 'navMenu',
  initialState: {
    menuOpen: false,
  },
  reducers: {
    menuToggle(state) {
      state.menuOpen = !state.menuOpen;
    },
    menuClose(state) {
      state.menuOpen = false;
    },
  },
});

export const uiActions = navMenu.actions;
export default navMenu;
