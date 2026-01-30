import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AdminCard } from './admin-card.service';

@Injectable({ providedIn: 'root' })
export class ClientCardService {
  private baseUrl = `${environment.apiUrl}/cards`;

  constructor(private http: HttpClient) {}

  getMyCards() {
    return this.http.get<AdminCard[]>(this.baseUrl);
  }

  toggle(id: number) {
    return this.http.patch(`${this.baseUrl}/${id}/toggle`, {});
  }
}
