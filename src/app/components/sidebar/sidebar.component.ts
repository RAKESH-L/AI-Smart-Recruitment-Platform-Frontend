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
      roles: ['recruiter', 'interviewer', 'admin'] // Can be seen by all roles
    },
    {
      number: '2',
      name: 'Job Opening',
      icon: 'bi bi-person-fill',
      route: '/layout/createJob',
      roles: ['recruiter'] // Visible only to recruiters
    },
    {
      number: '2',
      name: 'Job Draft',
      icon: 'bi bi-person-fill',
      route: '/layout/jobDraft',
      roles: ['recruiter'] // Visible only to recruiters
    },
    {
      number: '3',
      name: 'Job Details',    // view-job-details component
      icon: 'bi bi-person-badge',
      route: '/layout/viewJobDetails',
      roles: ['recruiter'] // Visible only to recruiters
    },
    {
      number: '4',
      name: 'Job Applications',
      icon: 'bi bi-person-badge-fill',
      route: '/layout/jobApplications',
      roles: ['recruiter'] // Visible only to interviewers
    },
    {
      number: '5',
      name: 'Generate Skillset Rem',
      icon: 'bi bi-file-earmark-break-fill',
      route: '/layout/trainskillset',
      roles: ['candidate'] // Visible only to admins
    },
    
    {
      number: '7',
      name: 'Interviews',
      icon: 'bi bi-speedometer',
      route: '/layout/scheduleInterview',
      roles: ['recruiter'] // Visible only to admins
    },
    {
      number: '6',
      name: 'Interview Details',
      icon: 'bi bi-award-fill',
      route: '/layout/interviewDetails',
      roles: ['recruiter'] // Visible only to admins
    }
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
