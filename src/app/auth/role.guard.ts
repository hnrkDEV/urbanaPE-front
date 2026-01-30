import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role: 'ADMIN' | 'CLIENT';
}

export const roleGuard = (requiredRole: 'ADMIN' | 'CLIENT'): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const token = localStorage.getItem('token');

    if (!token) {
      router.navigate(['/login']);
      return false;
    }

    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.role !== requiredRole) {
      router.navigate(['/login']);
      return false;
    }

    return true;
  };
};
