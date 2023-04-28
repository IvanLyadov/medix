import { create } from "zustand";
import { defaultLimit, defaultOffset } from "../models/model-constants";
import { PaginatedPatientCards } from "../models/patient-card/paginated-patient-cards";
import { PatientCardsFilter } from "../models/patient-card/patient-cards-filter";
import { PatientCardsSortColumn } from "../models/patient-card/patient-cards-sort-column";
import { SortOrder } from "../models/sort-order";
import { PatientCardsState } from "./models/patient-cards-state";

export const patientCardsState = create<PatientCardsState>((set) => ({
    patientCardsFilter: {
        search: "",
        patientCardsSortState: {
            column: PatientCardsSortColumn.CreatedAtUtc,
            sortOrder: SortOrder.Desc
        },
        offset: defaultOffset,
        limit: defaultLimit
    },
    updatePatientCards: (patientCards: PaginatedPatientCards) => set(() => ({ paginatedPatientCards: patientCards })),
    updatePatientCardsFilter: (filter: PatientCardsFilter) => set(() => ({ patientCardsFilter: filter }))
}));