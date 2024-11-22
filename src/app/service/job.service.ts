import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobPosting } from '../model/Job.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiEndpoint = 'http://127.0.0.1:5000/postJobsWithSkills';
  private apiUrl = 'http://127.0.0.1:5000/getJobsByEmployeeId';

  constructor(private http: HttpClient) { }

  // Function to submit the job posting data
  submitJobPosting(jobData: JobPosting): Observable<any> {
    return this.http.post(this.apiEndpoint, jobData);
  }

  getJobsByEmployeeId(employeeId: string): Observable<JobPosting[]> {
    return this.http.get<JobPosting[]>(`${this.apiUrl}/${employeeId}?status=open,closed,in progress`);
  }
}
