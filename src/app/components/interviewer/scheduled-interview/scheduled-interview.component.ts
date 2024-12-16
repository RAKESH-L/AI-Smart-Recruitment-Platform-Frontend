import { Component } from '@angular/core';
import { InterviewDetails } from '../../../model/interviewdetails.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { InterviewService } from '../../../service/interview.service';
import { ApplicationService } from '../../../service/application.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-scheduled-interview',
  templateUrl: './scheduled-interview.component.html',
  styleUrl: './scheduled-interview.component.css'
})
export class ScheduledInterviewComponent {
  isStatusFocused: boolean = false;
  StatusValue: string = '';

  isTimeFocused: boolean = false;
  TimeValue: string = '';

  isDateFocused: boolean = false;
  DateValue: string = '';

  isDescriptionFocused: boolean = false;
  DescriptionValue: string = '';

  interviews: InterviewDetails[] = [];
  interviewId: string = '';
  selectedInterview: any | null = null;
  selectedFeedback: any | null = null;
  resumePath: SafeResourceUrl;
  interviewDate: string;
  interviewTime: string;
  successMessage: string = ''; // Property to store the success message
  gfgCommunication = 0; // Communication rating value
  gfgTechnical = 0; // Technical Skills rating value
  gfgEnthusiasm = 0; // Candidate Enthusiasm rating value
  hoverRating: number = 0; // Temporary rating value for hover effect
  stars = [1, 2, 3, 4, 5]; // Array to represent stars
  labelCommunication = 'Communication:';
  labelTechnical = 'Technical Skills:';
  labelEnthusiasm = 'Candidate Enthusiasm:'; // New label for Candidate Enthusiasm

  setRate(starValue: number, event: MouseEvent, ratingType: string) {
    const starWidth = 30;
    const clickPosX = event.offsetX;
    const isHalf = clickPosX < starWidth / 2;

    // Determine which rating to update based on the passed ratingType
    switch (ratingType) {
      case 'communication':
        this.gfgCommunication = isHalf ? starValue - 0.5 : starValue; // Update communication rating
        break;
      case 'technical':
        this.gfgTechnical = isHalf ? starValue - 0.5 : starValue; // Update technical skills rating
        break;
      case 'enthusiasm':
        this.gfgEnthusiasm = isHalf ? starValue - 0.5 : starValue; // Update enthusiasm rating
        break;
    }
  }

  getStarType(index: number, ratingType: string) {
    const starValue = index + 1;
    let rating;

    // Determine which rating to assess based on the ratingType
    switch (ratingType) {
      case 'communication':
        rating = this.gfgCommunication;
        break;
      case 'technical':
        rating = this.gfgTechnical;
        break;
      case 'enthusiasm':
        rating = this.gfgEnthusiasm;
        break;
    }

    if (this.hoverRating && rating >= starValue) {
      return 'full';
    } else if (this.hoverRating && rating >= starValue - 0.5) {
      return 'half';
    } else {
      return rating >= starValue ? 'full' : 'empty';
    }
  }

  isHalfClickedState(starValue: number, event: MouseEvent, ratingType: string): boolean {
    const starWidth = 30;
    const clickPosX = event.offsetX;
    this.hoverRating = clickPosX < (starWidth / 2) ? starValue - 0.5 : starValue; // Set hover rating
    return clickPosX < starWidth / 2;
  }

  clearHover() {
    this.hoverRating = 0; // Clear hover rating when mouse leaves
  }

  submitRatings(selectedFeedback: any) {
    console.log(selectedFeedback.interview_id);
    console.log(`Communication Rating: ${this.gfgCommunication}`);
    console.log(`Technical Skills Rating: ${this.gfgTechnical}`);
    console.log(`Candidate Enthusiasm Rating: ${this.gfgEnthusiasm}`); // Log the enthusiasm rating

    const feedback = {
      status: 'completed',
      feedback: {
        'communication': this.gfgCommunication,
        'Technical Skills': this.gfgTechnical,
        'Candidate Enthusiasm': this.gfgEnthusiasm,
        'feedback': this.DescriptionValue, // Assuming the text area collects feedback
      },
    };
    console.log(feedback);
    

    this.interviewService.updateFeedback(selectedFeedback.interview_id, feedback).subscribe(
      response => {
        console.log('Feedback submitted successfully:', response);
        // Optionally close the modal or reset form fields
        this.fetchInterviews();
        this.closeApplicantModal();
      },
      error => {
        console.error('Error submitting feedback:', error);
      }
    );
  
  }

  constructor(private interviewService: InterviewService, private applicationService: ApplicationService,
    private sanitizer: DomSanitizer, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.interviewId = localStorage.getItem('username');
    this.fetchInterviews();
  }

  fetchInterviews(): void {
    this.interviewService.getInterviewsByInterviewerId(this.interviewId).subscribe(
      (data: InterviewDetails[]) => {
        this.interviews = data.map(interview => {
          const originalDateTime = new Date(interview.schedule_date);
          
          // Create new properties for formatted date and time
          return {
            ...interview,
            // Keep the original schedule_date intact for later use
            original_schedule_date: interview.schedule_date,
            formatted_date: originalDateTime.toLocaleDateString(), // e.g., "11/30/2024"
            formatted_time: originalDateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) // e.g., "10:00 AM"
            
          };
        });
  
        console.log('Fetched interviews:', this.interviews);
      },
      (error) => {
        console.error('Error fetching interviews:', error);
      }
    );
  }
  

  openInterviewModal(interview: any) {
    console.log(interview);
    this.selectedInterview = interview;
    
    // Directly access the formatted date and time from the interview object
    this.interviewDate = this.selectedInterview.formatted_date; // e.g., "11/30/2024"
    this.interviewTime = this.selectedInterview.formatted_time; // e.g., "10:00 AM"
  
    // Fetch the resume by application ID
    this.applicationService.getResumeById(interview.application_id).subscribe(
      (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        this.resumePath = this.sanitizer.bypassSecurityTrustResourceUrl(url); // Sanitize the URL
      },
      (error) => {
        console.error('Error fetching resume:', error);
        this.resumePath = null; // Handle error appropriately
      }
    );
  
    document.getElementById('applicantModal')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll
  }

  openFeedbackModel(feedback: any) {
    console.log(feedback);
    this.selectedFeedback = feedback;
    
    
  
    document.getElementById('feedbackModel')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll
  }

  closeApplicantModal() {
    document.getElementById('applicantModal')!.style.display = 'none'; // Hide modal
    document.getElementById('feedbackModel')!.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll
  }

  closeRescheduleModal() {
    document.getElementById('rescheduleModel')!.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll
  }

  onRescheduleInterview(){
    document.getElementById('rescheduleModel')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll

  }

  onReschedule(interviewId: any){
    console.log(interviewId);
    const scheduleDateTime = `${this.DateValue} ${this.TimeValue}`; // Combine date and time
    const requestBody = {
      schedule_date: scheduleDateTime
    };
    // Call the service method to reschedule the interview
    this.interviewService.rescheduleInterview(interviewId, requestBody).subscribe({
      next: (response) => {
        console.log('Interview rescheduled successfully:', response.message);
        // Close the modal or show a success message here
        this.successMessage = response.message; // Update the success message
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        this.fetchInterviews();
        this.closeRescheduleModal(); // Assuming you have a method to close the modal
        this.closeApplicantModal();
      },
      error: (err) => {
        console.error('Error rescheduling interview:', err);
        // Handle the error, such as displaying an error message to the user
      }
    });
    document.getElementById('rescheduleModel')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll

  }
  saveStatus() {
    // Here, you'll implement the logic to save the new status.
    
    // Example: Update the selected application's status (in a real app, this might involve a service call)
    // this.selectedInterview.application_status = this.newStatusValue;
  
    // You could also make an API call here to save this change in your database.
    
    // Close modal after saving
    this.closeApplicantModal();
  }

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
