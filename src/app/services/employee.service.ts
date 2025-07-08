import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  apiEndPoint: string =
    'https://freeapi.miniprojectideas.com/api/EmployeeLeave/';
  constructor(private http: HttpClient) {}

  onLogin(obj: any): Observable<any> {
    return this.http.post(this.apiEndPoint + 'Login', obj);
  }

  getAllEmployees(): Observable<any> {
    return this.http.get(this.apiEndPoint + 'GetAllEmployee');
  }

  createEmployee(obj: any): Observable<any> {
    return this.http.post(this.apiEndPoint + 'CreateEmployee', obj);
  }

  updateEmployee(obj: any): Observable<any> {
    return this.http.put(this.apiEndPoint + 'UpdateEmployee', obj);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(this.apiEndPoint + 'DeleteEmployee?id=' + id);
  }

  // Leave Methods
  getAllLeaves(): Observable<any> {
    return this.http.get(this.apiEndPoint + 'GetAllLeaves');
  }

  getLeavesByEmpId(id: number): Observable<any> {
    return this.http.get(this.apiEndPoint + 'GetLeavesByEmployeeId?id=' + id);
  }

  createLeave(obj: any): Observable<any> {
    return this.http.post(this.apiEndPoint + 'CreateLeave', obj);
  }

  approveLeave(id: number): Observable<any> {
    return this.http.put(`${this.apiEndPoint}ApproveLeave?leaveId=${id}`, {});
  }

  rejectLeave(id: number): Observable<any> {
    return this.http.put(`${this.apiEndPoint}RejectLeave?leaveId=${id}`, {});
  }
}
