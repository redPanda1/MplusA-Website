import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {
  Toolbar,
  Hidden,
  List,
  ListItem,
  ListItemIcon,
  Popover,
  Typography,
  IconButton,
  Avatar
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuIcon from '@material-ui/icons/Menu';
import { Image } from 'components/atoms';
import logo from 'assets/images/logo_inv.png'
import useAuth from 'hooks/useAuth'


const useStyles = makeStyles(theme => ({
  topBar: {
    backgroundColor: "#000044",
  },
  topBarText: {
    color: "#bbb"
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
      color: theme.palette.primary.dark,
    },
  },
  listItem: {
    cursor: 'pointer',
    '&:hover > .menu-item, &:hover svg': {
      // color: theme.palette.primary.dark,
      color: "#fff",
    },
    '&.menu-item--no-dropdown': {
      paddingRight: 0,
    },
  },
  listItemActive: {
    '&> .menu-item': {
      // color: theme.palette.primary.dark,
      color: "#fff",
      fontWeight: "700"
    },
  },
  listItemText: {
    flex: '0 0 auto',
    marginRight: theme.spacing(2),
    whiteSpace: 'nowrap',
    color: "#bbb"
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
    color: theme.palette.primary.dark,
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

const Topbar = ({ onSidebarOpen, pages, className, ...rest }) => {
  const classes = useStyles();
  const auth = useAuth()

  const [anchorEl, setAnchorEl] = useState(null);
  const [openedPopoverId, setOpenedPopoverId] = useState(null);

  console.log(auth.userData)
  const {givenName: userName, photoURL: userImage, type: userType} = auth.userData

  const handleClick = (event, popoverId) => {
    setAnchorEl(event.target);
    setOpenedPopoverId(popoverId);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenedPopoverId(null);
  };

  const logoutUser = () => {
    console.log("Logout")
    console.log(auth.userAuthenticated)
    auth.logout()
  }

  const company = pages.company;
  const admin = pages.admin;
  let menuGroups = [company]
  if (userType === 'admin') {
    menuGroups.push(admin)
  }


  const MenuGroup = props => {
    const { item } = props;
    return (
      <List disablePadding>
        <ListItem disableGutters>
          <Typography
            variant="body2"
            color="primary"
            className={classes.menuGroupTitle}
          >
            {item.groupTitle}
          </Typography>
        </ListItem>
        {item.pages.map((page, i) => (
          <ListItem disableGutters key={i} className={classes.menuGroupItem}>
            <Typography
              variant="body1"
              className={clsx(classes.navLink, 'submenu-item')}
              color="textSecondary"
              onClick={handleClose}
            >
              <Link to={page.href}>
                {page.title}
              </Link>
            </Typography>
          </ListItem>
        ))}
      </List>
    );
  };

  const UserPages = () => {
    return (
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <ListItem disableGutters key={"X"} className={classes.menuGroupItem}>
            <Typography
              variant="body1"
              component={'a'}
              href={"/"}
              className={clsx(classes.navLink, 'submenu-item')}
              color="textSecondary"
              onClick={handleClose}
            >
              {"Settings"}
            </Typography>
          </ListItem>
          <ListItem disableGutters key={"Y"} className={classes.menuGroupItem}>
            <Typography
              variant="body1"
              className={clsx(classes.navLink, 'submenu-item')}
              color="textSecondary"
              onClick={logoutUser}
            >
              {"Logout"}
            </Typography>
          </ListItem>
        </div>
      </div>
    );
  };

  const CompanyPages = () => {
    const { companies } = company.children;
    return (
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <MenuGroup item={companies} />
        </div>
      </div>
    );
  };

  const AdminPages = () => {
    const { settings } = admin.children;
    return (
      <div className={classes.menu}>
        <div className={classes.menuItem}>
          <MenuGroup item={settings} />
        </div>
      </div>
    );
  };

  const renderPages = id => {
    if (id === 'company-pages') {
      return <CompanyPages />;
    }
    if (id === 'admin-pages' && userType === 'admin') {
      return <AdminPages />;
    }
  };

  return (
    <div className={classes.topBar}>
      <Toolbar disableGutters className={classes.toolbar} {...rest}>
        <div className={classes.logoContainer}>
          <Link to="/admin" title="M+A">
            <Image
              className={classes.logoImage}
              src={logo}
              alt="M+A"
              lazy={false}
            />
          </Link>
        </div>
        <div className={classes.flexGrow} />
        <Hidden smDown>
          <List disablePadding className={classes.navigationContainer}>
            {menuGroups.map((page, i) => (
              <div key={page.id}>
                <ListItem
                  aria-describedby={page.id}
                  onClick={e => handleClick(e, page.id)}
                  className={clsx(
                    classes.listItem,
                    openedPopoverId === page.id ? classes.listItemActive : '',
                  )}
                >
                  <Typography
                    variant="body1"
                    className={clsx(classes.listItemText, 'menu-item')}
                  >
                    {page.title}
                  </Typography>
                  <ListItemIcon className={classes.listItemIcon}>
                    <ExpandMoreIcon
                      className={
                        openedPopoverId === page.id ? classes.expandOpen : ''
                      }
                      fontSize="small"
                    />
                  </ListItemIcon>
                </ListItem>
                <Popover
                  elevation={1}
                  id={page.id}
                  open={openedPopoverId === page.id}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  classes={{ paper: classes.popover }}
                >
                  <div>{renderPages(page.id)}</div>
                </Popover>
              </div>
            ))}
            <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
              <IconButton className={classes.iconButton} onClick={e => handleClick(e, "XYZ")}>
                <Avatar src={userImage} />
              </IconButton>
            </ListItem>
            <ListItem className={clsx(classes.listItem, 'menu-item--no-dropdown')}>
              <Typography className={classes.topBarText} onClick={e => handleClick(e, "XYZ")}>
                {userName}
              </Typography>
              <Popover
                elevation={1}
                id={"xyz"}
                open={openedPopoverId === "XYZ"}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                classes={{ paper: classes.popover }}
              >
                <UserPages />
              </Popover>
            </ListItem>
          </List>
        </Hidden>
        <Hidden mdUp>
          <Typography className={classes.topBarText}>
            {userName}
          </Typography>

          <IconButton
            className={classes.iconButton}
            onClick={onSidebarOpen}
            aria-label="Menu"
            style={{ color: "white" }}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
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
