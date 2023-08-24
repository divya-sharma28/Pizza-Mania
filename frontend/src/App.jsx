import './App.css'
import React, { useState } from 'react'
import { store } from "./redux/Store"
import { Provider } from 'react-redux'
import NavComponent from './components/NavComponent'
import HomePage from './pages/HomePage'
import CartPage from './pages/CartPage'
import { Routes, BrowserRouter, Route, useLocation } from "react-router-dom"
import UserLogin from './pages/UserLogin'
import UserRegister from './pages/UserRegister'
import MyOrderPage from './pages/MyOrderPage'

function App() {


  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}

function AppRouter() {
  const location = useLocation()
  const isAuthPage = location.pathname === '/pizzamania/login'||  location.pathname === '/pizzamania/register'

  return (
    <>
      {!isAuthPage && <NavComponent />}
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/cart' element={<CartPage/>} /> 
        <Route path='/pizzamania/login' element={<UserLogin/>} />
        <Route path='/pizzamania/register' element={<UserRegister/>} />
        <Route path='/pizzamania/myOrders' element={<MyOrderPage/>} />
      </Routes>
    </>
  )
}

export default App

 