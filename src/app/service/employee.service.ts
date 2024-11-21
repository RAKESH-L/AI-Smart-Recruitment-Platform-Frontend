import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'http://127.0.0.1:5000/getUser';

  constructor(private http: HttpClient) { }

  getUserById(employeeId: string): Observable<Employee> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.get<Employee>(url);
  }
}
