import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-leave',
  imports: [CommonModule, FormsModule],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.css',
})
export class LeaveComponent {
  isModalOpen: boolean = false;
  leaveList: any[] = [];
  loggedUserData: any;
  leaveObj = {
    leaveId: 0,
    employeeId: 0,
    leaveDate: new Date(),
    leaveReason: '',
  };

  constructor(private empService: EmployeeService) {
    const localData = localStorage.getItem('leaveApp');
    if (localData != null) {
      this.loggedUserData = JSON.parse(localData);
      this.leaveObj.employeeId = this.loggedUserData.empId;
    }
  }

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves() {
    this.empService
      .getLeavesByEmpId(this.loggedUserData.empId)
      .subscribe((res: any) => {
        this.leaveList = res.data;
      });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  createLeave() {
    this.empService.createLeave(this.leaveObj).subscribe((res: any) => {
      if (res.result) {
        alert('Leave Created');
        this.loadLeaves();
        this.closeModal();
      } else {
        alert(res.message);
      }
    });
  }

  approveLeave(id: number) {
    this.empService.approveLeave(id).subscribe((res: any) => {
      if (res.result) {
        alert('Leave Approved');
        this.loadLeaves();
      } else {
        alert(res.message);
      }
    });
  }

  rejectLeave(id: number) {
    this.empService.rejectLeave(id).subscribe((res: any) => {
      if (res.result) {
        alert('Leave Rejected');
        this.loadLeaves();
      } else {
        alert(res.message);
      }
    });
  }
}
