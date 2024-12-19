import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Application } from '../../../model/application.model';
import { ApplicationService } from '../../../service/application.service';
import { JobService } from '../../../service/job.service';
import { JobPosting } from '../../../model/Job.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrl: './job-applications.component.css',
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0', opacity: '0', overflow: 'hidden' })),
      state('expanded', style({ height: '*', opacity: '1', overflow: 'visible' })),
      transition('collapsed <=> expanded', [
        animate('300ms ease-in-out'),
      ]),
    ]),
  ],
})
export class JobApplicationsComponent implements OnInit{

  isJobFocused: boolean = false;
  JobValue: string = '';

  isStatusFocused: boolean = false;
  StatusValue: string = '';

  isDeadlineFocused: boolean = false;
  DeadlineValue: string = '';

  showDetailRow = false; // Property to track the detail row visibility

  applications: Application[] = [];
  filteredApplications: Application[] = [];
  errorMessage: string = '';
  jobValue: string = '';        // To hold selected job title
  statusValue: string = '';     // To hold selected status
  deadlineValue: string = '';   // Any other input e.g. deadline
  createdBy: string='';
  nextStatus: string='';
  jobs: JobPosting[] = [];


  constructor(private applicationService: ApplicationService, private jobService: JobService,  public dialog: MatDialog,
    private sanitizer: DomSanitizer) { }

    ngOnInit(): void {
      this.createdBy = localStorage.getItem('username');
      this.loadApplications(this.jobValue, this.statusValue, ); 
      this.fetchJobPostings();
    }

    
    fetchJobPostings(): void {
      this.jobService.getJobsByEmployeeId(this.createdBy).subscribe(data => {
        this.jobs = data; // Store the received data
        
    
        console.log(this.jobs); // Log the jobs for debug purposes
    
      }, error => {
        console.error('Error fetching job postings:', error);
      });
    }

    

    loadApplications(jobTitle: string, status: string, deadline?: string) {
        const username = localStorage.getItem('username');

        this.applicationService.getApplications(username, jobTitle, status).subscribe({
            next: (data) => {
                this.applications = data;
                this.filteredApplications = data;
                console.log("appliaction", this.applications);

            },
            error: (error) => {
                this.errorMessage = 'Failed to load applications';
                console.error(error);
            }
        });
    }

    filterApplications() {
      this.filteredApplications = this.applications.filter(application => {
          const matchesJobTitle = this.jobValue ? application.job_title === this.jobValue : true;
          const matchesStatus = this.statusValue ? application.application_status === this.statusValue : true;
          
          return matchesJobTitle && matchesStatus;
      });
  }

  moveToNextStage(application: any) {
    const appId = application.application_id
    const status = application.application_status
    console.log(status);
    if (status == 'submitted'){
      this.nextStatus = 'shortlisted'
    } else if (status == 'interviewing'){
      this.nextStatus = 'offered'
    }
    this.applicationService.updateApplicationStatus(appId, this.nextStatus).subscribe({
      next: (data) => {
        console.log('Status updated successfully', data);
        // Optionally, reload or update the applications list here if needed
        this.loadApplications(this.jobValue, this.statusValue, ); 

      },
      error: (error) => {
        console.error('Failed to update status', error);
      }
    });
  }

  reject(applicationId: number) {
    this.applicationService.updateApplicationStatus(applicationId, 'rejected').subscribe({
      next: (data) => {
        console.log('Status updated successfully', data);
        // Optionally, reload or update the applications list here if needed
        this.loadApplications(this.jobValue, this.statusValue, ); 

      },
      error: (error) => {
        console.error('Failed to update status', error);
      }
    });
  }

  onJobChange(event: Event) {
    console.log("yes", event);
    
      this.jobValue = (event.target as HTMLSelectElement).value;
      this.filterApplications(); // Call filtering method
  }

  onStatusChange(event: Event) {
      this.statusValue = (event.target as HTMLSelectElement).value;
      this.filterApplications(); // Call filtering method
  }

  
  tables = [
    { id: 1, name: 'Andrew McDownland', project: 'Elite Admin', symbol: 'H', position: 'Front end Developer', showDetailRow: false },
    { id: 2, name: 'John Smith', project: 'Real Homes', symbol: 'He', position: 'Web Designer', showDetailRow: false },
    { id: 3, name: 'Jane Doe', project: 'MedicalPro', symbol: 'Li', position: 'Project Manager', showDetailRow: false },
    // Add more rows as needed...
  ];
  expandedIndex: number | null = null; // To track which row is currently expanded
  selectedApplication: any | null = null;
  newStatusValue: string; // To hold the new status value
  resumePath: SafeResourceUrl;

  openApplicantModal(application: any) {
    this.selectedApplication = application; // Set the selected application details
    this.newStatusValue = application.application_status; // Initialize new status

    // Fetch the resume by application ID
    this.applicationService.getResumeById(application.application_id).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        this.resumePath = this.sanitizer.bypassSecurityTrustResourceUrl(url); // Sanitize the URL
      },
      (error) => {
        console.error('Error fetching resume:', error);
        this.resumePath = null; // Handle error appropriately
      }
    );

    document.getElementById('applicantModal')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll
  }

  closeApplicantModal() {
    document.getElementById('applicantModal')!.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll
  }


saveStatus() {
  // Here, you'll implement the logic to save the new status.
  console.log(`Saving new status: ${this.newStatusValue} for application ID: ${this.selectedApplication.application_id}`);
  
  // Example: Update the selected application's status (in a real app, this might involve a service call)
  this.selectedApplication.application_status = this.newStatusValue;

  // You could also make an API call here to save this change in your database.
  
  // Close modal after saving
  this.closeApplicantModal();
}
  toggleDetailRow(index: number): void {
    // If the same row is clicked, collapse it; otherwise open the new row and close others.
    if (this.expandedIndex === index) {
      this.expandedIndex = null; // Collapse if the same row is clicked
    } else {
      this.expandedIndex = index; // Set the new row index to expand
    }
  }
  toggleDetailRow1(): void {
    this.showDetailRow = !this.showDetailRow; // Toggle the visibility on button click
  }

  onJobFocus() {
    this.isJobFocused = true;
    
  }

  onJobBlur() {
    if (!this.JobValue) {
      this.isJobFocused = false;
    }
  }

  onStatusFocus() {
    this.isStatusFocused = true;
    
  }

  onStatusBlur() {
    if (!this.StatusValue) {
      this.isStatusFocused = false;
    }
  }

  onDeadlineFocus() {
    this.isDeadlineFocused = true;
    
  }

  onDeadlineBlur() {
    if (!this.DeadlineValue) {
      this.isDeadlineFocused = false;
    }
  }
}
