export interface AddAppointmentParams {
    caseId: string;
    patientCardId: string;
    doctorId: string;
    fromUtc: string;
    toUtc: string;
    description: string;
}

export interface EditAppointmentParams {
    id: string,
    fromUtc: string,
    toUtc: string,
    description: string
}