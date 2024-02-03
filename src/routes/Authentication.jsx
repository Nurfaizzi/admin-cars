import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Authentication = ({children}) => {
    const token = localStorage.getItem("access_token");
    if(token){
        return <Navigate to={'/dashboard'} />
    }
  return (
    <div>{children || <Outlet />}</div>
  )
}

export default Authentication