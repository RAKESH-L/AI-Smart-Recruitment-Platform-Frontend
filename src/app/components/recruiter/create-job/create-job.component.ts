import { Component } from '@angular/core';
import { JobPosting } from '../../../model/Job.model';
import { JobService } from '../../../service/job.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrl: './create-job.component.css'
})
export class CreateJobComponent {
  displayAccount: boolean = true;
  displaySettings: boolean = false;

  currentStep = 1;
  isInputFocused: boolean = false;

  isTitleFocused: boolean = false;
  TitleValue: string = '';

  islocationFocused: boolean = false;
  locationValue: string = '';

  isSalaryFocused: boolean = false;
  SalaryValue: string = '';

  isExperienceFocused: boolean = false;
  ExperienceValue: string = '';

  isClientFocused: boolean = false;
  ClientValue: string = '';

  isSkillsFocused: boolean = false;
  SkillsValue: string = '';

  isDescriptionFocused: boolean = false;
  DescriptionValue: string = '';

  isResponsibilitiesFocused: boolean = false;
  ResponsibilitiesValue: string = '';

  isDepartmentFocused: boolean = false;
  DepartmentValue: string = '';

  isTypeFocused: boolean = false;
  TypeValue: string = '';

  isDeadlineFocused: boolean = false;
  DeadlineValue: string = '';

  isPreferredQualificationsFocused: boolean = false;
  PreferredQualificationsValue: string = '';

  isRequiredQualificationsFocused: boolean = false;
  RequiredQualificationsValue: string = '';

  isAddressFocused: boolean = false;

  addressValue: string = '';
  inputValue: string = ''; // Binding for the input field
  errorMessage: string = ''; // Variable to hold error message

  constructor(private jobService: JobService) {}


  ngOnInit(): void {
    const employeeId = localStorage.getItem('username');
    console.log(employeeId);
  }

  submitForm() {
    const jobData: JobPosting = {
      title: this.TitleValue,
      description: this.DescriptionValue,
      department: this.DepartmentValue,
      experience: this.ExperienceValue,
      location: this.locationValue,
      employment_type: this.TypeValue,
      salary_range: this.SalaryValue,
      status: 'open',
      client: this.ClientValue,
      application_deadline: this.DeadlineValue,
      created_by: localStorage.getItem('username'),
      skills: ["Python", "Flask", "MySQL"]  // This should be the array you collect from your input fields
    };

    this.jobService.submitJobPosting(jobData).subscribe({
      next: (response) => {
        console.log('Job posted successfully:', response);
        // You can reset the form fields or navigate to another page here
      },
      error: (err) => {
        console.error('Error posting job:', err);
        this.errorMessage = 'There was an error posting your job, please try again.';
      }
    });
  }
  
  onTitleFocus() {
    this.isTitleFocused = true;
  }

  onTitleBlur() {
    if (!this.TitleValue) {
      this.isTitleFocused = false;
    }
  }

  openDatePicker() {
    // Open the date picker programmatically if needed.
  }

  onlocationFocus() {
    this.islocationFocused = true;
    
  }

  onlocationBlur() {
    if (!this.locationValue) {
      this.islocationFocused = false;
    }
  }

  onSalaryFocus() {
    this.isSalaryFocused = true;
    
  }

  onSalaryBlur() {
    if (!this.SalaryValue) {
      this.isSalaryFocused = false;
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

  onClientFocus() {
    this.isClientFocused = true;
    
  }

  onClientBlur() {
    if (!this.ClientValue) {
      this.isClientFocused = false;
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

  onDepartmentFocus() {
    this.isDepartmentFocused = true;
    
  }

  onDepartmentBlur() {
    if (!this.DepartmentValue) {
      this.isDepartmentFocused = false;
    }
  }

  onTypeFocus() {
    this.isTypeFocused = true;
    
  }

  onTypeBlur() {
    if (!this.TypeValue) {
      this.isTypeFocused = false;
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

  onPreferredQualificationsFocus() {
    this.isPreferredQualificationsFocused = true;
    
  }

  onPreferredQualificationsBlur() {
    if (!this.PreferredQualificationsValue) {
      this.isPreferredQualificationsFocused = false;
    }
  }

  onRequiredQualificationsFocus() {
    this.isRequiredQualificationsFocused = true;
    
  }

  onRequiredQualificationsBlur() {
    if (!this.RequiredQualificationsValue) {
      this.isRequiredQualificationsFocused = false;
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

  formSubmit(){
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
}
