import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/operations';
import { Box, Typography, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';


const LogoutButton = styled(Button)({
  backgroundColor: '#ADD8E6', 
  color: '#000',
  '&:hover': {
    backgroundColor: '#9AC0CD', 
  },
});

function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  return (
    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          {user?.name}
        </Typography>
      </Box>
      <LogoutButton variant="contained" onClick={() => dispatch(logoutUser())}>
        Logout
      </LogoutButton>
    </Paper>
  );
}

export default UserMenu;
