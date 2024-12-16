export interface PublishJob {
    job_title?:string;
    job_description?: string;                    
    job_location?: string;                  // Job location (e.g., "Bangalore")
    skills?: string[];                  // List of required skills
}
