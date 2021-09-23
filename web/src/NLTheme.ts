import { createTheme, darken, lighten } from '@material-ui/core';

const mainColor = '#fc7422';

const NLTheme = createTheme({
  palette: {
    primary: {
      main: mainColor,
      contrastText: '#fff',
      dark: darken(mainColor, 0.5),
      light: lighten(mainColor, 0.5),
    },
  },
  overrides: {
    MuiTableBody: {
      root: {
        '&& .MuiTableRow-root': {
          transition: 'background-color 0.2s',
          '&:nth-of-type(odd)': {
            backgroundColor: `rgba(0, 0, 0, 0.04)`,
          },
          '&:hover': {
            backgroundColor: `rgba(0, 0, 0, 0.08)`,
          },
        },
      },
    },
  },
});

export default NLTheme;
