import { Case } from "./case";

export interface PaginatedCases {
    cases: Case[];
    isNextPageAvailable: boolean;
    isPreviousPageAvailable: boolean;
}
