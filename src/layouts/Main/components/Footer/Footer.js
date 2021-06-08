import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  List,
  ListItem,
} from '@material-ui/core';
import logo from 'assets/images/logo_inv.png'

import { Image } from 'components/atoms';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 0),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(3, 0),
    },
    background: theme.palette.background.footer,
  },
  footerContainer: {
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 8),
    },
  },
  logoContainerItem: {
    paddingTop: 0,
  },
  logoContainer: {
    width: 120,
    height: 64,
  },
  logoImage: {
    width: '100%',
    height: '100%',
  },
  groupTitle: {
    textTransform: 'uppercase',
    color: theme.palette.primary.dark,
    marginBottom: theme.spacing(1),
  },
  socialIcon: {
    padding: 0,
    marginRight: theme.spacing(1),
    color: 'rgba(255,255,255,.6)',
    '&:hover': {
      background: 'transparent',
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  icon: {
    fontSize: 24,
  },
  menuListContainer: {
    padding: '0 !important',
  },
  menu: {
    display: 'flex',
  },
  menuItem: {
    margin: theme.spacing(2),
    '&:last-child': {
      marginBottom: 0,
    },
  },
  menuGroupItem: {
    paddingTop: 0,
    paddingBottom: theme.spacing(1 / 2),
    '&:last-child': {
      paddingBottom: 0,
    },
  },
  menuGroupTitle: {
    cursor: 'pointer',
    textTransform: 'uppercase',
    color: 'white',
  },
  divider: {
    width: '100%',
  },
  navLink: {
    color: 'rgba(255,255,255,.6)',
  },
}));

const Footer = props => {
  const { pages, className, scrollTo, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.footerContainer}>
        <Grid container spacing={4} direction="row" >
          <Grid item xs={12} md={2}>
            <List disablePadding>
              <ListItem disableGutters className={classes.logoContainerItem}>
                <div className={classes.logoContainer} onClick={() => scrollTo('top')}>
                  <Image
                    className={classes.logoImage}
                    src={logo}
                    alt="M+A Logo"
                    lazy={false}
                  />
                </div>
              </ListItem>
            </List>
          </Grid>
          <Grid container item xs={12} md={10} direction="column" alignItems="flex-start" justify="space-around">
            <Grid container direction="row" justify="space-between">
              <Typography variant="body2" className={classes.menuGroupTitle} onClick={() => scrollTo('top')}>
                Home
                </Typography>
              <Typography variant="body2" className={classes.menuGroupTitle} onClick={() => scrollTo('about')}>
                About
                </Typography>
              <Typography variant="body2" className={classes.menuGroupTitle} onClick={() => scrollTo('services')}>
                What we Do
                </Typography>
              <Typography variant="body2" className={classes.menuGroupTitle} onClick={() => scrollTo('team')}>
                Team
                </Typography>
              <Typography variant="body2" className={classes.menuGroupTitle} onClick={() => scrollTo('contact')}>
                Contact
                </Typography>
            </Grid>
            <Typography variant="body2" className={classes.navLink}>
              Copyright © 2021 Mentors+Angels - All Rights Reserved
            </Typography>
          </Grid>
        </Grid>

      </div>
    </div>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
  pages: PropTypes.object.isRequired,
};

export default Footer;