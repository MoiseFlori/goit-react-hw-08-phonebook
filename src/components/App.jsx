import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchCurrentUser } from '../redux/auth/operations';

import Navigation from '../components/auth/Navigation';
import PrivateRoute from '../components/auth/PrivateRoute';
import PublicRoute from '../components/auth/PublicRoute';

import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import ContactsPage from '../pages/ContactsPage';
import HomePage from '../pages/HomePage';


export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className="container">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <ContactsPage />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
};