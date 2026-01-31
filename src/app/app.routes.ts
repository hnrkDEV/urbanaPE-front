import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { roleGuard } from './auth/role.guard';
import { AdminCards } from './pages/admin/admin-cards/admin-cards';
import { AdminHome } from './pages/admin/admin-home/admin-home';
import { AdminLayout } from './pages/admin/admin-layout/admin-layout';
import { AdminUsers } from './pages/admin/admin-users/admin-users';
import { ClientHome } from './pages/client/client-home/client-home';
import { ClientLayout } from './pages/client/client-layout/client-layout';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
  { path: 'login', component: Login },
  { path: 'register', component: Register },

  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuard, roleGuard('ADMIN')],
    children: [
      { path: '', component: AdminHome },
      { path: 'cards', component: AdminCards },
      { path: 'users', component: AdminUsers },
    ],
  },

  {
    path: 'client',
    component: ClientLayout,
    canActivate: [authGuard, roleGuard('CLIENT')],
    children: [{ path: '', component: ClientHome }],
  },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
