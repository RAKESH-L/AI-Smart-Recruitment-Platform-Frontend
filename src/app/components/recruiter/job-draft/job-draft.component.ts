import { Component } from '@angular/core';
import { JobPosting } from '../../../model/Job.model';
import { JobService } from '../../../service/job.service';

@Component({
  selector: 'app-job-draft',
  templateUrl: './job-draft.component.html',
  styleUrl: './job-draft.component.css'
})
export class JobDraftComponent {

  createdBy: string='';
  jobs: JobPosting[] = [];
  filteredJobs: JobPosting[] = []; 
  searchQuery: string = '';

  headerColors: string[] = ['#5d87ff', '#fa896b', '#ffae1f', '#49beff'];

  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.createdBy = localStorage.getItem('username');
    this.fetchJobPostings();
  }

  fetchJobPostings(): void {
    this.jobService.getDraftJobsByEmployeeId(this.createdBy).subscribe(data => {
      this.jobs = data; // Store the received data
      this.filteredJobs = data.map(job => ({
        ...job,
        application_deadline: this.formatDate(job.application_deadline)
      })); // Format the application_deadline for each job
  
      console.log(this.jobs); // Log the jobs for debug purposes
      console.log(this.filteredJobs); // Log the filtered jobs for debug purposes
  
    }, error => {
      console.error('Error fetching job postings:', error);
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

  deleteJob(jobId: string){
    this.jobService.deleteJobById(jobId).subscribe(data => {
      this.jobs=data;
    }, error => {
      console.error('Error fetching job postings:', error);
    });
  }
}
