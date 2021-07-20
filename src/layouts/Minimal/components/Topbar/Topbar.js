import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar } from '@material-ui/core';
import { Image } from 'components/atoms';
import logo from 'assets/images/logo.png'

const useStyles = makeStyles(theme => ({
  toolbar: {
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 8),
    },
  },
  logoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 56,
    [theme.breakpoints.up('md')]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 120,
      height: 64,
    },
  },
  logoImage: {
    width: '80%',
    height: '80%',
  },
}));

const Topbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <Toolbar className={clsx(classes.toolbar, className)} {...rest}>
      <div className={classes.logoContainer}>
        <a href="/" title="M+A">
          <Image
            className={classes.logoImage}
            src={logo}
            alt="M+A"
            lazy={false}
          />
        </a>
      </div>
    </Toolbar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
};

export default Topbar;
