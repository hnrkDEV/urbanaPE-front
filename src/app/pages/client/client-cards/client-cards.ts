import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CreditCardModalComponent } from '../../../components/credit-card-modal.component';
import { ClientCard, ClientCardService } from '../../../services/client-card.service';

@Component({
  standalone: true,
  selector: 'app-client-cards',
  imports: [CommonModule],
  templateUrl: './client-cards.html',
  styleUrl: './client-cards.css',
})
export class ClientCards implements OnInit {
  cards$!: Observable<ClientCard[]>;

  constructor(
    private service: ClientCardService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadCards();
  }

  loadCards() {
    this.cards$ = this.service.getMyCards();
  }

  credit(card: ClientCard) {
    const dialogRef = this.dialog.open(CreditCardModalComponent, {
      data: {
        saldo: card.saldo,
        limite: card.limite,
      },
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((valor: number) => {
      if (!valor) return;

      this.service.credit(card.id, valor).subscribe({
        next: () => {
          this.toastr.success('Crédito realizado com sucesso');
          this.loadCards();
        },
        error: (err) => {
          this.toastr.error(err.error?.message || 'Erro ao creditar');
        },
      });
    });
  }
}
