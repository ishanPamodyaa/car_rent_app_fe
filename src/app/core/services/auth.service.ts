import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserRole } from '../models/user-role.enum';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private roleSubject = new BehaviorSubject<UserRole>(UserRole.GUEST);
  role$ = this.roleSubject.asObservable();

  constructor() {
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

  login(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.roleSubject.next(user.role);
  }

  logout() {
    localStorage.clear();
    this.roleSubject.next(UserRole.GUEST);
  }

  isLoggedIn(): boolean {
    return this.getRole() !== UserRole.GUEST;
  }
}
