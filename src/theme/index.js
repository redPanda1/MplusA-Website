import { createTheme, responsiveFontSizes } from '@material-ui/core';
import { light } from './palette';

const getTheme = () => responsiveFontSizes(
  createTheme({
    palette: light,
    layout: {
      contentWidth: 1236,
    },
    typography: {
      fontFamily: 'Lato',
      button: {
        textTransform: 'none'
      },
    },
    zIndex: {
      appBar: 1200,
      drawer: 1100,
    },
  }),
);

export default getTheme;
