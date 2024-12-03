import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
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

  getUserById(employeeId: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/getUser/${employeeId}`).pipe(
      catchError(this.handleError) // Handle errors
    );
    }
    private handleError(error: HttpErrorResponse) {
      // You can log the error or display a notification to the user here
      console.error('An error occurred:', error);
      return throwError('Something bad happened; please try again later.');
    }
}
