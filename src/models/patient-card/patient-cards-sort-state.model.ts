import { SortOrder } from "../sort-order";
import { PatientCardsSortColumn } from "./patient-cards-sort-column";

export interface PatientCardsSortState {
    column: PatientCardsSortColumn;
    sortOrder: SortOrder;
}
