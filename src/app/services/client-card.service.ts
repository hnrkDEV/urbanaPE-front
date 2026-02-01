import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ClientCard {
  id: number;
  numeroCartao: number;
  nome: string;
  status: boolean;
  tipoCartao: 'COMUM' | 'ESTUDANTE' | 'TRABALHADOR';
  saldo: number;
  limite: number;
  hasTransactions?: boolean;
}

export interface CardTransaction {
  id: number;
  type: 'CREDIT';
  valor: number;
  saldoAnterior: number;
  saldoAtual: number;
  createdAt: string;
}

@Injectable({ providedIn: 'root' })
export class ClientCardService {
  private baseUrl = `${environment.apiUrl}/cards`;

  constructor(private http: HttpClient) {}

  private getSaldoInicial(tipo: ClientCard['tipoCartao'], limite: number): number {
    switch (tipo) {
      case 'TRABALHADOR':
        return limite;
      case 'COMUM':
      case 'ESTUDANTE':
      default:
        return 0;
    }
  }

  getMyCards() {
    return this.http.get<ClientCard[]>(this.baseUrl).pipe(
      map((cards) =>
        cards.map((card) => {
          const saldoInicial = this.getSaldoInicial(card.tipoCartao, card.limite);

          return {
            ...card,
            hasTransactions: card.saldo !== saldoInicial,
          };
        })
      )
    );
  }

  toggle(id: number) {
    return this.http.patch(`${this.baseUrl}/${id}/toggle`, {});
  }

  credit(cardId: number, valor: number) {
    return this.http.patch<void>(`${this.baseUrl}/${cardId}/credit`, { valor });
  }

  createCard(data: { nome: string; tipoCartao: string }) {
    return this.http.post(`${this.baseUrl}`, data);
  }

  getTransactions(cardId: number) {
    return this.http.get<CardTransaction[]>(`${this.baseUrl}/${cardId}/transactions`);
  }
}
