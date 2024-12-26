import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { LoginComponent } from './components/auth/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { CreateJobComponent } from './components/recruiter/create-job/create-job.component';
import { ViewJobDetailsComponent } from './components/recruiter/view-job-details/view-job-details.component';
import { JobApplicationsComponent } from './components/recruiter/job-applications/job-applications.component';
import { CandidateLayoutComponent } from './components/candidate/candidate-layout/candidate-layout.component';
import { ScheduleInterviewComponent } from './components/recruiter/schedule-interview/schedule-interview.component';
import { InterviewDetailsComponent } from './components/recruiter/interview-details/interview-details.component';
import { JobDraftComponent } from './components/recruiter/job-draft/job-draft.component';
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
import { InterviewAppointmentComponent } from './components/recruiter/interview-appointment/interview-appointment.component';
import { ChatbotComponent } from './components/recruiter/chatbot/chatbot.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { CategoryComponent } from './components/recruiter/category/category.component';
import { CandidateReviewComponent } from './components/candidate/candidate-review/candidate-review.component';
import { CustomReportComponent } from './components/recruiter/custom-report/custom-report.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'aboutus', component: AboutusComponent },

  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'userProfile', component: UserProfileComponent },
      { path: 'createJob', component: CreateJobComponent },
      { path: 'viewJobDetails', component: ViewJobDetailsComponent },
      { path: 'jobApplications', component: JobApplicationsComponent },
      { path: 'scheduleInterview', component: ScheduleInterviewComponent },
      { path: 'interviewDetails', component: InterviewDetailsComponent },
      { path: 'jobDraft', component: JobDraftComponent },
      { path: 'demo', component: DemoComponent },
      { path: 'interviewAppointment', component: InterviewAppointmentComponent },
      { path: 'chatbot', component: ChatbotComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'customReport', component: CustomReportComponent },
      { path: 'aboutus', component: AboutusComponent },
    ]
  },
  {
    path: 'candidateLayout',
    component: CandidateLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'applyJob', component: ApplyJobComponent },
      { path: 'appliedJobs', component: AppliedJobsComponent },
      { path: 'jobList', component: JobListComponent },
      { path: 'jobSearch', component: JobSearchComponent },
      { path: 'candidateProfile', component: CandidateProfileComponent },
      { path: 'candidateReview', component: CandidateReviewComponent },
    ]
  },
  {
    path: 'interviewerLayout',
    component: InterviewerLayoutComponent,
    children: [
      { path: '', component: InterviewerDashboardComponent },
      { path: 'scheduledInterview', component: ScheduledInterviewComponent },
      // { path:'appliedJobs', component: AppliedJobsComponent },
      // { path:'jobList', component: JobListComponent },
      // { path:'jobSearch', component: JobSearchComponent },
      // { path:'candidateProfile', component: CandidateProfileComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
