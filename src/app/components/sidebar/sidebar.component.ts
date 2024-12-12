import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  @Input() sideNavStatus: boolean = false;

  listEnd = [
    {
      number: '1',
      name: 'About Us',
      icon: 'bi bi-info-circle-fill',
      route: '/layout/aboutus',
      roles: ['recruiter', 'interviewer', 'admin'] // Can be seen by all roles
    }
  ];
  sidebarItems = [
    {
      number: '1',
      name: 'Dashboard',
      icon: 'bi bi-kanban-fill',
      route: '/layout/',
      roles: ['recruiter', 'interviewer', 'admin', ] // Can be seen by all roles
    },
    {
      number: '1',
      name: 'Dashboard',
      icon: 'bi bi-kanban-fill',
      route: '/candidateLayout/',
      roles: ['candidate'] // Can be seen by all roles
    },
    {
      number: '2',
      name: 'User Profile',
      icon: 'bi bi-person-fill',
      route: '/layout/userProfile',
      roles: ['recruiter'] 
    },
    {
      number: '2',
      name: 'Job Opening',
      icon: 'bi bi-person-fill',
      route: '/layout/createJob',
      roles: ['recruiter'] 
    },
    {
      number: '2',
      name: 'Job Draft',
      icon: 'bi bi-person-fill',
      route: '/layout/jobDraft',
      roles: ['recruiter'] 
    },
    {
      number: '3',
      name: 'Job Details',    
      icon: 'bi bi-person-badge',
      route: '/layout/viewJobDetails',
      roles: ['recruiter'] 
    },
    {
      number: '4',
      name: 'Job Applications',
      icon: 'bi bi-person-badge-fill',
      route: '/layout/jobApplications',
      roles: ['recruiter'] 
    },
    
    {
      number: '7',
      name: 'Interviews',
      icon: 'bi bi-speedometer',
      route: '/layout/scheduleInterview',
      roles: ['recruiter'] 
    },
    {
      number: '6',
      name: 'Interview Details',
      icon: 'bi bi-award-fill',
      route: '/layout/interviewDetails',
      roles: ['recruiter'] 
    },
    {
      number: '6',
      name: 'Demo',
      icon: 'bi bi-award-fill',
      route: '/layout/demo',
      roles: ['recruiter'] 
    },
    {
      number: '5',
      name: 'Profile',
      icon: 'bi bi-file-earmark-break-fill',
      route: '/candidateLayout/candidateProfile',
      roles: ['candidate'] 
    },
    {
      number: '5',
      name: 'Apply Job',
      icon: 'bi bi-file-earmark-break-fill',
      route: '/candidateLayout/applyJob',
      roles: ['candidate'] 
    },

    {
      number: '5',
      name: 'Applied Jobs',
      icon: 'bi bi-file-earmark-break-fill',
      route: '/candidateLayout/appliedJobs',
      roles: ['candidate'] 
    },
    
  ];

  filteredList: any[] = [];
  selectedItem: any;
  userRole: string;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');

    // Filter the list of items based on user role
    this.filteredList = this.sidebarItems.filter(item => 
      item.roles.includes(this.userRole)
    );
  }

  navigateToPage(item: any) {
    this.selectedItem = item;
    this.router.navigate([item.route]);
  }
  
  
}
