import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface UserInterface {
  id: number;
  nome: string;
  email: string;
  role: 'CLIENT' | 'ADMIN';
}

export interface UserWithCards {
  userId: number;
  nome: string;
  role: string;
  totalCards: number;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  me() {
    return this.http.get<{ nome: string; role: string }>(`${environment.apiUrl}/users/me`);
  }

  searchUsers(): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${environment.apiUrl}/users`);
  }

  getUsersWithCards(): Observable<UserWithCards[]> {
    return this.http.get<UserWithCards[]>(`${environment.apiUrl}/users/with-cards`);
  }

  removeUser(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/users/${id}`);
  }
}
