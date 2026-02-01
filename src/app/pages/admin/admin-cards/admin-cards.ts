import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog.component';
import { AdminCard, AdminCardService } from '../../../services/admin-card.service';

@Component({
  selector: 'app-admin-cards',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './admin-cards.html',
  styleUrl: './admin-cards.css',
  animations: [
    trigger('fadePage', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('300ms ease-out'),
      ]),
    ]),
    trigger('listAnimation', [
      transition(':enter', [
        query(
          'tr',
          [
            style({ opacity: 0, transform: 'translateY(8px)' }),
            stagger(60, animate('250ms ease-out')),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class AdminCards implements OnInit {
  private refresh$ = new Subject<void>();

  cards$!: Observable<AdminCard[]>;
  actionLoading = false;
  error = '';

  constructor(
    private adminCardService: AdminCardService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.cards$ = this.refresh$.pipe(
      startWith(void 0),
      switchMap(() =>
        this.adminCardService.getAll().pipe(
          catchError(() => {
            this.error = 'Não foi possível carregar os cartões.';
            return of([] as AdminCard[]);
          })
        )
      )
    );
  }

  reload() {
    this.refresh$.next();
  }

  toggleCard(card: AdminCard) {
    this.actionLoading = true;

    this.adminCardService.toggle(card.id).subscribe({
      next: () => {
        this.actionLoading = false;
        this.reload();
      },
      error: () => {
        this.error = 'Erro ao atualizar o cartão.';
        this.actionLoading = false;
      },
    });
  }

  deleteCard(card: AdminCard) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir cartão',
        message: `Deseja realmente excluir o cartão "${card.nome}"?`,
        confirmText: 'Excluir',
      },
      panelClass: 'txc-dialog-panel',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.actionLoading = true;

      this.adminCardService.delete(card.id).subscribe({
        next: () => {
          this.actionLoading = false;
          this.reload();
        },
        error: (err) => {
          this.actionLoading = false;

          const message = err?.error?.message || 'Não foi possível excluir o cartão.';

          this.toastr.error(message);
        },
      });
    });
  }
}
