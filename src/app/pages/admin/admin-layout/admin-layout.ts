import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout implements OnInit {
  user$!: Observable<{ nome: string; role: string }>;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.user$ = this.userService.me();
  }

  onActivate(component: { loadCards?: () => void }) {
    component.loadCards?.();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
