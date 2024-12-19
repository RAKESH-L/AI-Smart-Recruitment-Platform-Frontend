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
      icon: 'fa-solid fa-id-badge',
      route: '/layout/userProfile',
      roles: ['recruiter'] 
    },
    {
      number: '2',
      name: 'User Profile',
      icon: 'fa-solid fa-id-badge',
      route: '/layout/userProfile',
      roles: ['interviewer'] 
    },
    {
      number: '2',
      name: 'Job Opening',
      icon: 'fa-solid fa-suitcase',
      route: '/layout/createJob',
      roles: ['recruiter'] 
    },
    {
      number: '2',
      name: 'Job Draft',
      icon: 'bi bi-file-text-fill',
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
      number: '4',
      name: 'Category',
      icon: 'bi bi-person-badge-fill',
      route: '/layout/category',
      roles: ['recruiter'] 
    },
    {
      number: '7',
      name: 'Interviews',
      icon: 'fa-solid fa-headset',
      route: '/layout/scheduleInterview',
      roles: ['recruiter'] 
    },
    {
      number: '6',
      name: 'Interview Details',
      icon: 'bi bi-phone-vibrate-fill',
      route: '/layout/interviewDetails',
      roles: ['recruiter'] 
    },
    {
      number: '6',
      name: 'Scheduled Interviews',
      icon: 'fa-solid fa-calendar-check',
      route: '/layout/interviewAppointment',
      roles: ['recruiter'] 
    },
    {
      number: '6',
      name: 'ChatBot',
      icon: 'fa-brands fa-discord',
      route: '/layout/chatbot',
      roles: ['recruiter'] 
    },
    {
      number: '6',
      name: 'ScheduledInterview',
      icon: 'bi bi-phone-vibrate-fill',
      route: '/interviewerLayout/scheduledInterview',
      roles: ['interviewer'] 
    },
    {
      number: '6',
      name: 'Demo',
      icon: 'bi bi-award-fill',
      route: '/layout/demo',
      roles: ['candidate'] 
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
    const currentRoute = this.router.url;
    this.selectedItem = this.filteredList.find(item => item.route === currentRoute);
  }

  navigateToPage(item: any) {
    this.selectedItem = item;
    this.router.navigate([item.route]);
  }
  
  
}
