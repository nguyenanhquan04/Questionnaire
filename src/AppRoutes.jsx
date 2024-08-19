import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ROUTES from './routes';

const Home = React.lazy(() => import('../src/pages/homepage'));
const SignInPage = React.lazy(() => import('../src/pages/signIn'));
const InternPage = React.lazy(() => import('../src/pages/internPage'));
const AdminPage = React.lazy(() => import('../src/pages/adminPage'));

function AppRoutes({ onLogin }) {
  return (
    <Router>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path={ROUTES.home} element={<Home />} />
            <Route path={ROUTES.signIn} element={<SignInPage onLogin={ onLogin } />} />
            <Route path={ROUTES.internPage} element={<InternPage />} />
            <Route path={ROUTES.adminPage} element={<AdminPage />} />
          </Routes>
        </Suspense>
      </main>
    </Router>
  );
}

export default AppRoutes;
