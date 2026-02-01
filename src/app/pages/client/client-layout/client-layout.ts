import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './client-layout.html',
  styleUrl: './client-layout.css',
})
export class ClientLayout implements OnInit {
  user$!: Observable<{ nome: string; role: string }>;

  isSidebarOpen = false;

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit() {
    this.user$ = this.userService.me();
  }

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

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
