import { CasesSortState } from "./cases-sort-state";

export interface CasesFilter {
    userId: string;
    search: string;
    isActive?: boolean;
    casesSortState: CasesSortState
    offset: number;
    limit: number;
}
