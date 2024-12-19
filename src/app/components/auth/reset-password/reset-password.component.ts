import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  currentPassword: string;
  password: string;
  confirmPassword: string;
  errorMessage: string; // Variable to hold error messages
  showPassword: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  reset() {
    if (!this.currentPassword || !this.password || !this.confirmPassword) {
      this.errorMessage = 'Please enter All Required feilds';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }
    // Check if new password and confirm password match
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'New password and confirm password do not match';
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
      return;
    }
    console.log("current" + this.currentPassword + "new" + this.password + "conforn" + this.confirmPassword);

     // Call the update password method from the service
     this.authService.updatePassword("2000080631", this.password).subscribe({
      next: (response) => {
          // Handle the successful response, e.g., navigate to a new page
          console.log("Password updated successfully", response);
          // Optionally clear the fields or navigate the user somewhere
      },
      error: (error) => {
          // Handle error (e.g., display message)
          this.errorMessage = 'Failed to update password. Please try again.';
          setTimeout(() => {
              this.errorMessage = '';
          }, 3000);
      }
  });
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

  toggleCurrentPasswordVisibility() {
    const passwordInput1 = document.getElementById('currentPassword') as HTMLInputElement;
    const eyeIcon = document.getElementById('eye-icon1');
    if (passwordInput1 && eyeIcon) {
      if (passwordInput1.type === 'password') {
        passwordInput1.type = 'text';
        eyeIcon.classList.remove('bi-eye');
        eyeIcon.classList.add('bi-eye-slash');
      } else {
        passwordInput1.type = 'password';
        eyeIcon.classList.remove('bi-eye-slash');
        eyeIcon.classList.add('bi-eye');
      }
    }
  }

  toggleConfirmPasswordVisibility() {
    const passwordInput = document.getElementById('confirmPassword') as HTMLInputElement;
    const eyeIcon = document.getElementById('eye-icon2');
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


  isCurrentFocused: boolean = false;
  currentValue: string = '';

  isNewPasswordFocused: boolean = false;
  newPasswordValue: string = '';

  isConfirmPasswordFocused: boolean = false;
  confirmPasswordValue: string = '';


  onEmailFocus() {
    this.isCurrentFocused = true;
    const eyeIcon = document.getElementById('eye-icon1');
    if (eyeIcon) {
      eyeIcon.classList.remove('hidden');
    }
  }

  onEmailBlur() {
    if (!this.currentPassword) {
      this.isCurrentFocused = false;
      const eyeIcon = document.getElementById('eye-icon1');
      if (eyeIcon) {
        eyeIcon.classList.add('hidden');
      }
    }
  }

  onPasswordFocus() {
    this.isNewPasswordFocused = true;
    const eyeIcon = document.getElementById('eye-icon');
    if (eyeIcon) {
      eyeIcon.classList.remove('hidden');
    }
  }

  onPasswordBlur() {
    if (!this.password) {
      this.isNewPasswordFocused = false;
      const eyeIcon = document.getElementById('eye-icon');
      if (eyeIcon) {
        eyeIcon.classList.add('hidden');
      }
    }
  }

  onConfirmFocus() {
    this.isConfirmPasswordFocused = true;
    const eyeIcon = document.getElementById('eye-icon2');
    if (eyeIcon) {
      eyeIcon.classList.remove('hidden');
    }
  }

  onConfirmBlur() {
    if (!this.confirmPassword) {
      this.isConfirmPasswordFocused = false;
      const eyeIcon = document.getElementById('eye-icon2');
      if (eyeIcon) {
        eyeIcon.classList.add('hidden');
      }
    }
  }
}
