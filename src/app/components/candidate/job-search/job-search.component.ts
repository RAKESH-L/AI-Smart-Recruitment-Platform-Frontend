import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrl: './job-search.component.css'
})
export class JobSearchComponent {
  jobQuery: string = '';
  locationQuery: string = '';
  filteredJobResults: string[] = [];
  filteredLocationResults: string[] = [];
  showJobDropdown: boolean = false;
  showLocationDropdown: boolean = false;

  jobData: string[] = [
    'Software Engineer',
    'Data Scientist',
    'Frontend Developer',
    'Backend Developer',
    'Project Manager',
    'UX Designer',
  ];

  locationData: string[] = [
    'New York, USA',
    'San Francisco, USA',
    'Berlin, Germany',
    'Toronto, Canada',
    'London, UK',
    'Paris, France',
  ];

  constructor(private router: Router) {}

  filterJobResults() {
    this.filteredJobResults = this.jobData.filter((job) =>
      job.toLowerCase().includes(this.jobQuery.toLowerCase())
    );
    this.showJobDropdown = true;
  }

  filterLocationResults() {
    this.filteredLocationResults = this.locationData.filter((location) =>
      location.toLowerCase().includes(this.locationQuery.toLowerCase())
    );
    this.showLocationDropdown = true;
  }

  closeOtherDropdowns(field: string) {
    if (field === 'job') {
      this.showLocationDropdown = false;
      this.showJobDropdown = true;
    } else if (field === 'location') {
      this.showJobDropdown = false;
      this.showLocationDropdown = true;
    }
  }

  selectJob(job: string) {
    this.jobQuery = job;
    this.showJobDropdown = false;
  }

  selectLocation(location: string) {
    this.locationQuery = location;
    this.showLocationDropdown = false;
  }

  redirectToResults() {
    const queryParams = {
      job: this.jobQuery,
      location: this.locationQuery,
    };
    this.router.navigate(['/search-results'], { queryParams });
  }
}
