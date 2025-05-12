import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Layout from './components/Layout';
import Home from './components/Home';
import ResourcesPage from './components/ResourcesPage';
import ResourceDetailPage from './components/ResourceDetailPage';
import RulesPage from './components/RulesPage';
import IPListsPage from './components/IPListsPage';
import EditIPListPage from './components/EditIPListPage';

const App: React.FC = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/register' element={<RegisterForm />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/resources/:id" element={<ResourceDetailPage />} />
              <Route path="/rules" element={<RulesPage />} />
              <Route path="/ip_lists" element={<IPListsPage />} />
              <Route path="/ip_lists/:id/edit" element={<EditIPListPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
    );
};

export default App;
