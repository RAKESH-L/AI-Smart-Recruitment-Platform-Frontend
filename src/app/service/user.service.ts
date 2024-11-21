import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<User[]> {
    const url = `${this.apiUrl}/getAllUsers`;
    return this.http.get<User[]>(url);
  }

}
