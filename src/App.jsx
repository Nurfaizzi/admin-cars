import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import DashboardPage from './pages/DashboardPage'
import CarPage from './pages/CarPage'
import AddPage from './pages/AddPage'
import EditPage from './pages/EditPage'
import LoginPage from './pages/LoginPage'
import { BrowserRouter, Routes, Route, useRoutes } from "react-router-dom";
import AddCars from './components/AddCars'
import { routes } from './routes'


const App = () => {
  let element = useRoutes(routes)
  return element

};

export default App;
