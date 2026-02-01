import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { catchError, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { ConfirmDialogComponent } from '../../../components/confirm-dialog.component';
import { EditUserDialogComponent } from '../../../components/edit-user-dialog.component';
import { UserInterface, UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './admin-users.html',
  styleUrl: './admin-users.css',
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
export class AdminUsers implements OnInit {
  private refresh$ = new Subject<void>();

  users$!: Observable<UserInterface[]>;
  actionLoading = false;
  error = '';

  constructor(private userService: UserService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.users$ = this.refresh$.pipe(
      startWith(void 0),
      switchMap(() =>
        this.userService.searchUsers().pipe(
          catchError(() => {
            this.error = 'Não foi possível carregar os usuários.';
            return of([] as UserInterface[]);
          })
        )
      )
    );
  }

  editUser(user: UserInterface) {
    const dialogRef = this.dialog.open(EditUserDialogComponent, {
      data: user,
      width: '420px',
      disableClose: true,
      panelClass: 'urban-dialog',
    });

    dialogRef.afterClosed().subscribe((updated: boolean) => {
      if (updated) {
        this.reload();
      }
    });
  }

  reload() {
    this.refresh$.next();
  }

  deleteUser(user: UserInterface) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Excluir usuário',
        message: `Deseja realmente remover o usuário "${user.nome}"?`,
        confirmText: 'Excluir',
      },
      panelClass: 'confirm-dialog',
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;

      this.actionLoading = true;

      this.userService.removeUser(user.id).subscribe({
        next: () => {
          this.actionLoading = false;
          this.reload();
        },
        error: () => {
          this.error = 'Erro ao remover o usuário.';
          this.actionLoading = false;
        },
      });
    });
  }
}
