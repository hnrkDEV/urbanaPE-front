import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ClientCard, ClientCardService } from '../../../services/client-card.service';

interface ClientDashboardVM {
  totalCards: number;
  activeCards: number;
  cardTypes: string[];
  hasActivity: boolean;
  recentCards: ClientCard[];
}

@Component({
  selector: 'app-client-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-home.html',
  styleUrl: './client-home.css',
})
export class ClientHome implements OnInit {
  dashboard$!: Observable<ClientDashboardVM>;

  constructor(private service: ClientCardService) {}

  ngOnInit() {
    this.dashboard$ = this.service.getMyCards().pipe(
      map((cards) => {
        const activeCards = cards.filter((c) => c.status);
        const cardTypes = [...new Set(cards.map((c) => c.tipoCartao))];

        return {
          totalCards: cards.length,
          activeCards: activeCards.length,
          cardTypes,
          hasActivity: cards.some((c) => c.hasTransactions),
          recentCards: cards.slice(0, 3),
        };
      })
    );
  }
}
