import { Component } from '@angular/core';
import { JobService } from '../../../service/job.service';
import { OpenaiService } from '../../../service/openai.service';
import { marked } from 'marked';
import { ActivatedRoute, Router } from '@angular/router';
import { JobPosting } from '../../../model/Job.model';
import { ApplicationService } from '../../../service/application.service';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrl: './apply-job.component.css'
})
export class ApplyJobComponent {

  displayAccount: boolean = true;
  displaySettings: boolean = false;

  currentStep = 1;
  isInputFocused: boolean = false;

  isJobIDFocused: boolean = false;
  JobIDValue: string = '';

  isFNameFocused: boolean = false;
  FNameValue: string = '';

  isLNameFocused: boolean = false;
  LNameValue: string = '';

  isEmailFocused: boolean = false;
  EmailValue: string = '';

  isCurrentCTCFocused: boolean = false;
  CurrentCTCValue: string = '';

  isSkillKnownFocused: boolean = false;
  SkillKnownValue: string = '';

  isExperienceFocused: boolean = false;
  ExperienceValue: string = '';

  isSkillsFocused: boolean = false;
  SkillsValue: string = '';

  isDescriptionFocused: boolean = false;
  DescriptionValue: string = '';

  isResponsibilitiesFocused: boolean = false;
  ResponsibilitiesValue: string = '';

  isCandidateIDFocused: boolean = false;
  CandidateIDValue: string = '';

  isPhoneFocused: boolean = false;
  PhoneValue: string = '';

  isResumeFocused: boolean = false;
  ResumeValue: File | null = null;

  isExpectedCTCFocus: boolean = false;
  ExpectedCTCValue: string = '';

  isAddressFocused: boolean = false;

  addressValue: string = '';
  inputValue: string = ''; // Binding for the input field
  errorMessage: string = ''; // Variable to hold error message
  jobs: JobPosting;
  selectedJob: JobPosting;
  filteredJobs: JobPosting[] = [];
  application_deadline: string;
  ResumeFile: File | null = null; // To hold the file input

  applicationMessage: string = '';
  isErrorMessage: boolean = false;
  isSuccessMessage: boolean = false;

  constructor(private jobService: JobService, private openaiService: OpenaiService, private router: Router, private route: ActivatedRoute,
    private applicationService: ApplicationService) { }


  ngOnInit(): void {
    const employeeId = localStorage.getItem('username');
    console.log(employeeId);
    const jobId = localStorage.getItem('jobId');

    console.log('Job from navigation:', jobId); // This should show the job details if passed correctly
    this.fetchJobPostings()
  }

  fetchJobPostings(): void {
    const jobId = localStorage.getItem('jobId');
    this.jobService.getJobByJobId(jobId).subscribe(data => {
      this.jobs = data; // Store the received data
      this.application_deadline = this.formatDate(this.jobs.application_deadline)

      console.log(this.jobs); // Log the jobs for debug purposes

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

  getFormattedDescription() {
    return marked(this.DescriptionValue);
  }
  onJobFocus() {
    this.isJobIDFocused = true;
  }

  onJobBlur() {
    if (!this.JobIDValue) {
      this.isJobIDFocused = false;
    }
  }

  onFNameFocus() {
    this.isFNameFocused = true;

  }

  onFNameBlur() {
    if (!this.FNameValue) {
      this.isFNameFocused = false;
    }
  }

  onlNameFocus() {
    this.isLNameFocused = true;

  }

  onlNameBlur() {
    if (!this.LNameValue) {
      this.isLNameFocused = false;
    }
  }

  onEmailFocus() {
    this.isEmailFocused = true;

  }

  onEmailBlur() {
    if (!this.EmailValue) {
      this.isEmailFocused = false;
    }
  }

  onCurrentCTCFocus() {
    this.isCurrentCTCFocused = true;

  }

  onCurrentCTCBlur() {
    if (!this.CurrentCTCValue) {
      this.isCurrentCTCFocused = false;
    }
  }

  onSkillKnownFocus() {
    this.isSkillKnownFocused = true;

  }

  onSkillKnownBlur() {
    if (!this.SkillKnownValue) {
      this.isSkillKnownFocused = false;
    }
  }

  onSkillsFocus() {
    this.isSkillsFocused = true;

  }

  onSkillsBlur() {
    if (!this.SkillsValue) {
      this.isSkillsFocused = false;
    }
  }

  onExperienceFocus() {
    this.isExperienceFocused = true;
  }

  onExperienceBlur() {
    if (!this.ExperienceValue) {
      this.isExperienceFocused = false;
    }
  }

  onDescriptionFocus() {
    this.isDescriptionFocused = true;

  }

  onDescriptionBlur() {
    if (!this.DescriptionValue) {
      this.isDescriptionFocused = false;
    }
  }

  onResponsibilitiesFocus() {
    this.isResponsibilitiesFocused = true;

  }

  onResponsibilitiesBlur() {
    if (!this.ResponsibilitiesValue) {
      this.isResponsibilitiesFocused = false;
    }
  }

  onCandidateFocus() {
    this.isCandidateIDFocused = true;

  }

  onCandidateBlur() {
    if (!this.CandidateIDValue) {
      this.isCandidateIDFocused = false;
    }
  }


  onPhoneFocus() {
    this.isPhoneFocused = true;

  }

  onPhoneBlur() {
    if (!this.PhoneValue) {
      this.isPhoneFocused = false;
    }
  }

  onResumeFocus() {
    this.isResumeFocused = true;
  }

  onResumeBlur() {
    if (!this.ResumeValue) {
      this.isResumeFocused = false;
    }
  }

  onExpectedCTCFocus() {
    this.isExpectedCTCFocus = true;

  }

  onExpectedCTCBlur() {
    if (!this.ExpectedCTCValue) {
      this.isExpectedCTCFocus = false;
    }
  }

  onInputFocus() {
    this.isInputFocused = true;
    // this.placeholder = 'ex: 1,2';
  }

  onInputBlur() {
    if (!this.inputValue) {
      this.isInputFocused = false;
      // this.placeholder = 'ex: 1,2';
    }
  }


  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }


  }

  formSubmit() {
    if (this.currentStep > 2) {
      this.currentStep--;
    }
  }

  changeStep(step: number) {
    this.currentStep = step;
  }

  showAccount() {
    this.displayAccount = true;
    this.displaySettings = false;
  }

  showSettings() {
    this.displayAccount = false;
    this.displaySettings = true;
  }

  submitData(jobs: any) {
    const CandidateID = localStorage.getItem('username');
    const formData = new FormData();

    formData.append('job_id', jobs.job_id);

    if (this.FNameValue) {
      formData.append('first_name', this.FNameValue);
    }
    if (this.LNameValue) {
      formData.append('last_name', this.LNameValue);
    }
    if (this.EmailValue) {
      formData.append('email', this.EmailValue);
    }
    if (this.PhoneValue) {
      formData.append('phone_number', this.PhoneValue);
    }
    if (this.ExperienceValue) {
      formData.append('experience', this.ExperienceValue);
    }
    if (this.CurrentCTCValue) {
      formData.append('current_ctc', this.CurrentCTCValue);
    }
    if (this.ExpectedCTCValue) {
      formData.append('expected_ctc', this.ExpectedCTCValue);
    }
    if (this.SkillKnownValue) {
      formData.append('skills', this.SkillKnownValue);
    }

    formData.append('candidate_id', CandidateID);

    if (this.ResumeValue) {
      formData.append('resume', this.ResumeValue);
    } else {
      console.error('No resume file provided.'); // Optional log if needed
    }

    formData.forEach((value, key) => {
      console.log(key + ':', value);
    });

    this.applicationService.postApplication(formData).subscribe(
      (response) => {
        console.log('Response from server:', response);
        this.applicationMessage = response.message; // Get success message from the response
        this.isErrorMessage = false; // It's not an error message
        setTimeout(() => {
          this.applicationMessage = '';
        }, 3000);
      },
      (error) => {
        console.error('Error submitting application:', error);
        this.applicationMessage = error.error.message; // Get error message from the error response
        this.isErrorMessage = true; // This is an error message
        setTimeout(() => {
          this.applicationMessage = '';
        }, 3000);
      }
    );


  }
  //   onFileChange(event: Event) {
  //     const input = event.target as HTMLInputElement; // Cast target to HTMLInputElement
  //     if (input.files && input.files.length > 0) {
  //         this.ResumeFile = input.files[0]; // Get the first selected file
  //     } else {
  //         this.ResumeFile = null; // Reset if no file is chosen
  //     }
  // }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.ResumeValue = file;
    }
  }
  dismissError() {
    // Method to dismiss the error message
    this.applicationMessage = '';
  }
}
