// src/app/models/job.model.ts

export interface GenerateJD {
    job_title?: string;                     // Job title
    experience?: string;                // Experience range (e.g., "6-12 years")
    location?: string;                  // Job location (e.g., "Bangalore")
    employment_type?: string;           // Type of employment (e.g., "full-time")
    salary_range?: string;              // Salary range (e.g., "10-16 LPA")
    skills?: string[];                  // List of required skills
    company_name?: string;
}
