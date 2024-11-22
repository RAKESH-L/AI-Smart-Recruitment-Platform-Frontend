export interface InterviewDetails {
    interview_id: number;                // Unique identifier for the interview
    type: 'HR interview' | 'Technical interview' | 'Managerial interview'; // Type of interview
    job_id: number;                      // Reference to the job
    interviewer_id: string;              // ID of the interviewer
    application_id: number;              // Reference to the application
    owner_id: string;                    // ID of the user who owns the interview
    schedule_date: string;               // Date and time when the interview is scheduled
    status: 'scheduled' | 'completed' | 'cancelled'; // Current status of the interview
    feedback: string | null;             // Feedback for the interview, if any
    interviewMode: 'remote' | 'in-person' | 'video-call' | 'phone-call' | 'teams-call'; // Mode of interview
    interviewLocation: string;           // Location of the interview

    // Job Details (related to the interview)
    job_title: string;                   // Title of the job
    job_description: string;             // Description of the job
    job_department: string;              // Department for the job
    job_employment_type: string;         // Employment type (e.g., full-time, part-time)
    job_experience: string;              // Required experience for the job
    job_location: string;                // Location of the job
    job_salary_range: string;            // Salary range for the job
    job_status: string;                  // Current status of the job

    // Applicant Details
    applicant_first_name: string;        // First name of the applicant
    applicant_last_name: string;         // Last name of the applicant
    applicant_email: string;             // Email of the applicant
    applicant_phone: string;             // Phone number of the applicant
    resume: string;                      // Resume file path or URL

    // Interviewer Details
    interviewer_full_name: string;       // Full name of the interviewer
    interviewer_username: string;        // Username of the interviewer
    interviewer_email: string;           // Email of the interviewer

    // Owner Details
    owner_full_name: string;             // Full name of the owner of the interview
    owner_username: string;              // Username of the interview owner
    owner_email: string;                 // Email of the interview owner

    // Timestamps
    submitted_at: string;                // The date and time when the application was submitted
    updated_at: string;                  // The date and time when the interview details were last updated
}
