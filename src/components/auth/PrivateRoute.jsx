import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {
  selectIsAuthenticated,
  selectIsRefreshing,
} from '../../redux/auth/selectors';

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return <p>Loading...</p>; 
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

export default PrivateRoute
