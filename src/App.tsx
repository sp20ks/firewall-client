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
import PrivateRoute from './components/PrivateRoute';
import EditRulePage from './components/EditRulePage';
import CreateResourcePage from './components/CreateResourcePage';
import CreateRulePage from './components/CreateRulePage';
import CreateIPListPage from './components/CreateIPListPage';

const App: React.FC = () => {
    return (
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/register' element={<RegisterForm />} />
              <Route path='/login' element={<LoginForm />} />
              <Route path="/resources" element={
                <PrivateRoute>
                  <ResourcesPage />
                </PrivateRoute>
              } />
              <Route path="/resources/:id" element={
                <PrivateRoute>
                  <ResourceDetailPage />
                </PrivateRoute>
              } />
              <Route path="/rules" element={
                <PrivateRoute>
                  <RulesPage />
                </PrivateRoute>
              } />
              <Route path="/ip_lists" element={
                <PrivateRoute>
                  <IPListsPage />
                </PrivateRoute>
              } />
              <Route path="/ip_lists/:id/edit" element={
                <PrivateRoute>
                  <EditIPListPage />
                </PrivateRoute>
              } />
              <Route path="/rules/:id/edit" element={
                <PrivateRoute>
                  <EditRulePage />
                </PrivateRoute>
              } />
              <Route path="/resources/create" element={
                <PrivateRoute>
                  <CreateResourcePage />
                </PrivateRoute>
              } />
              <Route path="/rules/create" element={
                <PrivateRoute>
                  <CreateRulePage />
                </PrivateRoute>
              } />
              <Route path="/ip_lists/create" element={
                <PrivateRoute>
                  <CreateIPListPage />
                </PrivateRoute>
              } />
            </Route>
          </Routes>
        </BrowserRouter>
    );
};

export default App;
