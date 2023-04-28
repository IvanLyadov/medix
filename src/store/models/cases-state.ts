import { CasesFilter } from "../../models/case/cases-filter";
import { PaginatedCases } from "../../models/case/paginated-cases";

export interface CasesState {
    paginatedCases?: PaginatedCases;
    casesFilter: CasesFilter;
    updateCases: (data: PaginatedCases) => void;
    updateCasesFilter: (data: CasesFilter) => void;
}
