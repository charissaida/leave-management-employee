import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginObj: any = {
    emailId: '',
    password: '',
  };

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  onLogin() {
    this.employeeService.onLogin(this.loginObj).subscribe((res: any) => {
      if (res.result) {
        localStorage.setItem('leaveApp', JSON.stringify(res.data));
        this.router.navigateByUrl('/dashboard');
      } else {
        alert(res.message);
      }
    });
  }
}
