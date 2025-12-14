import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "@styles/style.scss";

import { SessionProvider } from '@pkg/providers/SessionProvider';
import { LanguageProvider } from '@pkg/providers/LanguageProvider';

import AuthGuard from './AuthGuard';
import Layout from './Layout';

import { Login } from '@front/pages/login';
import { Signup } from '@front/pages/signup';

import Beers from '@front/pages/beers';
import Softs from '@front/pages/softs';
import Foods from '@front/pages/foods';
import Coffee from '@front/pages/coffee';

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
              <Route path="/beers" element={<Beers />} />
              <Route path="/softs" element={<Softs />} />
              <Route path="/foods" element={<Foods />} />
              <Route path="/coffee" element={<Coffee />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </SessionProvider>
  );
}

export default App;
