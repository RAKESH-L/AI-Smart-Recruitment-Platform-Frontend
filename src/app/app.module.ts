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
    // MatDialogModule,
    // ChartModule,
    MatCardModule,
    MatAutocompleteModule 
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
   // VERY IMPORTANT TO HAVE THIS!!!!
   schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
