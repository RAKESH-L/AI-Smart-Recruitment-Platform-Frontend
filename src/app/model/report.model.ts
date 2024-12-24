export interface Applicant {
    name?: string;
    email?: string; // Optional if not always provided
    status?: string;
    jobTitle?: string;
    nlpScore?: string;
    dateApplied?: string;
    openaiScore?: string;
    phoneNumber?: string;
    source?: string;
    jobLocation?: string;
    experience?: string;
    submittedAt?: string;
}

export interface Report {
    id: number;
    reportName: string;
    createdDate: string;   // Assuming date is a string, ideally use Date type
    createdBy: string;
    data: string;          // Data remains a JSON string
    fields_included: string; // List of fields included as strings
    filters: {
        status: string;          // Status filter
        dateRange: string;       // Date range filter
    };
}
