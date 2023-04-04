import { PatientCard } from "../patient-card/patient-card";

export interface Case {
    id: string;
    patientCard: PatientCard;
    diagnosis?: string;
    primaryComplaint: string;
    createdAtUtc: string;
    closedAtUtc?: string;
}
