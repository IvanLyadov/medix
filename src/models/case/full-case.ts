import { PatientCard } from "../patient-card/patient-card";
import { User } from "../user/user";

export interface FullCase {
    id: string;
    patientCard: PatientCard;
    diagnosis?: string;
    primaryComplaint: string;
    doctors: User[];
    createdAtUtc: string;
    closedAtUtc?: string;
}
