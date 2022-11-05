import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import Spinner from 'react-bootstrap/Spinner';

const RequireAuth = ({ children }) => {
    const {user, loading} = useAuth();
    const location = useLocation();
    if(loading){
        return <div className='text-center mt-5'><Spinner animation="border" /></div>
    }
    if(!user){
        return <Navigate to="/login" state={{from: location}} replace />
    }
    return children;
};

export default RequireAuth;