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
  
  constructor(private authService: AuthService, private userService: EmployeeService, private linkedinservice: LinkedinService) {}


  ngOnInit(): void {
    this.fetchEmployeeDetails();
    // this.fetchLinkedInDetails();
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
  // fetchLinkedInDetails(): void {
  //   const employeeId = localStorage.getItem('username');
  //   console.log(employeeId);
    
  //   this.linkedinservice.getLinkedInByEmployeeId(employeeId).subscribe(
  //     (response) => {
  //       this.linkedInData = response;
  //       console.log('LinkedInDetails Details:', this.linkedInData);
  //     },
  //     (error) => {
  //       console.error('Error fetching linkedin details:', error);
  //     }
  //   );
  // }

  // toggleProfileDropdown() {
  //   this.profileDropdownOpen = !this.profileDropdownOpen;
  // }
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
}
