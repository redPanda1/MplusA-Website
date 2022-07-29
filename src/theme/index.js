import { createTheme, responsiveFontSizes, adaptV4Theme } from '@mui/material';
import { light } from './palette';

const getTheme = () => responsiveFontSizes(
  createTheme(adaptV4Theme({
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
  })),
);

export default getTheme;
