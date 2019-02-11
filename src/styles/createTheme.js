import { createMuiTheme } from '@material-ui/core/styles';


export default () => createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: 'Montserrat',
  },
  palette: {
    primary: {
      light: '#bda27f',
      main: '#ad8b60',
      dark: '#796143',
      contrastText: '#6b552b',
    },
  },
});
