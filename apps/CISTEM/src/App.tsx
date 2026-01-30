import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "@styles/style.scss";

import { SessionProvider } from '@pkg/providers/SessionProvider';

import AuthGuard from './AuthGuard';
import Layout, { PublicLayout } from './Layout';

import { Login } from '@front/pages/login';
import { Signup } from '@front/pages/signup';

import List from '@front/pages/list';
import Profile from '@front/pages/profile';
import Inventory from '@front/pages/inventory';
import { Benevoles } from '@front/pages/benevoles';
import { Credits } from '@front/pages/credits';
import { DrainIdActions } from '@front/pages/id/Drain';
import { Drain } from '@front/pages/drain';
import { Menu } from '@front/pages/menu';
import { Orders } from '@front/pages/orders';

function App() {
  return (
    <SessionProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<PublicLayout />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/menu" element={<Menu />} />
            </Route>

            <Route path="/" element={<AuthGuard><Layout /></AuthGuard>}>
              {/* <Route index element={<HowToFOSDEM />} /> */}
              <Route path="profile/:pseudo" element={<Profile />} />
              {/* <Route path="schedule" element={<></>} /> */}
              <Route index element={<List />} />
              <Route path="drain" element={<Drain />} />
              <Route path="drain/:id" element={<DrainIdActions />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="orders" element={<Orders />} />
              <Route path='benevoles' element={<Benevoles />} />
              <Route path='credits' element={<Credits />} />
            </Route>
            <Route path="*" element={<div>404 Not Found</div>} />
          </Routes>
        </BrowserRouter>
    </SessionProvider>
  );
}

export default App;
