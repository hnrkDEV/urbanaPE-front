import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AdminCard, AdminCardService } from '../../../services/admin-card.service';

@Component({
  selector: 'app-admin-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-cards.html',
  styleUrl: './admin-cards.css',
})
export class AdminCards {
  cards$!: Observable<AdminCard[]>;
  error = '';

  constructor(private adminCardService: AdminCardService) {}

  loadCards() {
    this.cards$ = this.adminCardService.getAll().pipe(delay(500));
  }

  toggleCard(card: AdminCard) {
    this.adminCardService.toggle(card.id).subscribe(() => {
      this.loadCards();
    });
  }

  deleteCard(card: AdminCard) {
    if (!confirm('Deseja remover este cartão?')) return;

    this.adminCardService.delete(card.id).subscribe(() => {
      this.loadCards();
    });
  }
}
