export interface Application {
    application_id: number;          // New field
    application_status: string;      // New field
    current_ctc: string;
    email: string;
    expected_ctc: string;
    experience: string;
    first_name: string;
    job_department: string;          // New field
    job_description: string;         // New field
    job_employment_type: string;     // New field
    job_experience: string;          // New field
    job_id: number;
    job_location: string;            // New field
    job_salary_range: string;        // New field
    job_status: string;              // New field
    job_title: string;               // New field
    last_name: string;
    phone_number: string;
    resume: string;
    submitted_at: string;
    updated_at: string;
}
