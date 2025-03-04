import React, { useEffect } from 'react'
import { useState } from 'react'

import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage' 
import { useAuthStore } from './store/useAuthStore'


import { Loader } from "lucide-react";
import { Toaster } from 'react-hot-toast'


const App = () => {

  const { authUser,checkAuth,isCheckingAuth ,onlineUsers} = useAuthStore()

  console.log({ onlineUsers});

  useEffect(() =>{
    checkAuth();
  }, [checkAuth]);

  console.log({authUser});

  if( isCheckingAuth && !authUser ) return (
    <div className='flex justify-center items-center h-screen'>
      <Loader className='size-10 animate-spin' />
    </div>
  );
  return (
    <div>

      <Navbar />

      <Routes>

        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser  ? <SignUpPage /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser ? <LoginPage />: <Navigate to="/"/>} />
        <Route path="/settings" element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>

      <Toaster />



    </div>
  )
}

export default App