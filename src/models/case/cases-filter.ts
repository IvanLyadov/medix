import { CasesSortState } from "./cases-sort-state";

export interface CasesFilter {
    search: string;
    isActive?: boolean;
    casesSortState: CasesSortState
    offset: number;
    limit: number;
}
