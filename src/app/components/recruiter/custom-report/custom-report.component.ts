import { Component } from '@angular/core';
import { InterviewService } from '../../../service/interview.service';
import { ApplicationService } from '../../../service/application.service';
import { UserService } from '../../../service/user.service';
import { JobPosting } from '../../../model/Job.model';
import { Application } from '../../../model/application.model';
import { ReportService } from '../../../service/report.service';
import { Report } from '../../../model/report.model';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-custom-report',
  templateUrl: './custom-report.component.html',
  styleUrl: './custom-report.component.css'
})

export class CustomReportComponent {

  isTypeFocused: boolean = false;
  TypeValue: string = '';

  isReportNameFocused: boolean = false;
  ReportNameValue: string = '';

  isDateRangeFocused: boolean = false;
  DateRangeValue: string = '';

  isSatusFocused: boolean = false;
  StatusValue: string = '';

  isPositionFocused: boolean = false;
  PositionValue: string = '';

  isSourceFocused: boolean = false;
  SourceValue: string = '';

  includeApplicantName: boolean = false;
  includeDateApplied: boolean = false;
  includeStatus: boolean = false;
  includeSource: boolean = false;
  includeEmail: boolean = false;
  includePhoneNumber: boolean = false;
  includeNlpScore: boolean = false;
  includeOpenaiScore: boolean = false;
  includeJobTitle: boolean = false;
  includeJobLocation: boolean = false;
  includeExperience: boolean = false;
  includeSubmittedAt: boolean = false;
  createdBy: string = '';
  jobs: JobPosting[] = [];
  jobId: string = '';
  applications: Application[] = [];
  errorMessage: string = '';
  reports: Report[] = [];
  selectedReport: Report | null = null; // To hold the currently selected report for export
  showExportModal: boolean = false;
  reportDetails: any = {};
  showReportModal: boolean = false;
  showActionCard: { [key: number]: boolean } = {};

  constructor(private interviewService: InterviewService, private applicationService: ApplicationService,
    private userservice: UserService, private reportService: ReportService) { }

  ngOnInit(): void {
    this.createdBy = localStorage.getItem('username');

    this.fetchJobPostings();
    this.fetchReports();
  }

  fetchJobPostings(): void {
    this.interviewService.getJobsByEmployeeId(this.createdBy).subscribe(data => {
      this.jobs = data; // Store the received data

      console.log(this.jobs); // Log the jobs for debug purposes

    }, error => {
      console.error('Error fetching job postings:', error);
    });
  }
  fetchReports(): void {
    this.reportService.getAllReports().subscribe({
      next: (data) => {
        this.reports = data; // Assign fetched data to the class property
        console.log(this.reports); // For debugging
      },
      error: (err) => {
        console.error('Failed to fetch reports', err); // Error handling
      }
    });
  }
  CreateReport() {
    const fieldsToInclude = [];
    if (this.includeApplicantName) fieldsToInclude.push("Applicant Name");
    if (this.includeDateApplied) fieldsToInclude.push("Date Applied");
    if (this.includeStatus) fieldsToInclude.push("Status");
    if (this.includeEmail) fieldsToInclude.push("Email");
    if (this.includePhoneNumber) fieldsToInclude.push("Phone Number");
    if (this.includeNlpScore) fieldsToInclude.push("NLP Score");
    if (this.includeOpenaiScore) fieldsToInclude.push("OpenAI Score");
    if (this.includeJobTitle) fieldsToInclude.push("Job Title");
    if (this.includeJobLocation) fieldsToInclude.push("Job Location");
    if (this.includeExperience) fieldsToInclude.push("Experience");
    if (this.includeSubmittedAt) fieldsToInclude.push("Submitted At");

    this.jobId = this.PositionValue; // Get the jobId from the selected position

    this.applicationService.getApplicationsByJobId(this.jobId).subscribe({
      next: (data: Application[]) => {
        this.applications = data; // Store the received applications

        // Build the applicants data based on selected fields
        const applicantsData = this.applications.map(app => {
          const applicantInfo: any = {}; // Initialize an empty object for applicant
          if (this.includeApplicantName) applicantInfo.name = app.first_name;
          if (this.includeDateApplied) applicantInfo.dateApplied = app.submitted_at;
          if (this.includeStatus) applicantInfo.status = app.application_status;
          if (this.includeEmail) applicantInfo.email = app.email;
          if (this.includePhoneNumber) applicantInfo.phoneNumber = app.phone_number;
          if (this.includeNlpScore) applicantInfo.nlpScore = app.nlp_score;
          if (this.includeOpenaiScore) applicantInfo.openaiScore = app.openai_score;
          if (this.includeJobTitle) applicantInfo.jobTitle = app.job_title;
          if (this.includeJobLocation) applicantInfo.jobLocation = app.job_location;
          if (this.includeExperience) applicantInfo.experience = app.experience;
          if (this.includeSubmittedAt) applicantInfo.submittedAt = app.submitted_at;

          return applicantInfo;
        });

        const reportData = {
          reportName: this.ReportNameValue,
          createdBy: this.createdBy,
          filters: {
            dateRange: this.DateRangeValue,
            status: this.StatusValue
          },
          fields_included: fieldsToInclude,
          data: {
            applicants: applicantsData
          }
        };

        console.log(reportData); // Log the report data for debugging

        // Use the ReportService to call the endpoint
        this.reportService.createReport(reportData).subscribe({
          next: response => {
            console.log('Report created successfully', response);
            
            this.closeCategoryModal()
          },
          error: err => {
            console.error('Error creating report', err);
          }
        });

      },
      error: err => {
        this.errorMessage = 'Failed to load applications';
        console.error(err);
      }
    });

  }

  onCreateReport() {
    document.getElementById('createReportModel')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll


  }


  closeCategoryModal() {

    document.getElementById('createReportModel')!.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll
    document.getElementById('viewModel')!.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll
    this.fetchJobPostings();
    this.fetchReports();
  }
  
  viewReport(report: Report): void {
    this.selectedReport = report;
    const reportData = JSON.parse(this.selectedReport.data);
    const fieldsIncluded = JSON.parse(this.selectedReport.fields_included);
    
    this.reportDetails = {
        reportName: this.selectedReport.reportName,
        createdDate: this.selectedReport.createdDate,
        createdBy: this.selectedReport.createdBy,
        // filters: JSON.parse(this.selectedReport.filters),
        fieldsIncluded: fieldsIncluded,
        applicants: reportData.applicants,
    };

    document.getElementById('viewModel')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll
}

closeReportModal(): void {
    this.showReportModal = false;
}
toggleActions(reportId: number): void {
        // Toggle visibility of action buttons
        this.showActionCard[reportId] = !this.showActionCard[reportId];
    }



  toggleExportModal(report: Report): void {
    this.selectedReport = report; // Store the selected report
    this.showExportModal = !this.showExportModal; // Toggle modal visibility
  }

  exportAsPDF(): void {
    // this.closeExportModal()
    console.log(this.selectedReport);

    const dataIsJson = JSON.parse(this.selectedReport.data); // Parse the JSON string to an object
    const pdf = new jsPDF();
    pdf.setFont("Helvetica", "bold");
    pdf.setFontSize(16);
    pdf.text(`Report Name: ${this.selectedReport.reportName}`, 10, 10);
    pdf.setFont("Helvetica", "normal");
    pdf.setFontSize(12);
    pdf.text(`Created By: ${this.selectedReport.createdBy}`, 10, 20);
    pdf.text(`Created Date: ${this.selectedReport.createdDate}`, 10, 30);

    // Add some space before the table
    pdf.setFontSize(14);
    pdf.text('Applicant Details:', 10, 45);
    // Parse the fields_included
    const fieldsIncluded = JSON.parse(this.selectedReport.fields_included); // Parse fields as well

    // Prepare the table headers and data
    const headers = fieldsIncluded.map(field => {
      switch (field) {
        case 'Applicant Name': return 'Name';
        case 'Email': return 'Email';
        case 'Job Title': return 'Job Title';
        case 'Status': return 'Status';
        case 'Date Applied': return 'Date Applied';
        case 'NLP Score': return 'NLP Score';
        case 'OpenAI Score': return 'OpenAI Score';
        case 'Phone Number': return 'Phone Number';
        case 'Source': return 'Source';
        case 'Job Location': return 'Job Location';
        case 'Experience': return 'Experience';
        case 'Submitted At': return 'Submitted At';
        default: return '';
      }
    }).filter(header => header !== ''); // Filter out any empty headers

    const applicantsData = dataIsJson.applicants.map(applicant => {
      const applicantRow = [];

      fieldsIncluded.forEach(field => {
        switch (field) {
          case 'Applicant Name':
            applicantRow.push(applicant.name || 'N/A');
            break;
          case 'Email':
            applicantRow.push(applicant.email || 'N/A');
            break;
          case 'Job Title':
            applicantRow.push(applicant.jobTitle || 'N/A');
            break;
          case 'Status':
            applicantRow.push(applicant.status || 'N/A');
            break;
          case 'Date Applied':
            applicantRow.push(applicant.dateApplied || 'N/A');
            break;
          case 'NLP Score':
            applicantRow.push(applicant.nlpScore || 'N/A');
            break;
          case 'OpenAI Score':
            applicantRow.push(applicant.openaiScore || 'N/A');
            break;
          case 'Phone Number':
            applicantRow.push(applicant.phoneNumber || 'N/A');
            break;
          case 'Experience':
            applicantRow.push(applicant.experience || 'N/A');
            break;
          case 'Source':
            applicantRow.push(applicant.source || 'N/A');
            break;
          case 'Job Location':
            applicantRow.push(applicant.job_location || 'N/A');
            break;
          case 'Submitted At':
            applicantRow.push(applicant.submitted_at || 'N/A');
            break;
          default:
            break;
        }
      });

      return applicantRow;
    });

    // Create the header and data for the table
    autoTable(pdf, {
      head: [headers],
      body: applicantsData,
      theme: 'grid',
      startY: 60, // Start drawing table from this Y position
    });



    // Save the PDF
    pdf.save(`${this.selectedReport.reportName}.pdf`); // Save the PDF with the report name
    this.closeExportModal()
    this.fetchJobPostings();
    this.fetchReports();
  }


  // Method to export as Excel
  exportAsExcel(): void {
    if (this.selectedReport) {
      // Implement Excel export logic here
      console.log('Exporting as Excel for report:', this.selectedReport);
      this.closeExportModal(); // Close modal after exporting
    }
  }

  // Close export modal
  closeExportModal(): void {
    this.showExportModal = false; // Hide the export modal
  }
  onTypeFocus() {
    this.isTypeFocused = true;

  }

  onTypeBlur() {
    if (!this.TypeValue) {
      this.isTypeFocused = false;
    }
  }

  onStatusFocus() {
    this.isSatusFocused = true;

  }

  onStatusBlur() {
    if (!this.StatusValue) {
      this.isSatusFocused = false;
    }
  }

  onPositionFocus() {
    this.isPositionFocused = true;

  }

  onPositionBlur() {
    if (!this.StatusValue) {
      this.isPositionFocused = false;
    }
  }

  onSourceFocus() {
    this.isSourceFocused = true;

  }

  onSourceBlur() {
    if (!this.SourceValue) {
      this.isSourceFocused = false;
    }
  }

  onReportNameFocus() {
    this.isReportNameFocused = true;

  }

  onReportNameBlur() {
    if (!this.ReportNameValue) {
      this.isReportNameFocused = false;
    }
  }

  onDeadlineFocus() {
    this.isDateRangeFocused = true;

  }

  onDeadlineBlur() {
    if (!this.DateRangeValue) {
      this.isDateRangeFocused = false;
    }
  }
}
