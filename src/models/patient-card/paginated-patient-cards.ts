import { PatientCard } from "./patient-card";

export interface PaginatedPatientCards{
    patientCards: PatientCard[];
    isNextPageAvailable: boolean;
    isPreviousPageAvailable: boolean;
}
