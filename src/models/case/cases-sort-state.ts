import { SortOrder } from "../sort-order";
import { CasesSortColumn } from "./cases-sort-column";

export interface CasesSortState {
    column: CasesSortColumn;
    sortOrder: SortOrder;
}
