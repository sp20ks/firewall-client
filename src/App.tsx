import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';
import Home from './components/Home';
import ResourcesPage from './components/ResourcesPage';
import ResourceDetailPage from './components/ResourceDetailPage';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setRefreshToken] = useState<string | null>(null);

    const handleLogin = (token: string) => {
        setIsLoggedIn(true);
        setRefreshToken(token);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setRefreshToken(null);
    };

    return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout isLoggedIn={isLoggedIn} handleLogout={handleLogout} />}>
              <Route index element={<Home />} />
              <Route path='/register' element={<RegisterForm />} />
              <Route path='/login' element={<LoginForm onLogin={handleLogin} />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/:id" element={<ResourceDetailPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
    );
};

export default App;
