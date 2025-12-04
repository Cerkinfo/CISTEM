import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "@styles/index.scss";

import { SessionProvider } from '@pkg/providers/SessionProvider';
import { LanguageProvider } from '@pkg/providers/LanguageProvider';

import AuthGuard from './AuthGuard';
import Layout from './Layout';
import { Login } from '@front/pages/login';
import { Signup } from '@front/pages/signup';

function App() {
  return (
    <SessionProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/fosdem-bar" element={<div>fosdem bar</div>} />

            <Route path="/" element={<AuthGuard><Layout /></AuthGuard>}>
              <Route index element={<div>Home</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </SessionProvider>
  );
}

export default App;
