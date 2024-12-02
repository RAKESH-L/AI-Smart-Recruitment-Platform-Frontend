import { Component } from '@angular/core';
import { JobService } from '../../../service/job.service';
import { JobPosting } from '../../../model/Job.model';

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
  
  createdBy: string='';
  jobs: JobPosting[] = [];
  filteredJobs: JobPosting[] = []; 
  searchQuery: string = '';

   // Array of header colors to cycle through
  headerColors: string[] = ['#5d87ff', '#fa896b', '#ffae1f', '#49beff'];

  constructor(private jobService: JobService) { }

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

  openJobModal() {
    

    document.getElementById('JobModal')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll
  }
  closeApplicantModal() {
    document.getElementById('JobModal')!.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll
    document.getElementById('applicantModal')!.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll
  }

  openApplicantModal() {
    
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
