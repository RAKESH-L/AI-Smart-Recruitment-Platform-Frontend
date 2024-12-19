import { Component } from '@angular/core';
import { JobPosting } from '../../../model/Job.model';
import { ApplicationService } from '../../../service/application.service';
import { Application } from '../../../model/application.model';

@Component({
  selector: 'app-applied-jobs',
  templateUrl: './applied-jobs.component.html',
  styleUrl: './applied-jobs.component.css'
})
export class AppliedJobsComponent {

  createdBy: string='';
  jobs: JobPosting[] = [];
  selectedJob: Application[] = [];
  filteredJobs: JobPosting[] = []; 
  searchQuery: string = '';
  applications: Application[] = [];
  errorMessage: string = '';
  applicationStatus: string = '';

  headerColors: string[] = ['#5d87ff', '#fa896b', '#ffae1f', '#49beff'];
  currentStep: number = 0; // Track the current step
  steps: string[] = ['', '', '', ''];
  currentStepName: string = ''; // Store the name of the current step

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  // Method to check if the step is completed
  isStepFilled(index: number): boolean {
    return index < this.currentStep || index === this.currentStep;
  }

  getStepName(): string {
    switch (this.applicationStatus) {
        case 'submitted':
            return 'Submitted';
        case 'shortlisted':
            return 'Shortlisted';
        case 'interviewing':
            return 'Interviewing';
        case 'offered':
            return 'Offered';
        default:
            return 'Rejected';
    }
}

  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.createdBy = localStorage.getItem('username');
    this.fetchJobApplications();
  }

  fetchJobApplications(): void {
    const username = localStorage.getItem('username');

        this.applicationService.getApplicationsByCandidateId(username).subscribe({
            next: (data) => {
                this.applications = data;
                // this.filteredApplications = data;
                console.log("appliaction", this.applications);

            },
            error: (error) => {
                this.errorMessage = 'Failed to load applications';
                console.error(error);
            }
        });
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    
    return date.toLocaleDateString('en-US', options); // e.g., 'Wed, 20 Nov 2024'
  }

  deleteJob(jobId: number){
    
  }

  checkStatus(job: any){
    console.log(job);
    this.selectedJob = job;
    this.applicationStatus = job.application_status
    console.log(this.applicationStatus);
    

    // Update currentStep based on applicationStatus
    switch (this.applicationStatus) {
      case 'submitted':
          this.currentStep = 0; // Step 1
          break;
      case 'shortlisted':
          this.currentStep = 1; // Step 2
          break;
      case 'interviewing':
          this.currentStep = 2; // Step 3
          break;
      case 'offered':
          this.currentStep = 3; // Step 4
          break;
      default:
          this.currentStep = 0; // Default to Step 1
          break;
  }
  
    document.getElementById('statusModal')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll
  }

  acceptOffer(selected: any){
    console.log(selected);
    const applicationId = selected.application_id
    console.log(applicationId);
    
    this.applicationService.acceptOffer(applicationId).subscribe(
      response => {
        console.log('Offer accepted successfully', response);
        // handle successful response
      },
      error => {
        console.error('Error accepting offer', error);
        // handle error
      }
    );
  }

  closeModal() {
    document.getElementById('statusModal')!.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll
  }
}
