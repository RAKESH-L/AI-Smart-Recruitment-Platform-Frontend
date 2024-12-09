// src/app/models/job-log.model.ts

export interface JobLog {
    log_id?: number;          // Corresponds to the log_id from the JSON
    job_id?: number; 
    job_title?: string;         // Corresponds to the job_id from the JSON
    action?: string;         // Corresponds to the action from the JSON
    performed_by?: string;    // Corresponds to the performed_by from the JSON
    timestamp?: string;      // Corresponds to the timestamp from the JSON
}
