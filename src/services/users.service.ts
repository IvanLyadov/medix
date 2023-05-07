import axios from "axios";
import { Params } from "react-router-dom";
import { PaginatedUsers } from "../models/user/paginated-users";
import { User } from "../models/user/user";
import { UsersFilter } from "../models/user/users-filter";

const usersUrl = `${process.env.REACT_APP_API_URL}/api/users`;

export const getUsers = async (usersFilter: UsersFilter): Promise<PaginatedUsers> => {
    let params: Params = {
        limit: usersFilter.limit.toString(),
        offset: usersFilter.offset.toString(),
        sortColumn: usersFilter.usersSortState.column,
        sortOrder: usersFilter.usersSortState.sortOrder
    };

    if (usersFilter.search != null) {
    params = {...params, search: usersFilter.search}
    }

    const { data } = await axios.get<PaginatedUsers>(usersUrl, {params: params});
    return data;
}

export const getUser = async (userId: string): Promise<User> => {
    const { data } = await axios.get<User>(`${usersUrl}/${userId}`);
    return data;
}

export const getDoctors = async (search?: string): Promise<User[]> => {
    let params: Params = {};
    if (search != null) {
        params = {...params, search: search}
        }

    const { data } = await axios.get<User[]>(`${usersUrl}/doctors`, {params: params});
    return data;
}
