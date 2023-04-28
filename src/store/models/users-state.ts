import { PaginatedUsers } from "../../models/user/paginated-users";
import { UsersFilter } from "../../models/user/users-filter";

export interface UsersState {
    paginatedUsers?: PaginatedUsers;
    usersFilter: UsersFilter;
    updateUsers: (data: PaginatedUsers) => void;
    updateUsersFilter: (data: UsersFilter) => void;
}
