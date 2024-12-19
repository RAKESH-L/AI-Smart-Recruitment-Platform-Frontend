import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../../model/user.model';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signUpForm: FormGroup;
  user: User;
  msg: string;
  
  isEmailFocused: boolean = false;
  emailValue: string = '';

  isPasswordFocused: boolean = false;
  passwordValue: string = '';

  isRePasswordFocused: boolean = false;
  repasswordValue: string = '';

  isUsernameFocused: boolean = false;
  usernameValue: string = '';

  isFullnameFocused: boolean = false;
  fullnameValue: string = '';

  isContactFocused: boolean = false;
  contactValue: string = '';

  isEmployeeIdFocused: boolean = false;
  employeeIdValue: string = '';
  successMessage: string = '';
  errorMessage: string = ''; // Variable to hold error message

  constructor( 
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      full_name: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      username: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z ]+$/)]),
      phone_number: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      employee_id: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      email: new FormControl('', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password: new FormControl('', [Validators.required,Validators.minLength(5), Validators.maxLength(15), Validators.pattern(/^[a-zA-Z0-9@%_]+$/)]),
      repassword: new FormControl('', [Validators.required])
    });
  }
  onSignUp(){
    console.log(this.signUpForm.value);
    this.user = {
      full_name: this.signUpForm.value.full_name,
      username: this.signUpForm.value.username,
      phone_number: this.signUpForm.value.phone_number,
      employee_id: this.signUpForm.value.employee_id,
      email: this.signUpForm.value.email,
      password: this.signUpForm.value.password,
      role: 'recruiter'
    };
    console.log(this.user);
    
    /* password is == repassword */
    let repassword = this.signUpForm.value.repassword;
    if(! (this.signUpForm.value.password == repassword) ){
      this.msg = '*Passwords do not match';
    }
    else{
      this.authService.addUser(this.user).subscribe({
        next: (response) => {
          console.log('User added successfully:', response);
          this.successMessage = response.message;
          this.clearForm(); 
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
        },
        error: (error) => {
          console.error('Error adding user:', error);
          this.msg = 'Failed to register user. Please try again.';
        }
      });
    }
  }
  clearForm() {
    this.fullnameValue = '';
    this.usernameValue = '';
    this.emailValue = '';
    this.contactValue = '';
    this.employeeIdValue = '';
    this.passwordValue = '';
    this.repasswordValue = '';
    
  }

  dismissError() {
    // Method to dismiss the error message
    this.successMessage = '';
    this.errorMessage='';
  }
  onContactFocus() {
    this.isContactFocused = true;
    
  }

  onContactBlur() {
    if (!this.contactValue) {
      this.isContactFocused = false;
    }
  }

  onEmployeeIdFocus() {
    this.isEmployeeIdFocused = true;
    
  }

  onEmployeeIdBlur() {
    if (!this.employeeIdValue) {
      this.isEmployeeIdFocused = false;
    }
  }

  onUsernameFocus() {
    this.isUsernameFocused = true;
    
  }

  onUsernameBlur() {
    if (!this.usernameValue) {
      this.isUsernameFocused = false;
    }
  }

  onFullnameFocus() {
    this.isFullnameFocused = true;
    
  }

  onFullnameBlur() {
    if (!this.fullnameValue) {
      this.isFullnameFocused = false;
    }
  }

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
    
  }

  onPasswordBlur() {
    if (!this.passwordValue) {
      this.isPasswordFocused = false;
    }
  }

  onRePasswordFocus() {
    this.isRePasswordFocused = true;
    
  }

  onRePasswordBlur() {
    if (!this.repasswordValue) {
      this.isRePasswordFocused = false;
    }
  }
}
