import { create } from "zustand";
import { CasesFilter } from "../models/case/cases-filter";
import { CasesSortColumn } from "../models/case/cases-sort-column";
import { PaginatedCases } from "../models/case/paginated-cases";
import { defaultLimit, defaultOffset } from "../models/model-constants";
import { SortOrder } from "../models/sort-order";
import { CasesState } from "./models/cases-state";

export const casesState = create<CasesState>((set) => ({
    casesFilter: {
        search: "",
        casesSortState: {
            column: CasesSortColumn.CreatedAtUtc,
            sortOrder: SortOrder.Desc
        },
        offset: defaultOffset,
        limit: defaultLimit
    },
    updateCases: (cases: PaginatedCases) => set(() => ({ paginatedCases: cases })),
    updateCasesFilter: (filter: CasesFilter) => set(() => ({ casesFilter: filter }))
}));