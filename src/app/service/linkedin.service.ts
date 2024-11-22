import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LinkedIn } from '../model/linkedin.model';

@Injectable({
  providedIn: 'root'
})
export class LinkedinService {
  private apiUrl = 'http://127.0.0.1:5000/linkedin/employee';
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getLinkedInByEmployeeId(employeeId: string): Observable<LinkedIn> {
    const url = `${this.apiUrl}/${employeeId}`;
    return this.http.get<LinkedIn>(url);
  }

  initiateLinkedInAuth(employeeId: string): Observable<any> {
    const url = `${this.baseUrl}/profile/${employeeId}`;
    return this.http.get(url);
  }
}
