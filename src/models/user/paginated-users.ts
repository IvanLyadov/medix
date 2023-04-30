import { User } from "./user";

export interface PaginatedUsers{
    users: User[];
    isNextPageAvailable: boolean;
    isPreviousPageAvailable: boolean;
}
