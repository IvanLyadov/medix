export interface CalendarAppointment {
    id: string;
    caseId: string;
    patientCardId: string;
    doctorId: string;
    fromUtc: string;
    toUtc: string;
    description: string;
}
