import { create } from "zustand";
import { defaultLimit, defaultOffset } from "../models/model-constants";
import { SortOrder } from "../models/sort-order";
import { PaginatedUsers } from "../models/user/paginated-users";
import { UsersFilter } from "../models/user/users-filter";
import { UsersSortColumn } from "../models/user/users-sort-column";
import { UsersState } from "./models/users-state";

export const usersState = create<UsersState>((set) => ({
    usersFilter: {
        search: "",
        usersSortState: {
            column: UsersSortColumn.CreatedAtUtc,
            sortOrder: SortOrder.Desc
        },
        offset: defaultOffset,
        limit: defaultLimit
    },
    updateUsers: (users: PaginatedUsers) => set(() => ({ paginatedUsers: users })),
    updateUsersFilter: (filter: UsersFilter) => set(() => ({ usersFilter: filter }))
}));
