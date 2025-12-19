import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useRole from '../hooks/useRole';

const ModeratorRoute = ({ children }) => {
  const { role, roleLoading } = useRole();
  const location = useLocation();

  if (roleLoading) return <p>Checking role...</p>;

  if (role?.toLowerCase() !== "moderator") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ModeratorRoute;
