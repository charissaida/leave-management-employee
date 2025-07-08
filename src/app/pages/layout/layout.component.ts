import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent {
  constructor(private router: Router) {}

  onLogout() {
    localStorage.removeItem('leaveApp');
    this.router.navigateByUrl('/login');
  }
}
