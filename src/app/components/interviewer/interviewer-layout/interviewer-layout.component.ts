import { Component } from '@angular/core';

@Component({
  selector: 'app-interviewer-layout',
  templateUrl: './interviewer-layout.component.html',
  styleUrl: './interviewer-layout.component.css'
})
export class InterviewerLayoutComponent {
  title = 'MyApp';
  sideNavStatus: boolean = false;
}
