import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminCard } from '../../../services/admin-card.service';
import { ClientCardService } from '../../../services/client-card.service';

@Component({
  standalone: true,
  selector: 'app-client-cards',
  imports: [CommonModule],
  templateUrl: './client-cards.html',
})
export class ClientCards {
  cards$!: Observable<AdminCard[]>;

  constructor(private service: ClientCardService) {}

  loadCards() {
    this.cards$ = this.service.getMyCards();
  }

  toggle(card: AdminCard) {
    this.service.toggle(card.id).subscribe(() => this.loadCards());
  }
}
