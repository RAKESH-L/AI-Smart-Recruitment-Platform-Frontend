import { Component } from '@angular/core';
import { JobPosting } from '../../../model/Job.model';
import { JobService } from '../../../service/job.service';
import { Category } from '../../../model/category.model';
import { GenerateJD } from '../../../model/openai.model';
import { OpenaiService } from '../../../service/openai.service';
import { CategoryService } from '../../../service/category.service';

@Component({
  selector: 'app-job-draft',
  templateUrl: './job-draft.component.html',
  styleUrl: './job-draft.component.css'
})
export class JobDraftComponent {

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
  jobId: string = '';

  successMessage: string = '';
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  departments: Category[] = [];
  locations: Category[] = [];
  employeeTypes: Category[] = [];


  createdBy: string='';
  jobs: JobPosting[] = [];
  filteredJobs: JobPosting[] = []; 
  searchQuery: string = '';

  headerColors: string[] = ['#5d87ff', '#fa896b', '#ffae1f', '#49beff'];

  constructor(private jobService: JobService, private openaiService: OpenaiService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.createdBy = localStorage.getItem('username');
    this.fetchJobPostings();
    this.loadCategories();
  }
  loadCategories(): void {
    this.categoryService.fetchAllCategories().subscribe({
      next: (data: Category[]) => {
        this.categories = data;
        this.filteredCategories = data;
        this.filterDepartments();
      },
      error: (error) => {
        console.error('Error fetching categories:', error);
      }
    });
  }

  filterDepartments(): void {
    this.departments = this.categories.filter(category => category.category_type === 'Department');
    this.locations = this.categories.filter(category => category.category_type === 'Location');
    this.employeeTypes = this.categories.filter(category => category.category_type === 'Employee Type')
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

  editJob(job: any){
    console.log(job);

    this.TitleValue = job.title;
    this.DescriptionValue = job.description;
    this.DepartmentValue = job.department;
    this.ExperienceValue = job.experience;
    this.locationValue = job.location;
    this.TypeValue = job.employment_type;
    this.SalaryValue = job.salary_range;
    this.DeadlineValue = this.formatDateForInput(job.application_deadline);
    this.ClientValue = job.client;
    this.SkillsValue = job.skills;
    this.jobId = job.job_id

    console.log(this.jobId);
    
    document.getElementById('EditModel')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll

  }

  private formatDateForInput(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Will return '2025-02-20'
}

  closeApplicantModal() {
    
    document.getElementById('EditModel')!.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll
    
  }

  generateJobDescription() {
    console.log("generate");
    const jobData: GenerateJD = {
      job_title: this.TitleValue,
      experience: this.ExperienceValue,
      location: this.locationValue,
      employment_type: this.TypeValue,
      salary_range: this.SalaryValue,
      company_name: "Hexaware Technologies"
    };

    this.openaiService.generateJD(jobData).subscribe({
      next: (response) => {
        console.log('generated', response);
        // Setting the DescriptionValue to the received job description
        this.DescriptionValue = response.job_description;
        console.log(this.DescriptionValue);

      },
      error: (err) => {
        console.error('Error posting job:', err);

        this.errorMessage = 'There was an error posting your job, please try again.';
      }
    });
  }
  submitForm() {
    const skillsArray = this.SkillsValue.split(',').map(skill => skill.trim()).filter(skill => skill.length > 0);

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
      skills: skillsArray 
    };
    console.log(jobData);
    
    console.log(this.jobId);
    
    this.jobService.updateJobPosting(jobData, this.jobId).subscribe({
      next: (response) => {
        console.log('Job posted successfully:', response);
        this.successMessage = response.message; 
        console.log(this.successMessage);
        this.clearForm();
        this.closeApplicantModal();
        this.fetchJobPostings();
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);

      },
      error: (err) => {
        console.error('Error posting job:', err);
        this.errorMessage = 'There was an error posting your job, please try again.';
        setTimeout(() => {
          this.errorMessage = '';
        }, 3000);
      }
    });
  }
  clearForm() {
    this.TitleValue = '';
    this.DescriptionValue = '';
    this.DepartmentValue = '';
    this.ExperienceValue = '';
    this.locationValue = '';
    this.TypeValue = '';
    this.SalaryValue = '';
    this.DeadlineValue = '';
    this.ClientValue = '';
    this.PreferredQualificationsValue = '';
    this.SkillsValue['']; 
  }
  dismissError() {
    // Method to dismiss the error message
    this.successMessage = '';
    this.errorMessage = '';
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
}
