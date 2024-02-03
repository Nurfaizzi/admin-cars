import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Protected = ({children}) => {
 const token = localStorage.getItem("access_token");
 if(!token){
    return <Navigate to={'/'} />
 }
  return (
    <div>{children || <Outlet />}</div>
  )
}

export default Protected