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

const routes: Routes = [
  { path: '', component: LandingPageComponent},
  { path: 'login', component: LoginComponent},

  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      { path:'', component: HomeComponent },
      { path:'userProfile', component: UserProfileComponent },
      { path:'createJob', component: CreateJobComponent},
      { path: 'viewJobDetails', component: ViewJobDetailsComponent},
      { path: 'jobApplications', component: JobApplicationsComponent},
      { path: 'scheduleInterview', component: ScheduleInterviewComponent},
      { path: 'interviewDetails', component: InterviewDetailsComponent},
      { path: 'jobDraft', component: JobDraftComponent},
      { path: 'demo', component: DemoComponent},

      // Add more child routes as needed
    ]
  },
  {
    path: 'candidateLayout',
    component: CandidateLayoutComponent,
    children: [
      { path:'', component: HomeComponent },
      { path:'applyJob', component: ApplyJobComponent },
      { path:'appliedJobs', component: AppliedJobsComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
