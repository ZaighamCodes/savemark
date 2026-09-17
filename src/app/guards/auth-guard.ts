import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { catchError, map, of } from 'rxjs';
import { Auth } from '../services/auth';

interface User {
  username: string;
}

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const http = inject(HttpClient);
  const auth=inject(Auth);
  // return true;

  return http.get<User>('https://bookmark-manager-2kyh.onrender.com/users/me', { withCredentials: true }).pipe(
    map((response) => 
    {
      auth.currentUser=response;
      return true;
    }),
    
    catchError((error) => {
      console.log('error from server', error);
      router.navigate(['/login']);
      return of(false);
    })
  );
};