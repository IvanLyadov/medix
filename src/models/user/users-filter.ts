import { UserRole } from "./user-role";
import { UsersSortState } from "./users-sort-state";

export interface UsersFilter {
    search: string;
    role?: UserRole;
    usersSortState: UsersSortState
    offset: number;
    limit: number;
}
