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
      icon: 'fa-solid fa-business-time',
      route: '/layout/jobDraft',
      roles: ['recruiter'] 
    },
    {
      number: '3',
      name: 'Job Details',    
      icon: 'bi bi-clipboard-check-fill',
      route: '/layout/viewJobDetails',
      roles: ['recruiter'] 
    },
    {
      number: '4',
      name: 'Job Applications',
      icon: 'bi bi-journal-bookmark-fill',
      route: '/layout/jobApplications',
      roles: ['recruiter'] 
    },
    {
      number: '4',
      name: 'Category',
      icon: 'bi bi-diagram-3-fill',
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
      name: 'Generate Report',
      icon: 'fa-solid fa-clipboard-list',
      route: '/layout/customReport',
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
      route: '/candidateLayout/candidateReview',
      roles: ['candidate', 'recruiter'] 
    },
    {
      number: '5',
      name: 'Profile',
      icon: 'fa-solid fa-id-badge',
      route: '/candidateLayout/candidateProfile',
      roles: ['candidate'] 
    },
    {
      number: '5',
      name: 'Apply Job',
      icon: 'bi bi-person-workspace',
      route: '/candidateLayout/applyJob',
      roles: ['candidate'] 
    },

    {
      number: '5',
      name: 'Applied Jobs',
      icon: 'bi bi-suitcase-lg-fill',
      route: '/candidateLayout/appliedJobs',
      roles: ['candidate'] 
    },
    
  ];

  filteredList: any[] = [];
  selectedItem: any;
  userRole: string;
  isExpanded: boolean = false; 
  groupedItems: { [key: string]: any[] } = {};
  headings: string[] = []; // Array to hold the heading keys

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userRole = localStorage.getItem('role');

    switch (this.userRole) {
      case 'recruiter':
        this.groupedItems = this.getRecruiterGroup();
        break;
      case 'candidate':
        this.groupedItems = this.getCandidateGroup();
        break;
      case 'interviewer':
        this.groupedItems = this.getInterviewerGroup();
        break;
    }

    // Populate headings based on the grouped items
    this.headings = Object.keys(this.groupedItems);
  }

  getRecruiterGroup() {
    const filteredList = this.sidebarItems.filter(item => item.roles.includes('recruiter'));

    return {
      'HOME': filteredList.filter(item => item.name === 'Dashboard' || item.name === 'User Profile'),
      'JOB': filteredList.filter(item => item.name === 'Job Opening' || item.name === 'Job Applications' || item.name === 'Job Draft' || item.name === 'Job Details'),
      'CATEGORY': filteredList.filter(item => item.name === 'Category' ),
      'INTERVIEW': filteredList.filter(item => item.name === 'Interviews'|| item.name === 'Interview Details'|| item.name === 'Scheduled Interviews' ),
      'REPORT': filteredList.filter(item => item.name === 'Generate Report' ),
      'OTHERS': filteredList.filter(item => ['ChatBot'].includes(item.name))
    };
  }

  getCandidateGroup() {
    const filteredList = this.sidebarItems.filter(item => item.roles.includes('candidate'));

    return {
      'HOME': filteredList.filter(item => item.name === 'Dashboard' || item.name === 'Profile' ),
      'JOB': filteredList.filter(item => item.name === 'Applied Jobs' || item.name === 'Apply Job'),
      'OTHERS': filteredList.filter(item => [ 'Demo'].includes(item.name))
    };
  }

  getInterviewerGroup() {
    const filteredList = this.sidebarItems.filter(item => item.roles.includes('interviewer'));

    return {
      'HOME': filteredList.filter(item => item.name === 'Dashboard' || item.name === 'User Profile'),
      'INTERVIEW': filteredList.filter(item => item.name === 'ScheduledInterview' ),
      // 'OTHERS': filteredList.filter(item => !['Dashboard', 'User Profile'].includes(item.name))
    };
  }

  navigateToPage(item: any) {
    this.selectedItem = item;
    this.router.navigate([item.route]);
  }
  onMouseEnter() {
    this.sideNavStatus = true; // Expand sidebar
  }

  onMouseLeave() {
    this.sideNavStatus = false; // Collapse sidebar
  }
  
}
