import { Component } from '@angular/core';
import { JobService } from '../../../service/job.service';
import { OpenaiService } from '../../../service/openai.service';
import { marked } from 'marked';

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
  ResumeValue: string = '';

  isExpectedCTCFocus: boolean = false;
  ExpectedCTCValue: string = '';

  isAddressFocused: boolean = false;

  addressValue: string = '';
  inputValue: string = ''; // Binding for the input field
  errorMessage: string = ''; // Variable to hold error message
  

  constructor(private jobService: JobService, private openaiService: OpenaiService) {}


  ngOnInit(): void {
    const employeeId = localStorage.getItem('username');
    console.log(employeeId);
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

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.ResumeValue = input.files[0].name; // Store file name or process file
      console.log('Selected file:', input.files[0]);
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

  submitData(){
    const formData = {
      JobID: this.JobIDValue,
      FirstName: this.FNameValue,
      LastName: this.LNameValue,
      Email: this.EmailValue,
      CurrentCTC: this.CurrentCTCValue,
      Skills: this.SkillKnownValue,
      CandidateID: this.CandidateIDValue,
      Phone: this.PhoneValue,
      Resume: this.ResumeValue,
      ExpectedCTC: this.ExpectedCTCValue,
    };
    console.log('', formData);
  }
}
