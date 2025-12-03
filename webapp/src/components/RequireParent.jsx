import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

const RequireParent = ({ children }) => {
  const { isParentUnlocked } = useApp();

  if (!isParentUnlocked) {
    return <Navigate to="/parent/login" replace />;
  }

  return children;
};

export default RequireParent;
