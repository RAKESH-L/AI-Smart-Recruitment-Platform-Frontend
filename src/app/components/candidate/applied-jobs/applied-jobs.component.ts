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
  filteredJobs: JobPosting[] = []; 
  searchQuery: string = '';
  applications: Application[] = [];
  errorMessage: string = '';

  headerColors: string[] = ['#5d87ff', '#fa896b', '#ffae1f', '#49beff'];

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
}
