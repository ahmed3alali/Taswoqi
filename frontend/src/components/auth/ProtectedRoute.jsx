import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loader from '../layout/Loader';

const ProtectedRoute = ({Admin,children}) => {

const {isAuthenticated,user,loading} =useSelector((state)=>state.auth)

if (loading) return <Loader></Loader>



if (!isAuthenticated) {
    return <Navigate to="/login" replace></Navigate>
}

if (Admin && user?.role !=='Admin') {
    return <Navigate to="/" replace></Navigate>
}

    return children;
};

export default ProtectedRoute;