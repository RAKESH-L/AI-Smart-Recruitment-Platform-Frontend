import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  firstName: string = '';
  lastName: string = '';
  location: string = '';
  currency: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  profile_url: string = '';
  employeeId: string='';
  user: User | null = null; // Use the User interface
  isEmailFocused: boolean = false;
  emailValue: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.employeeId = localStorage.getItem('username');
    this.getUserData(this.employeeId); // Fetch user data on initialization
  }

  getUserData(employeeId: string) {
    this.userService.getUserById(employeeId).subscribe(response => {
      this.user = response; // Store the response in the user property
      console.log(this.user);
      
    }, error => {
      console.error('Error fetching user data:', error);
    });
  }

  onEmailFocus() {
    this.isEmailFocused = true;
    
  }

  onEmailBlur() {
    if (!this.emailValue) {
      this.isEmailFocused = false;
    }
  }

  // Input focus state
  isInputFocused: { [key: string]: boolean } = {};

  // Method to handle input focus
  onInputFocus(field: string) {
    this.isInputFocused[field] = true;
  }

  // Method to handle input blur
  onInputBlur(field: string) {
    if (!this[field]) {
      this.isInputFocused[field] = false;
    }
  }
}
