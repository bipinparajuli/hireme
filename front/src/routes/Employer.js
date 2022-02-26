import React from 'react'
import { Navigate } from 'react-router-dom';
import { getUserData, hasToken } from '../helpers/Session';

export const Employee = ({ children}) => {
    const isAuthenticated = hasToken();
    
    const user =  getUserData()

    if (isAuthenticated && user.role== "Employer" ) {
      return children
    }
      
    return <Navigate to="/" />
  }

export default Employee