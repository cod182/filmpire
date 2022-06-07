import React, { useState } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
  Button,
  Avatar,
  useMediaQuery,
} from '@mui/material';
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import UseStyles from './styles';

import { Sidebar, Search } from '../index';

const NavBar = () => {
  const classes = UseStyles();
  const isMobile = useMediaQuery('(max-width:500px)');
  const theme = useTheme();
  const isAuthenticated = true;
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => {
                setMobileOpen((prevMobileOpen) => !prevMobileOpen);
              }}
              className={classes.menuButton}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brighness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={() => {}}>
                Login &nbsp;
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/:id`}
                className={classes.linkButton}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  styles={{ width: 30, height: 30 }}
                  alt="Profile"
                  src="https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425__340.png"
                ></Avatar>
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <nav className={classes.drawer}>
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => {
                setMobileOpen((prevMobileOpen) => !prevMobileOpen);
              }}
              classes={{ paper: classes.drawerPaper }}
              ModelProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen}></Sidebar>
            </Drawer>
          ) : (
            <Drawer variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen}></Sidebar>
            </Drawer>
          )}
        </nav>
      </div>
    </>
  );
};

export default NavBar;
