import { Component, OnInit, Output, EventEmitter } from '@angular/core';
// import { ProfileCardComponent } from './profile-card/profile-card.component';
// import { AuthService } from 'src/app/service/auth.service';
import { Employee } from '../../model/employee.model';
import { AuthService } from '../../service/auth.service';
import { EmployeeService } from '../../service/employee.service';
import { LinkedIn } from '../../model/linkedin.model';
import { LinkedinService } from '../../service/linkedin.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  @Output() sideNavToggled: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuStatus: boolean = false;
  public profileDropdownOpen = false;
  isProfileDropdownOpen = false;
  employeeData: Employee;
  linkedInData: LinkedIn;

  isNotificationOpen = false;
  notifications = [
    {
      image: '../assets/img/faces/user-1.png',
      title: 'Roman Joined the Team!',
      message: 'Congratulate him'
    },
    {
      image: 'assets/profile2.png',
      title: 'New message received',
      message: 'Salma sent you a new message'
    },
    {
      image: 'assets/profile3.png',
      title: 'New Payment received',
      message: 'Check your earnings'
    },
    {
      image: 'assets/profile4.png',
      title: 'Jolly completed tasks',
      message: 'Assign her new tasks'
    },
    {
      image: 'assets/profile5.png',
      title: 'Roman Joined the Team!',
      message: 'Congratulate him'
    }
  ];


  
  constructor(private authService: AuthService, private userService: EmployeeService, private linkedinservice: LinkedinService) {}


  ngOnInit(): void {
    this.fetchEmployeeDetails();
  }
  toggleNotifications() {
    this.isNotificationOpen = !this.isNotificationOpen;
  }

  fetchEmployeeDetails(): void {
    const employeeId = localStorage.getItem('username');
    console.log(employeeId);
    
    this.userService.getUserById(employeeId).subscribe(
      (response) => {
        this.employeeData = response;
        console.log('Employee Details:', this.employeeData);
      },
      (error) => {
        console.error('Error fetching employee details:', error);
      }
    );
  }

  toggleProfileDropdown() {
    this.isProfileDropdownOpen = !this.isProfileDropdownOpen;
  }

  logout() {
    // Call the logout method from AuthService
    this.authService.logout();
  }

  

  toggleSidebar() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  openSettings() {
    console.log('Settings icon clicked!');
    // Logic for opening settings or performing any action
  }
}
