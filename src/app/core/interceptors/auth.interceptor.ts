import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  console.log('🔒 AuthInterceptor - URL:', req.url);
  console.log('🔒 AuthInterceptor - Token exists:', !!token);
  console.log('🔒 AuthInterceptor - Token:', token);

  if (token) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('🔒 AuthInterceptor - Headers:', cloned.headers.get('Authorization'));
    return next(cloned);
  }

  console.log('🔒 AuthInterceptor - No token, sending original request');
  return next(req);
};
