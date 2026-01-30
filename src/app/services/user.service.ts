import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {}

  me() {
    return this.http.get<{ nome: string; role: string }>(`${environment.apiUrl}/users/me`);
  }
}
