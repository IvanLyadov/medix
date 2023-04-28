import { PatientCardsSortState } from "./patient-cards-sort-state.model";

export interface PatientCardsFilter {
    search: string;
    doctorId?: string;
    patientCardsSortState: PatientCardsSortState
    offset: number;
    limit: number;
}
