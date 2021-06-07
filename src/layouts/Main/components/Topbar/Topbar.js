import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  List,
  ListItem,
  Typography,
  Button,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  topBar: {
    backgroundColor: "#000033",
  },
  flexGrow: {
    flexGrow: 1,
  },
  navigationContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toolbar: {
    zIndex: 999,
    maxWidth: theme.layout.contentWidth,
    width: '100%',
    margin: '0 auto',
    padding: theme.spacing(0, 2),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(0, 8),
    },
  },
  navLink: {
    '&:hover': {
      color: "#ffffff",
    },
  },
  listItem: {
    cursor: 'pointer',
    '&:hover > .menu-item, &:hover svg': {
      color: "#ffffff"
    },
    '&.menu-item--no-dropdown': {
      paddingRight: 0,
    },
  },
  listItemActive: {
    '&> .menu-item': {
      color: "#ffffff",
    },
  },
  listItemText: {
    cursor:'pointer',
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
    whiteSpace: 'nowrap',
  },
  listItemButton: {
    whiteSpace: 'nowrap',
  },
  listItemIcon: {
    minWidth: 'auto',
  },
  popover: {
    padding: theme.spacing(4),
    border: theme.spacing(2),
    boxShadow: '0 0.5rem 2rem 2px rgba(116, 123, 144, 0.09)',
    minWidth: 350,
    marginTop: theme.spacing(2),
  },
  iconButton: {
    marginLeft: theme.spacing(2),
    padding: 0,
    '&:hover': {
      background: 'transparent',
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
    color: "#ffffff",
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
      height: 67,
    },
  },
  logoImage: {
    width: '60%',
    height: '60%',
  },
  menu: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  menuItem: {
    marginRight: theme.spacing(5),
    '&:last-child': {
      marginRight: 0,
    },
  },
  menuGroupItem: {
    paddingTop: 0,
  },
  menuGroupTitle: {
    textTransform: 'uppercase',
  },
}));

const Topbar = ({ onSidebarOpen, pages, className, scrollTo, ...rest }) => {
  const classes = useStyles();


  return (
    <div className={classes.topBar}>
    <Toolbar disableGutters className={classes.toolbar} {...rest}>
      <div className={classes.flexGrow} />
      <List disablePadding className={classes.navigationContainer}>
          <ListItem>
            <Typography variant="body1" color="textSecondary" 
                className={clsx(classes.listItemText, 'menu-item')}
                onClick={()=>scrollTo("about")}>
                  About
            </Typography>
          </ListItem>
          <ListItem>
          <Typography variant="body1" color="textSecondary" 
                className={clsx(classes.listItemText, 'menu-item')}
                onClick={()=>scrollTo("services")}>
                  What We do
            </Typography>
          </ListItem>
          <ListItem>
          <Typography variant="body1" color="textSecondary" 
                className={clsx(classes.listItemText, 'menu-item')}
                onClick={()=>scrollTo("team")}>
                  Team
            </Typography>
          </ListItem>
          <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
            <Button
              color="secondary"
              variant="outlined"
              onClick={()=>scrollTo("contact")}>
              Contact
            </Button>
          </ListItem>
        </List>
    </Toolbar>
    </div>
  );
};

Topbar.propTypes = {
  className: PropTypes.string,
  onSidebarOpen: PropTypes.func,
  pages: PropTypes.object.isRequired,
};

export default Topbar;
