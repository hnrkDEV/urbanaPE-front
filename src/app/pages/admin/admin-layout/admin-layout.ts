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

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  onNavigate() {
    setTimeout(() => {
      this.isSidebarOpen = false;
    }, 0);
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  ngOnInit() {
    this.user$ = this.userService.me();
  }

  onActivate(component: { loadCards?: () => void; loadUsers?: () => void }) {
    component.loadCards?.();
    component.loadUsers?.();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
