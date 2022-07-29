import React, { useState, useEffect } from 'react';
import { Paper } from '@mui/material';
import AOS from 'aos';

export const useDarkMode = () => {
  const [mountedComponent, setMountedComponent] = useState(false);

  useEffect(() => {
    setMountedComponent(true);
    AOS.refresh();
  }, []);

  return [mountedComponent];
};

export default function WithLayout({ component: Component, layout: Layout, ...rest }) {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }

    AOS.init({
      once: true,
      delay: 50,
      duration: 500,
      easing: 'ease-in-out',
    });
  }, []);

  const [mountedComponent] = useDarkMode();
  useEffect(() => {
    AOS.refresh();
  }, [mountedComponent]);

  return (
    <Paper elevation={0}>
      <Layout >
        <Component {...rest} />
      </Layout>
    </Paper>
  );
}