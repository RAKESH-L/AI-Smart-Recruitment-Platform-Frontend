import { Component, ViewChild } from '@angular/core';

import {
  ApexNonAxisChartSeries,
  ApexPlotOptions,
  ApexChart
} from "ng-apexcharts";

interface stats {
  id: number;
  time: string;
  color: string;
  title?: string;
  subtext?: string;
  link?: string;
}
export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
};

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexGrid,
  ApexYAxis
} from "ng-apexcharts";

export type ChartOptions1 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  grid: ApexGrid;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};


import {
  ApexResponsive,
} from "ng-apexcharts";

export type ChartOptions2 = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};


import {
  ApexTitleSubtitle,
  ApexFill
} from "ng-apexcharts";
import { JobService } from '../../service/job.service';
import { ApplicationService } from '../../service/application.service';
import { JobPosting } from '../../model/Job.model';
import { Application } from '../../model/application.model';
import { JobLog } from '../../model/joblog.model';
import { DatePipe } from '@angular/common';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';

export type ChartOptions3 = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};
declare var Swiper: any;

interface Slide {
  class: string;
  title: string;
  description: string;
  linkText: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  stats: stats[] = [
    {
      id: 1,
      time: '09.30 am',
      color: 'primary',
      title: 'Java Developer',
      subtext: 'Created',
    },
    {
      id: 2,
      time: '10.30 am',
      color: 'accent',
      title: 'Java Developer',
      subtext: 'Updated',
      // link: '#ML-3467',
    },
    {
      id: 3,
      time: '12.30 pm',
      color: 'success',
      title: 'Python Developer',
      subtext: 'fetched',

    },
    {
      id: 4,
      time: '12.30 pm',
      color: 'warning',
      title: 'HR Manger',
      subtext: 'Updated',
      // link: '#ML-3467',
    },
    {
      id: 5,
      time: '12.30 pm',
      color: 'error',
      title: 'Software Engineer',
      subtext: 'Deleted',
      // link: '#ML-3467',
    },
    {
      id: 6,
      time: '12.30 pm',
      color: 'success',
      title: 'Software Engineer',
      subtext: 'Created',
    },
  ];

  createdBy: string = '';
  jobs: JobPosting[] = [];
  selectedJob: JobPosting;
  filteredJobs: JobPosting[] = [];
  searchQuery: string = '';
  jobId: string = '';
  applications: Application[] = [];
  recentApplications: Application[] = [];
  filteredApplication: Application[] = [];
  errorMessage: string = '';
  jobLogs: JobLog[] = [];
  user: User | null = null; // Use the User interface
  applicationCount: number = 0;
  jobCount: number = 0;
  applicationStatusCounts: { [key: string]: number } = {};

  currentPage: number = 0; // To track the current page
  itemsPerPage: number = 3; // Number of items per page

  isStatusFocused: boolean = false;
  StatusValue: string = '';

  application_status: string = 'updated';

  submitted: number = 0;
  hired: number =0;
  interviewing: number =0;
  rejected: number = 0;
  // @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions1: Partial<ChartOptions1>;
  public chartOptions2: Partial<ChartOptions2>;
  public chartOptions3: Partial<ChartOptions3>;


  public colors: string[] = ['#008FFB', '#00E396', '#ffae1f', '#FF4560'];
  constructor(private jobService: JobService, private applicationService: ApplicationService, private datePipe: DatePipe,
    private userService: UserService) {
      this.openApplicantByCreatedById()
      const submitted = 45
      const hired = 55
      const interviewing = 67
      const rejected = 83
  
      const total = this.recentApplications.length || 1; // Use 1 to avoid division by zero
  
      // Calculate percentage for each status
      const submittedPercentage = ((submitted / total) * 100);
      const hiredPercentage = ((hired / total) * 100);
      const interviewingPercentage = ((interviewing / total) * 100);
      const rejectedPercentage = ((rejected / total) * 100);
      console.log('percentage'+total, submitted, hired, interviewing, rejected);
      
    this.chartOptions = {
      series: [ submitted,
        hired,
        interviewing,
        rejected,],
      chart: {
        height: 350,
        type: "radialBar",
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: "22px"
            },
            value: {
              fontSize: "16px"
            },
            total: {
              show: true,
              label: "Total Applications",
              formatter: () => {
                // Return the total count of applications
                return this.recentApplications.length.toString(); // Total applications
            }
            }
          }
        }
      },
      labels: ["Applied", "Hired", "Interviewing", "Rejected"]
    };


    this.chartOptions1 = {
      series: [
        {
          name: "Application",
          data: [10, 41, 30, 5, 49, 62, 40, 91, 14]
        }
      ],

      chart: {
        height: 250,
        fontFamily: "'Plus Jakarta Sans', sans-serif;",
        type: "area",
        sparkline: {
          enabled: false,
        },
      },

      dataLabels: {
        enabled: false
      },

      stroke: {
        curve: "smooth"
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep"
        ],
        // Add grid lines for the x-axis if needed
        labels: {
          show: true // This enables x-axis labels
        }

      },

      yaxis: {
        // Remove background grid lines
        show: false // Set to false to remove the y-axis grid lines
      },

      grid: {
        show: false // Set to false to remove the entire grid
      },

      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };


    this.chartOptions2 = {
      series: [44, 55, 23],
      chart: {
        height: 250,
        type: "donut"
      },
      labels: ["LinkedIn", "Indeed", "Naukari",],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 100
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
  //Constructor end

  ngOnInit(): void {
    this.createdBy = localStorage.getItem('username');
    this.fetchJobPostings();
    this.getUserById(this.createdBy)
    // this.getJobLogsByEmployeeId();
  }

  getUserById(employeeId: string) {
    this.userService.getUserById(employeeId).subscribe(response => {
      this.user = response; // Store the response in the user property
      console.log(this.user);

    }, error => {
      console.error('Error fetching user data:', error);
    });
  }

  fetchJobPostings(): void {
    const createdBy = localStorage.getItem('username');
    this.jobService.getJobsByEmployeeId(createdBy).subscribe(data => {
      this.jobs = data;
      this.jobCount = this.jobs.length
      this.updateFilteredJobs();
      this.getJobLogsByEmployeeId();
      this.openApplicantByCreatedById();
    }, error => {
      console.error('Error fetching job postings:', error);
    });
    // this.getJobLogsByEmployeeId();
    // this.jobService.getJobLogsByEmployeeId(createdBy).subscribe(data =>{
    //   this.jobLogs = data;
    //   console.log(this.jobLogs);

    // },error => {
    //   console.error('Error fetching job Logs:', error);
    // })
  }

  private updateFilteredJobs() {
    this.filteredJobs = this.jobs.slice(this.currentPage * this.itemsPerPage, (this.currentPage + 1) * this.itemsPerPage)
      .map(job => ({
        ...job,
        application_deadline: this.formatDate(job.application_deadline)
      }));
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  }

  nextPage() {
    if ((this.currentPage + 1) * this.itemsPerPage < this.jobs.length) {
      this.currentPage++;
      this.updateFilteredJobs();
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updateFilteredJobs();
    }
  }

  getTotalPages(): number {
    return Math.ceil(this.jobs.length / this.itemsPerPage);
  }

  getCurrentJobRange(): string {
    const start = this.currentPage * this.itemsPerPage + 1; // Page index starts from 1
    const end = Math.min((this.currentPage + 1) * this.itemsPerPage, this.jobs.length);
    return `${start} – ${end} of ${this.jobs.length}`;
  }

  getJobLogsByEmployeeId(): void {
    const createdBy = localStorage.getItem('username');

    console.log("Fetching job logs for user:", createdBy);

    this.jobService.getJobLogsByEmployeeId(createdBy).subscribe(data => {
      console.log("Fetched job logs:", data);

      // Sort the logs by timestamp in descending order (most recent first)
      const sortedLogs = data.sort((a: JobLog, b: JobLog) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      });

      // Take the 5 most recent job logs
      const recentLogs = sortedLogs.slice(0, 5);

      // Map to the desired stats format
      this.stats = recentLogs.map((log: JobLog, index: number) => {
        const date = new Date(log.timestamp);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const year = date.getFullYear();
        const formattedDate = `${day}/${month}/${year}`; // Format date as dd/mm/yyyy

        return {
          id: index + 1,
          time: formattedDate, // Use formatted date here
          color: this.getColorByAction(log.action),
          title: log.job_title,
          subtext: log.action
        };
      });

      console.log("Transformed stats with recent logs:", this.stats);
    }, error => {
      console.error('Error fetching job logs:', error);
    });
  }


  // Helper function to determine color based on action
  getColorByAction(action: string): string {
    switch (action) {
      case 'created':
        return 'success';
      case 'updated':
        return 'accent';
      case 'fetched':
        return 'primary';
      case 'deleted':
        return 'error';
      default:
        return 'warning'; // Default case for unknown actions
    }
  }
  trackByFn(index: number, item: any): number {
    return item.id; // or return a unique identifier from the item
  }

  openApplicantModal(job: any) {

    this.jobId = job.job_id
    this.applicationService.getApplicationsByJobId(this.jobId).subscribe({
      next: (data) => {
        this.applications = data;
        console.log("appliaction", this.applications);

      },
      error: (error) => {
        this.errorMessage = 'Failed to load applications';
        console.error(error);
      }
    });
    document.getElementById('applicantModal')!.style.display = 'block'; // Show modal
    document.body.style.overflow = 'hidden'; // Disable body scroll
  }

  closeApplicantModal() {
    this.applications = [];

    document.getElementById('applicantModal')!.style.display = 'none'; // Hide modal
    document.body.style.overflow = 'auto'; // Re-enable body scroll
  }

  openApplicantByCreatedById() {

    const createdBy = localStorage.getItem('username');
    this.applicationService.getApplicationsByCreatedBy(createdBy).subscribe({
      next: (data) => {
        this.recentApplications = data;
        this.applicationCount = this.recentApplications.length;
        this.updateFilteredApplication()
        this.applicationStatusCounts = {
          submitted: 0,
          shortlisted: 0,
          interviewing: 0,
          offered: 0,
          accepted: 0,
          rejected: 0,
          hired: 0,
        };
        this.recentApplications.forEach(application => {
          const status = application.application_status; // Adjust according to actual field name in your data
          if (this.applicationStatusCounts.hasOwnProperty(status)) {
            this.applicationStatusCounts[status]++;
          }
        });
         this.submitted = this.applicationStatusCounts['submitted'] || 0;
         this.hired = this.applicationStatusCounts['hired'] || 0;
         this.interviewing = this.applicationStatusCounts['interviewing'] || 0;
         this.rejected = this.applicationStatusCounts['rejected'] || 0;
        
        console.log("Application Status Counts:", this.submitted);
        console.log("appliaction", this.applications);

      },
      error: (error) => {
        this.errorMessage = 'Failed to load applications';
        console.error(error);
      }
    });

  }

  private updateFilteredApplication() {
    this.filteredApplication = this.recentApplications.slice(this.currentPage * this.itemsPerPage, (this.currentPage + 1) * this.itemsPerPage)
      .map(app => ({
        ...app,
        submitted_at: this.formatDate(app.submitted_at)
      }));
  }

  getCurrentApplicationRange(): string {
    const start = this.currentPage * this.itemsPerPage + 1; // Page index starts from 1
    const end = Math.min((this.currentPage + 1) * this.itemsPerPage, this.recentApplications.length);
    return `${start} – ${end} of ${this.recentApplications.length}`;
  }
  onStatusFocus() {
    this.isStatusFocused = true;

  }

  onStatusBlur() {
    if (!this.StatusValue) {
      this.isStatusFocused = false;
    }
  }

  slides: Slide[] = [
    {
      class: "swiper-slide swiper-slide--one",
      title: 'Java',
      description: 'Submitted - 145 Interviewing - 10 Rejected - 62 and Hired - 40 ',
      linkText: 'explore'
    },
    {
      class: "swiper-slide swiper-slide--two",
      title: '.Net',
      description: 'Submitted - 12 Interviewing - 2 Rejected - 7 and Hired - 3',
      linkText: 'explore'
    },
    {
      class: "swiper-slide swiper-slide--three",
      title: 'Python',
      description: 'Submitted - 39 Interviewing - 3 Rejected - 14 and Hired - 20',
      linkText: 'explore'
    },
    {
      class: "swiper-slide swiper-slide--four",
      title: 'Tester',
      description: 'Submitted - 390 Interviewing - 40 Rejected - 20 and Hired - 232',
      linkText: 'explore'
    },
    {
      class: "swiper-slide swiper-slide--five",
      title: 'Angular',
      description: 'Submitted - 10 Interviewing - 1 Rejected - 3 and Hired - 5',
      linkText: 'explore'
    }
  ];
  ngAfterViewInit() {

    const swiper = new Swiper('.swiper', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      autoplay: {
        delay: 2000,
      },
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: 3,
        slideShadows: true,
      },
      keyboard: {
        enabled: true,
      },
      mousewheel: {
        thresholdDelta: 70,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 1,
        },
        1024: {
          slidesPerView: 2,
        },
        1560: {
          slidesPerView: 3,
        },
      },
    });
  }
  onSlideClick(event: any) {
    const swiperElement = document.querySelector('.swiper') as HTMLElement | null;

    if (swiperElement) {
      const swiper = (swiperElement as any).swiper;

      const clickedSlide = event.currentTarget;
      swiper.slideTo(swiper.slides.indexOf(clickedSlide));
    }
  }
}
