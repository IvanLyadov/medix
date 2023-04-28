import { PaginatedPatientCards } from "../../models/patient-card/paginated-patient-cards";
import { PatientCardsFilter } from "../../models/patient-card/patient-cards-filter";

export interface PatientCardsState {
    paginatedPatientCards?: PaginatedPatientCards;
    patientCardsFilter: PatientCardsFilter;
    updatePatientCards: (data: PaginatedPatientCards) => void;
    updatePatientCardsFilter: (data: PatientCardsFilter) => void;
}
