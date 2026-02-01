import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { CardTransactionsModalComponent } from '../../../components/card-transactions-modal.component';
import { CreateCardModalComponent } from '../../../components/create-card-modal.component';
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

  podeCreditar(card: ClientCard): boolean {
    if (!card.status) return false;
    if (card.tipoCartao === 'ESTUDANTE') return false;
    if (card.tipoCartao === 'TRABALHADOR') return false;
    return true;
  }

  motivoBloqueio(card: ClientCard): string | null {
    if (!card.status) return 'Cartão inativo';
    if (card.tipoCartao === 'ESTUDANTE') return 'Crédito permitido apenas pela administração';
    return null;
  }

  credit(card: ClientCard) {
    if (!this.podeCreditar(card)) {
      this.toastr.warning(this.motivoBloqueio(card) || 'Operação não permitida');
      return;
    }

    const dialogRef = this.dialog.open(CreditCardModalComponent, {
      data: {
        saldo: card.saldo,
        limite: card.limite,
      },
      disableClose: true,
      panelClass: 'txc-dialog-panel',
    });

    dialogRef.afterClosed().subscribe((valor: number) => {
      if (!valor || valor <= 0) return;

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

  createCard() {
    const dialogRef = this.dialog.open(CreateCardModalComponent, {
      disableClose: true,
      panelClass: 'txc-dialog-panel',
    });

    dialogRef.afterClosed().subscribe((data) => {
      if (!data) return;

      this.service.createCard(data).subscribe({
        next: () => {
          this.toastr.success('Cartão criado com sucesso');
          this.loadCards();
        },
        error: (err) => {
          this.toastr.error(err.error?.message || 'Erro ao criar cartão');
        },
      });
    });
  }

  openTransactions(card: ClientCard) {
    this.dialog.open(CardTransactionsModalComponent, {
      data: { cardId: card.id },
      width: '420px',
      panelClass: 'txc-dialog-panel',
    });
  }
}
