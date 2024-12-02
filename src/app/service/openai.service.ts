import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobPosting } from '../model/Job.model';
import { Observable } from 'rxjs';
import { GenerateJD } from '../model/openai.model';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiEndpoint = 'http://127.0.0.1:5000/generateJD';

  constructor(private http: HttpClient) { }

  generateJD(jobData: GenerateJD): Observable<any> {
    return this.http.post(this.apiEndpoint, jobData);
  }
}
