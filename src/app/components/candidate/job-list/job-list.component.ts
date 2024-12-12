import { Component } from '@angular/core';
import { JobPosting } from '../../../model/Job.model';
import { JobService } from '../../../service/job.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.css'
})
export class JobListComponent {
  jobs: JobPosting[] = [];
  selectedJob: JobPosting;
  filteredJobs: JobPosting[] = [];
  createdBy: string = '';
  skillsArray: string[];

  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.createdBy = localStorage.getItem('username');
    this.fetchJobPostings();
  }

  fetchJobPostings(): void {
    this.jobService.getAllJobs().subscribe(data => {
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
    // Use substring or split to extract just the date part, if applicable
    const datePart = dateString.split('T')[0]; // Just get the date part before 'T'
    
    const date = new Date(datePart); // Now create a Date object

    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    };

    return date.toLocaleDateString('en-US', options);
}
  isModalOpen = false;
  

  openModal(job1: any): void {
    this.selectedJob = {
      job_id: job1.job_id,
      title: job1.title,
      description: job1.description,
      created_at: job1.created_at,
      department: job1.department,
      experience: job1.experience,
      location: job1.location,
      employment_type: job1.employment_type,
      salary_range: job1.salary_range,
      status: 'open',
      client: job1.client,
      application_deadline: job1.application_deadline,
      created_by: localStorage.getItem('username') || '',
      skillArray: job1.skills // This should be the array you collect from your input fields
    } as JobPosting; // Use a type assertion to cast as JobPosting
    console.log(this.selectedJob.skillArray);
    
    this.skillsArray = this.selectedJob.skillArray.split(',');

    this.isModalOpen = true;
    console.log('skills', this.skillsArray);
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  applyNow(selectedJob) {
    console.log(selectedJob);
    
    const jobId = selectedJob.job_id; // Assuming job_id is a unique identifier
    console.log(jobId);
    localStorage.setItem("jobId",jobId);
    this.router.navigate(['/candidateLayout/applyJob']);
  }
}
