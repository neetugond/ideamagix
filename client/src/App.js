import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { ToastContextProvider } from './context/ToastContext';
import { AuthContextProvider } from './context/AuthContext';

const App = () => {
    return (
        <BrowserRouter>
            <ToastContextProvider>
                <AuthContextProvider>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                    </Layout>
                </AuthContextProvider>
            </ToastContextProvider>
        </BrowserRouter>
    )
};

export default App;
