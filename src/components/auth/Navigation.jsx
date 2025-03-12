import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserMenu from '../auth/UserMenu';
import { AppBar, Toolbar, Button, Box } from '@mui/material';

const Navigation = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <NavLink to="/" style={{ textDecoration: 'none' }}>
            <Button sx={{ color: 'white' }}>Home</Button>
          </NavLink>
        </Box>

        {!isAuthenticated ? (
          <>
            <NavLink to="/register" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: 'white' }}>Register</Button>
            </NavLink>
            <NavLink to="/login" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: 'white' }}>Login</Button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/contacts" style={{ textDecoration: 'none' }}>
              <Button sx={{ color: 'white' }}>Contacts</Button>
            </NavLink>
            <UserMenu />
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
