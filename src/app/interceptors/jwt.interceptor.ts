import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const tokenType = localStorage.getItem('tokenType') || 'Bearer';

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `${tokenType} ${token}`,
      },
    });
  }

  return next(req);
};
