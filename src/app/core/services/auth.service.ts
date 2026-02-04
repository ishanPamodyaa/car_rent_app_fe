import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserRole } from '../models/user-role.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/auth';
  private roleSubject = new BehaviorSubject<UserRole>(UserRole.GUEST);
  role$ = this.roleSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadRoleFromStorage();
  }

  private loadRoleFromStorage() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      this.roleSubject.next(UserRole.GUEST);
      return;
    }

    this.roleSubject.next(JSON.parse(user).role);
  }

  getRole(): UserRole {
    return this.roleSubject.value;
  }

  register(registerObj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, registerObj);
  }

  login(loginObj: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginObj).pipe(
      tap((res: any) => {
        console.log('Login response:', res); // Debug logging
        // Backend returns: jwt, userid, userRoles
        if(res.userid && res.userRoles) {
            const user = {
                id: res.userid,
                role: res.userRoles,
                email: loginObj.email
            };
            this.setSession(res.jwt, user);
        } else {
            console.error('Invalid response structure:', res);
        }
      })
    );
  }

  private setSession(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.roleSubject.next(user.role as UserRole);
  }

  // Legacy method kept for compatibility if needed, but setSession is preferred
  loginLocal(token: string, user: any) {
    this.setSession(token, user);
  }

  logout() {
    localStorage.clear();
    this.roleSubject.next(UserRole.GUEST);
  }

  isLoggedIn(): boolean {
    return this.getRole() !== UserRole.GUEST;
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}
