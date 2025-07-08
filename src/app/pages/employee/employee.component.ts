import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee',
  imports: [CommonModule, FormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent {
  employeeList: any[] = [];
  employeeObj: any = {
    empId: 0,
    empName: '',
    empContactNo: '',
    empEmail: '',
    password: '',
    role: '',
  };
  isModalOpen: boolean = false;

  constructor(private empService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.empService.getAllEmployees().subscribe((res: any) => {
      this.employeeList = res.data;
    });
  }

  openModal() {
    this.resetForm();
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onEdit(item: any) {
    this.employeeObj = { ...item }; // Salin objek untuk diedit
    this.isModalOpen = true;
  }

  onSave() {
    this.empService.createEmployee(this.employeeObj).subscribe((res: any) => {
      if (res.result) {
        alert('Employee Created');
        this.loadEmployees();
        this.closeModal();
      } else {
        alert(res.message);
      }
    });
  }

  onUpdate() {
    this.empService.updateEmployee(this.employeeObj).subscribe((res: any) => {
      if (res.result) {
        alert('Employee Updated');
        this.loadEmployees();
        this.closeModal();
      } else {
        alert(res.message);
      }
    });
  }

  onDelete(id: number) {
    const isConfirm = confirm('Are you sure you want to delete?');
    if (isConfirm) {
      this.empService.deleteEmployee(id).subscribe((res: any) => {
        if (res.result) {
          alert('Employee Deleted');
          this.loadEmployees();
        } else {
          alert(res.message);
        }
      });
    }
  }

  resetForm() {
    this.employeeObj = {
      empId: 0,
      empName: '',
      empContactNo: '',
      empEmail: '',
      password: '',
      role: '',
    };
  }
}
