import { createTheme } from 'react-data-table-component';

export const themeThree = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*': {
          margin: 0,
          padding: 0,
        },
        'html, body, #root': {
          height: '100%',
        },
        ul: {
          listStyle: 'none',
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: { verticalAlign: 'middle' },
      },
    },
  },
});
