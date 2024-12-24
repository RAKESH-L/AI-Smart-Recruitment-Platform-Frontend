import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './components/auth/login/login.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Make sure this is present
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChartModule } from 'angular-highcharts';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileCardComponent } from './components/navbar/profile-card/profile-card.component';
import { HomeComponent } from './components/home/home.component';
import { CreateJobComponent } from './components/recruiter/create-job/create-job.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ViewJobDetailsComponent } from './components/recruiter/view-job-details/view-job-details.component';
import { JobApplicationsComponent } from './components/recruiter/job-applications/job-applications.component';
import { CandidateLayoutComponent } from './components/candidate/candidate-layout/candidate-layout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ScheduleInterviewComponent } from './components/recruiter/schedule-interview/schedule-interview.component';
import { InterviewDetailsComponent } from './components/recruiter/interview-details/interview-details.component';
import { DatePipe } from '@angular/common'; // Import DatePipe here
import { NgApexchartsModule } from "ng-apexcharts";
import { JobDraftComponent } from './components/recruiter/job-draft/job-draft.component';
import { ThemeToggleComponent } from './components/theme-toggle/theme-toggle.component';
import { ApplyJobComponent } from './components/candidate/apply-job/apply-job.component';
import { AppliedJobsComponent } from './components/candidate/applied-jobs/applied-jobs.component';
import { UserProfileComponent } from './components/recruiter/user-profile/user-profile.component';
import { DemoComponent } from './components/demo/demo.component';
import { DashboardComponent } from './components/candidate/dashboard/dashboard.component';
import { JobListComponent } from './components/candidate/job-list/job-list.component';
import { JobSearchComponent } from './components/candidate/job-search/job-search.component';
import { CandidateProfileComponent } from './components/candidate/candidate-profile/candidate-profile.component';
import { InterviewerLayoutComponent } from './components/interviewer/interviewer-layout/interviewer-layout.component';
import { InterviewerDashboardComponent } from './components/interviewer/interviewer-dashboard/interviewer-dashboard.component';
import { ScheduledInterviewComponent } from './components/interviewer/scheduled-interview/scheduled-interview.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InterviewAppointmentComponent } from './components/recruiter/interview-appointment/interview-appointment.component';
import { ChatbotComponent } from './components/recruiter/chatbot/chatbot.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { CategoryComponent } from './components/recruiter/category/category.component';
import { CandidateReviewComponent } from './components/candidate/candidate-review/candidate-review.component';
import { CustomReportComponent } from './components/recruiter/custom-report/custom-report.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    LayoutComponent,
    NavbarComponent,
    SidebarComponent,
    ProfileCardComponent,
    HomeComponent,
    CreateJobComponent,
    ViewJobDetailsComponent,
    JobApplicationsComponent,
    CandidateLayoutComponent,
    ScheduleInterviewComponent,
    InterviewDetailsComponent,
    JobDraftComponent,
    ThemeToggleComponent,
    ApplyJobComponent,
    AppliedJobsComponent,
    UserProfileComponent,
    DemoComponent,
    DashboardComponent,
    JobListComponent,
    JobSearchComponent,
    CandidateProfileComponent,
    InterviewerLayoutComponent,
    InterviewerDashboardComponent,
    ScheduledInterviewComponent,
    InterviewAppointmentComponent,
    ChatbotComponent,
    ResetPasswordComponent,
    SignupComponent,
    CategoryComponent,
    CandidateReviewComponent,
    CustomReportComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgApexchartsModule,
    MatCardModule,
    MatAutocompleteModule,
    NgbModule,
  ],
  providers: [
    DatePipe,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
   // VERY IMPORTANT TO HAVE THIS!!!!
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
