import { Component } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterModule],
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
