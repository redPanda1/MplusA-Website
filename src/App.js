import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Routes from 'routes/Routes';
import { useAuthProvider } from 'hooks/useAuth'
import AuthContext from 'context/AuthContext';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import getTheme from 'theme';



import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'leaflet/dist/leaflet.css';
import './assets/css/index.css';
import 'swiper/swiper.min.css';
import 'aos/dist/aos.css';

const browserHistory = createBrowserHistory()

// Set up authentication
const AuthProvider = ({ children, auth }) => (
  <AuthContext.Provider value={auth}>
    {children}
  </AuthContext.Provider>
)

const App = () => {
  console.log(">>>> Starting App")
  const auth = useAuthProvider()
  // Check for browser refresh
  auth.checkRefresh()

  // useEffect(() => {
  // }, [auth])

  return (
    <ThemeProvider theme={getTheme()}>
      <CssBaseline />
      <AuthProvider auth={auth}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App