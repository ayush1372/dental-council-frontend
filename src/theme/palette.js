export const palette = (mode) => {
  return {
    primary: {
      main: '#264488',
      light: '#415D94',
      lighter: '#DAE2F6',
      dark: '#162A61',
      contrastText: '#fff',
    },
    secondary: {
      main: '#D66025',
      light: '#BD5521',
      dark: '#A3491C',
      contrastText: '#000',
      warningYellow: '#FFA334',
      lightOrange: '#FF8B00',
      pendingBg: '#FFB05245',
      pendingText: '#995C13',
    },
    grey: {
      main: mode === 'dark' ? '#000' : '#E9ECF3',
      light: '#D3D3DB',
      dark: '#BBBBC2',
      context: '#595959',
      contrastText: '#fff',
      label: '#656565',
    },
    grey1: {
      main: '#bfbfbf',
      light: '#F8F7FA',
      dark: '#3F3D565E',
      lighter: '#F6F8F9',
    },
    grey2: {
      main: '#F0F0F0',
      light: '#C1BDD5',
      dark: '#C1BDD591',
      ligther: '#8A8A8A',
    },
    backgroundColor: {
      main: mode === 'dark' ? '#000' : '#E9ECF3',
      dark: '#000',
      light: '#FAFAFA',
    },
    error: {
      main: '#FF5630',
      light: '#FF674542',
    },
    success: {
      main: '#36B37E',
      light: '#53CB9863',
      dark: '#2B8D63',
    },
    messageBlue: {
      main: '#6554c0',
    },
    white: {
      main: mode === 'dark' ? '#000' : '#fff',
    },
    black: {
      main: '#000',
      textBlack: mode === 'dark' ? '#fff' : '#262626',
      secondary: '#000000',
    },
    transparent: {
      main: 'transparent',
    },
    textPrimary: {
      main: '#1C1B1B',
      secondary: '#7687AF',
    },
    textSecondary: {
      main: '#1C1B1BCC',
    },
    inputBorderColor: {
      main: '#EDEDF6',
    },
    inputTextColor: {
      main: '#3F3D56',
      light: '#3F3D5699',
    },
    otpTextColor: {
      main: '#D8DCDE',
    },
    inputHoverColor: {
      main: '#607FD1',
    },
    inputFocusColor: {
      main: '#4870CC',
    },
    inputSuccessBackgroundColor: {
      main: '#DAF1E8',
    },
    inputBorderSuccessColor: {
      main: '#49BA8A',
    },
    inputSuccessTextColor: {
      main: '#1F6648',
    },
    breadCrumbActiveColor: {
      main: '#434242',
    },
    tabDefaultTextColor: {
      main: '#262626',
    },
    tabHighlightedBackgroundColor: {
      main: '#1B346E',
    },
    youTubeColor: {
      main: '#FF0000',
    },
    suspendAlert: {
      main: '##E33D19',
      secondary: '#FF7557',
      light: '#FFE0D9',
      dark: '#FF512B',
    },
    stepIconActive: {
      main: '#4D70CB',
    },
    profileCardBorder: {
      main: '#BFBFBF8C',
    },
  };
};
