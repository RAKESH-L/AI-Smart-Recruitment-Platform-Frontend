import { Component } from '@angular/core';
import { JobPosting } from '../../../model/Job.model';
import { InterviewService } from '../../../service/interview.service';
import { Application } from '../../../model/application.model';
import { ApplicationService } from '../../../service/application.service';
import { User } from '../../../model/user.model';
import { UserService } from '../../../service/user.service';
import { Interview } from '../../../model/interview.model';

@Component({
  selector: 'app-schedule-interview',
  templateUrl: './schedule-interview.component.html',
  styleUrl: './schedule-interview.component.css'
})
export class ScheduleInterviewComponent {
  isJobFocused: boolean = false;
  JobValue: string = '';

  isStatusFocused: boolean = false;
  StatusValue: string = '';

  isInterviewModeFocused: boolean = false;
  InterviewModeValue: string = '';

  isInterviewerFocused: boolean = false;
  InterviewerValue: string = '';


  isDateFocused: boolean = false;
  DateValue: string = '';

  isInterviewLocationFocused: boolean = false;
  InterviewLocationValue: string = '';

  isInterviewTypeFocused: boolean = false;
  InterviewTypeValue: string = '';

  isTimeFocused: boolean = false;
  TimeValue: string = '';
  jobs: JobPosting[] = [];
  createdBy: string = '';
  applications: Application[] = [];
  filteredApplications: Application[] = [];
  users: User[] = [];
  interviewers: User[] = [];
  errorMessage: string = '';
  jobValue: string = '';
  statusValue: string = '';
  successMessage: string = '';

  constructor(private interviewService: InterviewService, private applicationService: ApplicationService,
    private userservice: UserService) { }

  ngOnInit(): void {
    this.createdBy = localStorage.getItem('username');
    this.loadApplications(this.jobValue, this.statusValue,);
    this.fetchJobPostings();
    this.fetchAllUsers();
  }
  fetchAllUsers() {
    this.userservice.getAllUsers().subscribe(data => {
      this.users = data;
      // Filtering users based on roles 'interviewer' and 'recruiter'
      this.interviewers = this.users.filter(user =>
        user.role === 'interviewer' || user.role === 'recruiter'
      );
    }, error => {
      console.error('Error fetching job postings:', error);
    })
  }
  fetchJobPostings(): void {
    this.interviewService.getJobsByEmployeeId(this.createdBy).subscribe(data => {
      this.jobs = data; // Store the received data

      console.log(this.jobs); // Log the jobs for debug purposes

    }, error => {
      console.error('Error fetching job postings:', error);
    });
  }

  loadApplications(jobTitle: string, status: string, deadline?: string) {

    this.applicationService.getApplications(this.createdBy, jobTitle, status).subscribe({
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

  onJobChange(selectedJobId: string): void {
    const jobId = Number(selectedJobId);
    const selectedJob = this.applications.find(job => job.job_id === jobId);

    if (selectedJob) {
      const selectedJobId = selectedJob.job_id;
      // Filter applications based on the selected job ID
      this.filteredApplications = this.applications.filter(application => application.job_id === selectedJobId);
    } else {
      this.filteredApplications = null; // Reset if no job is selected
    }
  }
  scheduleInterview() {
    if (this.formValid()) {
      // Logic to schedule the interview
      console.log('Interview Scheduled!', {
        jobValue: this.jobValue,
        statusValue: this.statusValue,
        DateValue: this.DateValue,
        TimeValue: this.TimeValue,
        InterviewerValue: this.InterviewerValue,
        InterviewTypeValue: this.InterviewTypeValue,
        InterviewModeValue: this.InterviewModeValue,
        InterviewLocationValue: this.InterviewLocationValue
      });
      const interview: Interview = {
        type: this.InterviewTypeValue,
        job_id: this.jobValue,
        interviewer_id: this.InterviewerValue,
        application_id: this.statusValue,
        owner_id: this.createdBy,
        schedule_date: this.DateValue + ' ' + this.TimeValue + ':00',
        status: 'scheduled',
        feedback: null,
        interviewMode: this.InterviewModeValue,
        interviewLocation: this.InterviewLocationValue
      }
      console.log(interview);
      this.interviewService.postInterview(interview).subscribe({
        next: (response) => {
          console.log('Interview posted successfully:', response);
          // Optionally reset the form fields or navigate to another page here
          this.successMessage = response.message;
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
          this.clearForm();
        },
        error: (err) => {
          // Handle error response here
          console.error('Error posting interview:', err);
          if (err.error && err.error.message) {
            // Assuming the error response structure
            console.error('Error message:', err.error.message);
            this.errorMessage = err.error.message;
            setTimeout(() => {
              this.errorMessage = '';
            }, 3000);
            return;
          } else {
            this.errorMessage = 'There was an error posting your interview, please try again.';
          }
        }
      });

    } else {
      // Logic to inform user of invalid fields
      alert('Please fill in all required fields.');
    }
  }

  dismissError() {
    // Method to dismiss the error message
    this.errorMessage = '';
  }

  formValid(): boolean {
    // Check if all required fields have values
    return Boolean(this.jobValue) &&
      Boolean(this.statusValue) &&
      Boolean(this.DateValue) &&
      Boolean(this.TimeValue) &&
      Boolean(this.InterviewerValue) &&
      Boolean(this.InterviewTypeValue) &&
      Boolean(this.InterviewModeValue) &&
      (this.InterviewModeValue !== 'inPerson' || Boolean(this.InterviewLocationValue));
  }
  clearForm() {
    this.jobValue = '',
      this.statusValue = '',
      this.DateValue = '',
      this.TimeValue = '',
      this.InterviewerValue = '',
      this.InterviewTypeValue = '',
      this.InterviewModeValue = '',
      this.InterviewLocationValue = ''
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

  onInterviewerFocus() {
    this.isInterviewerFocused = true;

  }

  onInterviewerBlur() {
    if (!this.InterviewerValue) {
      this.isInterviewerFocused = false;
    }
  }

  onInterviewModeFocus() {
    this.isInterviewModeFocused = true;

  }

  onInterviewModeBlur() {
    if (!this.InterviewModeValue) {
      this.isInterviewModeFocused = false;
    }
  }

  onDateFocus() {
    this.isDateFocused = true;

  }

  onDateBlur() {
    if (!this.DateValue) {
      this.isDateFocused = false;
    }
  }

  onInterviewLocationFocus() {
    this.isInterviewLocationFocused = true;

  }

  onInterviewLocationBlur() {
    if (!this.InterviewLocationValue) {
      this.isInterviewLocationFocused = false;
    }
  }

  onInterviewTypeFocus() {
    this.isInterviewTypeFocused = true;

  }

  onInterviewTypeBlur() {
    if (!this.InterviewTypeValue) {
      this.isInterviewTypeFocused = false;
    }
  }

  onTimeFocus() {
    this.isTimeFocused = true;

  }

  onTimeBlur() {
    if (!this.TimeValue) {
      this.isTimeFocused = false;
    }
  }
}
