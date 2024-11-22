import { Component, OnInit } from '@angular/core';
import { Interview } from '../../../model/interview.model';
import { InterviewService } from '../../../service/interview.service';
import { InterviewDetails } from '../../../model/interviewdetails.model';
import { ApplicationService } from '../../../service/application.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-interview-details',
  templateUrl: './interview-details.component.html',
  styleUrl: './interview-details.component.css'
})
export class InterviewDetailsComponent implements OnInit {

  isStatusFocused: boolean = false;
  StatusValue: string = '';

  isTimeFocused: boolean = false;
  TimeValue: string = '';

  isDateFocused: boolean = false;
  DateValue: string = '';

  interviews: InterviewDetails[] = [];
  ownerId: string = '';
  selectedInterview: any | null = null;
  resumePath: SafeResourceUrl;
  interviewDate: string;
  interviewTime: string;
  successMessage: string = ''; // Property to store the success message


  constructor(private interviewService: InterviewService, private applicationService: ApplicationService,
    private sanitizer: DomSanitizer, private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.ownerId = localStorage.getItem('username');
    this.fetchInterviews();
  }

  fetchInterviews(): void {
    this.interviewService.getInterviewsByOwnerId(this.ownerId).subscribe(
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
  

  closeApplicantModal() {
    document.getElementById('applicantModal')!.style.display = 'none'; // Hide modal
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
