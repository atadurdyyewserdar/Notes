import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'
import { useLocation } from 'react-router';
const ProtectedRoute = ({ children }) => {
    
    const location = useLocation()
    const { isAuth } = useAuth();
    if (!isAuth) {
        return <Navigate to='/login' state={{ from: location }} />
    }
    return children;
}

export { ProtectedRoute };