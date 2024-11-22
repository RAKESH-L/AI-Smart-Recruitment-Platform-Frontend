import { Injectable } from '@angular/core';
import { JobPosting } from '../model/Job.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Interview } from '../model/interview.model';
import { InterviewDetails } from '../model/interviewdetails.model';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {

  private apiUrl = 'http://127.0.0.1:5000/getJobsByEmployeeId';
  private baseUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getJobsByEmployeeId(employeeId: string): Observable<JobPosting[]> {
    return this.http.get<JobPosting[]>(`${this.apiUrl}/${employeeId}?status=open,in progress`);
  }

  postInterview(interviewData: Interview): Observable<any> {
    return this.http.post('http://127.0.0.1:5000/postInterview', interviewData);
  }

  getInterviewsByOwnerId(ownerId: string): Observable<InterviewDetails[]> {
    return this.http.get<InterviewDetails[]>(`${this.baseUrl}/getInterviewsByOwnerId/${ownerId}`);
  }

  rescheduleInterview(interviewId: any, interviewData: any): Observable<Interview>{
    return this.http.patch<any>(`http://127.0.0.1:5000/updateInterview/${interviewId}`, interviewData);
  }
}