// src/app/models/job.model.ts

export interface JobPosting {
    job_id?:string;
    title?: string;                     // Job title
    description?: string;               // Job description
    department?: string;                // Department name
    experience?: string;                // Experience range (e.g., "6-12 years")
    location?: string;                  // Job location (e.g., "Bangalore")
    employment_type?: string;           // Type of employment (e.g., "full-time")
    salary_range?: string;              // Salary range (e.g., "10-16 LPA")
    status?: string;                    // Job status (e.g., "open")
    client?: string;                    // Client name
    application_deadline?: string;
    created_by?: string;                // User who created the job post (e.g., "2000080631")
    skills?: string[];                  // List of required skills
}
