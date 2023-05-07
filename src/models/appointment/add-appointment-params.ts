export interface AddAppointmentParams {
    caseId: string;
    patientCardId: string;
    doctorId: string;
    fromUtc: string;
    toUtc: string;
    description: string;
}
