import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  

  private apiUrl = 'http://127.0.0.1:5000/postUser';
  constructor(private http: HttpClient, private router: Router,
    // private localStorageService: LocalStorageService
    ){}

  login(employeeId: string, password: string) {
    return this.http.post<any>('http://localhost:5000/login', { employeeId, password });
  }

  logout() {
    // Clear user session data
    localStorage.removeItem('employeeId');
    // Redirect to login page
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    // Check if employeeId is stored in local storage
    return !!localStorage.getItem('employeeId');
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return this.loggedIn.value;
  }

  // Method to get the authentication status as an observable
  isAuthenticated$(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  updatePassword(userId: string, newPassword: string): Observable<any> {
    const url = `http://127.0.0.1:5000/updateUser/${userId}`;
    const body = { password: newPassword };
    return this.http.post(url, body);
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
}

