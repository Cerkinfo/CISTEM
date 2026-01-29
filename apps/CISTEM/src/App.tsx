import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "@styles/style.scss";

import { SessionProvider } from '@pkg/providers/SessionProvider';
import { LanguageProvider } from '@pkg/providers/LanguageProvider';

import AuthGuard from './AuthGuard';
import Layout, { PublicLayout } from './Layout';

import { Login } from '@front/pages/login';
import { Signup } from '@front/pages/signup';

import List from '@front/pages/list';
import Profile from '@front/pages/profile';
import HowToFOSDEM from '@front/pages/howto';
import Inventory from '@front/pages/inventory';

function App() {
  return (
    <SessionProvider>
      <LanguageProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/fosdem-bar" element={<div>fosdem bar</div>} />
            </Route>

            <Route path="/" element={<AuthGuard><Layout /></AuthGuard>}>
              <Route index element={<HowToFOSDEM />} />
              <Route path="profile/:pseudo" element={<Profile />} />
              <Route path="schedule" element={<></>} />
              <Route path="list" element={<List />} />
              <Route path="drain" element={<></>} />
              <Route path="inventory" element={<Inventory />} />
              <Route path='benevoles' element={<></>} />
              <Route path='credits' element={<></>} />
              <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </LanguageProvider>
    </SessionProvider>
  );
}

export default App;
