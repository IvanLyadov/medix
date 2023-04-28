import { SortOrder } from "../sort-order";
import { UsersSortColumn } from "./users-sort-column";

export interface UsersSortState {
    column: UsersSortColumn;
    sortOrder: SortOrder;
}
