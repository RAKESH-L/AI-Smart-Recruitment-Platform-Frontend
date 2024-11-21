import { Component, OnInit } from '@angular/core';
import { Interview } from '../../../model/interview.model';
import { InterviewService } from '../../../service/interview.service';
import { InterviewDetails } from '../../../model/interviewdetails.model';

@Component({
  selector: 'app-interview-details',
  templateUrl: './interview-details.component.html',
  styleUrl: './interview-details.component.css'
})
export class InterviewDetailsComponent implements OnInit{

  isStatusFocused: boolean = false;
  StatusValue: string = '';

  interviews: InterviewDetails[] = [];
  ownerId: string = ''; 

    constructor(private interviewService: InterviewService) {}

    ngOnInit(): void {
      this.ownerId = localStorage.getItem('username');
      this.fetchInterviews();
    }

    fetchInterviews(): void {
        this.interviewService.getInterviewsByOwnerId(this.ownerId)
            .subscribe(
                (data: InterviewDetails[]) => {
                    this.interviews = data;
                },
                (error) => {
                    console.error('Error fetching interviews:', error);
                }
            );
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
