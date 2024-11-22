import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Application } from '../model/application.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private baseUrl = 'http://127.0.0.1:5000'; 
  private baseUrl1 = 'http://localhost:5000/applicationsBycreatedBy';

    constructor(private http: HttpClient) { }

    getApplications(username: string, jobTitle: string, status: string): Observable<Application[]> {
        const url = `${this.baseUrl1}/${username}?job_title=${jobTitle}&status=${status}`;
        return this.http.get<Application[]>(url);
    }


  getResumeById(applicationId: number): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/getResumeByApplicationId/${applicationId}`, { responseType: 'blob' });
  }
}


