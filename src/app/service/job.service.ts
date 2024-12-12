import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobPosting } from '../model/Job.model';
import { Observable } from 'rxjs';
import { JobLog } from '../model/joblog.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {

  private apiEndpoint = 'http://127.0.0.1:5000/postJobsWithSkills';
  private apiUrl = 'http://127.0.0.1:5000/getJobsByEmployeeId';
  private api = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  // Function to submit the job posting data
  submitJobPosting(jobData: JobPosting): Observable<any> {
    return this.http.post(this.apiEndpoint, jobData);
  }

  getJobsByEmployeeId(employeeId: string): Observable<JobPosting[]> {
    return this.http.get<JobPosting[]>(`${this.apiUrl}/${employeeId}?status=open,closed,in progress`);
  }

  getDraftJobsByEmployeeId(employeeId: string): Observable<JobPosting[]> {
    return this.http.get<JobPosting[]>(`${this.apiUrl}/${employeeId}?status=drafted`);
  }

  deleteJobById(JobId: string): Observable<any> {
    return this.http.delete<any>(`http://127.0.0.1:5000/deleteJobByJobId/${JobId}`)
  }

  getJobLogsByEmployeeId(employeeId: string): Observable<JobLog[]>{
    return this.http.get<JobLog[]>('http://127.0.0.1:5000/jobLogsByPerformedById/2000080631')
  }

  getAllJobs(): Observable<JobPosting[]> {
    return this.http.get<JobPosting[]>(`${this.api}/getAllJobs?status=open`);
  }

  getJobByJobId(JobId: string): Observable<JobPosting> {
    return this.http.get<JobPosting>(`${this.api}/getJobByJobId/${JobId}`);
  }
}
