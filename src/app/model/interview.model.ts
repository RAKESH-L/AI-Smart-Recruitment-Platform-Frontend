export interface Interview {
    message?: string;
    type: string;
    job_id: number | string;
    interviewer_id: string;
    application_id: number | string;
    owner_id: string;
    schedule_date: string
    status: string
    feedback: string
    interviewMode: string
    interviewLocation: string;
}