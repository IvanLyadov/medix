export interface Case {
    id: string;
    patientFirstName: string;
    patientLastName: string;
    diagnosis?: string;
    primaryComplaint: string;
    createdAtUtc: string;
    closedAtUtc?: string;
}
