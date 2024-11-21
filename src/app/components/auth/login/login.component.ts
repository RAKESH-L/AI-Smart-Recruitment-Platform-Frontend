import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
username: string;
  password: string;
  errorMessage: string; // Variable to hold error messages
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    // Check if employeeId or password is empty
    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both Username and password.';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }

    this.authService.login(this.username, this.password).subscribe(
      response => {
        if (response.authenticated) {
          localStorage.setItem("username",this.username);
          console.log(this.username);

          const userRole = response.role;
          if (userRole === 'recruiter') {
            localStorage.setItem("role",userRole);
            this.router.navigate(['/layout']); 
          } else if (userRole === 'candidate') {
            localStorage.setItem("role",userRole);
            this.router.navigate(['/candidateLayout']); 
          }
          
        } else {
          this.errorMessage = 'Incorrect Username or Password. Please try again.';
          setTimeout(() => {
            this.errorMessage = '';
          }, 3000); 
        }
      },
      error => {
        this.errorMessage = 'Error occurred while logging in. Please try again later.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    );
  }

  logout() {
    // Call the logout method from AuthService
    this.authService.logout();
  }

  dismissError() {
    // Method to dismiss the error message
    this.errorMessage = '';
  }

  
  togglePasswordVisibility() {
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    const eyeIcon = document.getElementById('eye-icon');
    if (passwordInput && eyeIcon) {
        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            eyeIcon.classList.remove('bi-eye');
            eyeIcon.classList.add('bi-eye-slash');
        } else {
            passwordInput.type = 'password';
            eyeIcon.classList.remove('bi-eye-slash');
            eyeIcon.classList.add('bi-eye');
        }
    }
}




  isEmailFocused: boolean = false;
  emailValue: string = '';

  isPasswordFocused: boolean = false;
  passwordValue: string = '';

  onEmailFocus() {
    this.isEmailFocused = true;
  }

  onEmailBlur() {
    if (!this.emailValue) {
      this.isEmailFocused = false;
    }
  }

  onPasswordFocus() {
    this.isPasswordFocused = true;
    const eyeIcon = document.getElementById('eye-icon');
    if (eyeIcon) {
        eyeIcon.classList.remove('hidden');
    }
}

onPasswordBlur() {
    if (!this.password) {
        this.isPasswordFocused = false;
        const eyeIcon = document.getElementById('eye-icon');
        if (eyeIcon) {
            eyeIcon.classList.add('hidden');
        }
    }
}
}
