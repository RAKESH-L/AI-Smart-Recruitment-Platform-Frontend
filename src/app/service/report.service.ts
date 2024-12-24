import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Report } from '../model/report.model';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private baseUrl = 'http://127.0.0.1:5000'; 

  constructor(private http: HttpClient) { }

  createReport(reportData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/createReport`, reportData);
  }

  getAllReports(): Observable<Report[]> {
    return this.http.get<Report[]>(`${this.baseUrl}/getAllReports`);
  }
}
