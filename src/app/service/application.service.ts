import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getApplicationsByCandidateId(username: string): Observable<Application[]> {
    const url = `${this.baseUrl}/applicationsByCandidateId/${username}`;
    return this.http.get<Application[]>(url);
  }

  getApplicationsByJobId(jobId: string): Observable<Application[]> {
    const url = `${this.baseUrl}/getApplicationsByjobId/${jobId}`;
    return this.http.get<Application[]>(url);
  }

  getApplicationsByCreatedBy(employeeId: string): Observable<Application[]> {
    const url = `${this.baseUrl}/applicationsBycreatedBy/${employeeId}`;
    return this.http.get<Application[]>(url);
  }

  postApplication(formData: FormData): Observable<any> {
    const apiUrl = 'http://127.0.0.1:5000/postApplication'; // Your backend endpoint

    return this.http.post<any>(apiUrl, formData);
  }

  updateApplicationStatus(applicationId: number, status: string) {
    const url = `${this.baseUrl}/updateStatusByApplicationId/${applicationId}/status`;
    const body = { status };

    return this.http.put(url, body); // Assuming PUT method is needed
  }
}


