import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "@styles/style.scss";

import { SessionProvider } from '@pkg/providers/SessionProvider';
import { LanguageProvider } from '@pkg/providers/LanguageProvider';

import AuthGuard from './AuthGuard';
import Layout from './Layout';

import { Login } from '@front/pages/login';
import { Signup } from '@front/pages/signup';

import Beers from '@front/pages/list/beers';
import Softs from '@front/pages/list/softs';
import Foods from '@front/pages/list/foods';
import Coffee from '@front/pages/list/coffee';
import Locations from '@front/pages/list/locations';
import List from '@front/pages/list';
import Profile from '@front/pages/profile';

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
              <Route path="/list" element={<List />} >
                <Route path="/list/beers" element={<Beers />} />
                <Route path="/list/softs" element={<Softs />} />
                <Route path="/list/foods" element={<Foods />} />
                <Route path="/list/coffee" element={<Coffee />} />
                <Route path="/list/locations" element={<Locations />} />
              </Route>
              <Route path="/profile/:pseudo" element={<Profile />} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </SessionProvider>
  );
}

export default App;
