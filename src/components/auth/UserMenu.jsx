import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../redux/auth/authSlice';
import { Box, Typography, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

// 🔹 Creăm un buton personalizat cu baby blue
const LogoutButton = styled(Button)({
  backgroundColor: '#ADD8E6', // Baby Blue
  color: '#000', // Text negru pentru contrast
  '&:hover': {
    backgroundColor: '#9AC0CD', // O nuanță mai închisă la hover
  },
});

function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  return (
    <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold">
          {user?.email}
        </Typography>
      </Box>
      <LogoutButton variant="contained" onClick={() => dispatch(logoutUser())}>
        Logout
      </LogoutButton>
    </Paper>
  );
}

export default UserMenu;
