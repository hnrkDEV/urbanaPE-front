import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CardTransaction, ClientCardService } from '../services/client-card.service';

@Component({
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./card-transactions-modal.component.html`,
  styleUrl: './card-transactions-modal.component.css',
})
export class CardTransactionsModalComponent implements OnInit {
  transactions$!: Observable<CardTransaction[]>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { cardId: number },
    private service: ClientCardService
  ) {}

  ngOnInit() {
    this.transactions$ = this.service.getTransactions(this.data.cardId);
  }
}
