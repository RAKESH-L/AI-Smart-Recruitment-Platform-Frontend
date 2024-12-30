import { Component } from '@angular/core';

@Component({
  selector: 'app-candidate-interview',
  templateUrl: './candidate-interview.component.html',
  styleUrl: './candidate-interview.component.css'
})
export class CandidateInterviewComponent {
  isStatusFocused: boolean = false;
  StatusValue: string = '';

  isTimeFocused: boolean = false;
  TimeValue: string = '';

  isDateFocused: boolean = false;
  DateValue: string = '';

  isDescriptionFocused: boolean = false;
  DescriptionValue: string = '';

  successMessage: string = '';
  
  onDescriptionFocus() {
    this.isDescriptionFocused = true;
    
  }

  onDescriptionBlur() {
    if (!this.DescriptionValue) {
      this.isDescriptionFocused = false;
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
  onTimeFocus() {
    this.isTimeFocused = true;
    
  }

  onTimeBlur() {
    if (!this.TimeValue) {
      this.isTimeFocused = false;
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

  dismissError() {
    // Method to dismiss the error message
    this.successMessage = '';
  }
}
