import { Component } from '@angular/core';
import { JobService } from '../../../service/job.service';
import { JobPosting } from '../../../model/Job.model';
import { Application } from '../../../model/application.model';
import { ApplicationService } from '../../../service/application.service';

@Component({
  selector: 'app-view-job-details',
  templateUrl: './view-job-details.component.html',
  styleUrl: './view-job-details.component.css'
})
export class ViewJobDetailsComponent {

  isTypeFocused: boolean = false;
  TypeValue: string = '';

  islocationFocused: boolean = false;
  locationValue: string = '';

  isStatusFocused: boolean = false;
  StatusValue: string = '';

  createdBy: string = '';
  jobs: JobPosting[] = [];
  selectedJob: JobPosting;
  filteredJobs: JobPosting[] = [];
  searchQuery: string = '';
  jobId: string = '';
  applications: Application[] = [];
  errorMessage: string = '';

  // Array of header colors to cycle through
  headerColors: string[] = ['#5d87ff', '#fa896b', '#ffae1f', '#49beff'];

  constructor(private jobService: JobService, private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.createdBy = localStorage.getItem('username');
    this.fetchJobPostings();
  }

  fetchJobPostings(): void {
    this.jobService.getJobsByEmployeeId(this.createdBy).subscribe(data => {
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

  onDepartmentChange(event: any): void {
    const selectedDepartment = event.target.value;
    this.filterJobs(selectedDepartment, this.searchQuery);
  }

  onSearchChange(): void {
    this.filterJobs(this.TypeValue, this.searchQuery);
  }

  filterJobs(selectedDepartment: string, searchQuery: string): void {
    this.filteredJobs = this.jobs.filter(job => {
      const matchesDepartment = selectedDepartment ? job.department === selectedDepartment : true;
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.client.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesDepartment && matchesSearch;
    });
  }

  openJobModal(job1: any) {
    this.selectedJob = {
      title: job1.title,
      description: job1.description,
      department: job1.department,
      experience: job1.experience,
      location: job1.location,
      employment_type: job1.employment_type,
      salary_range: job1.salary_range,
      status: 'open',
      client: job1.client,
      application_deadline: job1.application_deadline,
      created_by: localStorage.getItem('username') || '',
      skills: ["Python", "Flask", "MySQL"] // This should be the array you collect from your input fields
    } as JobPosting; // Use a type assertion to cast as JobPosting

    document.getElementById('JobModal')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll
  }
  closeApplicantModal() {
    this.jobId = '';
    this.applications = [];
    document.getElementById('JobModal')!.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll
    document.getElementById('applicantModal')!.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll
  }

  openApplicantModal(job: any) {

    this.jobId = job.job_id
    this.applicationService.getApplicationsByJobId(this.jobId).subscribe({
      next: (data) => {
          this.applications = data;
          console.log("appliaction", this.applications);

      },
      error: (error) => {
          this.errorMessage = 'Failed to load applications';
          console.error(error);
      }
  });
    document.getElementById('applicantModal')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll
  }

  onTypeFocus() {
    this.isTypeFocused = true;

  }

  onTypeBlur() {
    if (!this.TypeValue) {
      this.isTypeFocused = false;
    }
  }

  onlocationFocus() {
    this.islocationFocused = true;

  }

  onlocationBlur() {
    if (!this.locationValue) {
      this.islocationFocused = false;
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
}
