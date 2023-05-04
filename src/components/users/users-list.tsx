import { debounce } from 'lodash';
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow_right.svg";
import { ReactComponent as ArrowUp } from "../../assets/icons/arrow_up.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow_down.svg";
import "./users-list.css";
import { SortOrder } from "../../models/sort-order";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "zustand";
import moment from "moment";
import { defaultLimit, defaultOffset } from "../../models/model-constants";
import { usersState } from '../../store/usersState';
import { getUsers } from '../../services/users.service';
import { UsersSortColumn } from '../../models/user/users-sort-column';

export const UsersList = () => {
    const usersStore = useStore(usersState);

    const fetchUsers = useCallback(async () => {
        const paginatedUsers = await getUsers(usersStore.usersFilter);
        usersStore.updateUsers(paginatedUsers);
    }, [usersStore]);

    useEffect(() => {
        const timeout = setTimeout(fetchUsers, 500);
        return () => clearTimeout(timeout);
    }, [usersStore.usersFilter]);

    const formatDateTime = (dateTime: string): string => {
        const date = moment.utc(dateTime);
        const localDate = date.local();
        return localDate.format('YYYY-MM-DD HH:mm');
    }

    const formatDate = (dateTime: string): string => {
        const date = moment.utc(dateTime);
        const localDate = date.local();
        return localDate.format('YYYY-MM-DD');
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        var newFilter = { ...usersStore.usersFilter };
        newFilter.search = value;
        newFilter.limit = defaultLimit;
        newFilter.offset = defaultOffset;
        usersStore.updateUsersFilter(newFilter);
    }

    const debouncedHandleChange = debounce(handleChange, 800);

    const toPreviousPage = () => {
        const offset = usersStore.usersFilter.offset - defaultLimit;

        var newFilter = { ...usersStore.usersFilter };
        newFilter.offset = offset >= 0 ? offset : 0;
        usersStore.updateUsersFilter(newFilter);
    };

    const toNextPage = () => {
        var newFilter = { ...usersStore.usersFilter };
        newFilter.offset += defaultLimit;

        usersStore.updateUsersFilter(newFilter);
    };

    const sortrDate = (order: SortOrder) => {
        var newFilter = { ...usersStore.usersFilter };
        newFilter.usersSortState.column = UsersSortColumn.CreatedAtUtc;
        newFilter.usersSortState.sortOrder = order;
        usersStore.updateUsersFilter(newFilter);
    };

    const sortrFirstName = (order: SortOrder) => {
        var newFilter = { ...usersStore.usersFilter };
        newFilter.usersSortState.column = UsersSortColumn.FirstName;
        newFilter.usersSortState.sortOrder = order;
        usersStore.updateUsersFilter(newFilter);
    };

    const sortrLastName = (order: SortOrder) => {
        var newFilter = { ...usersStore.usersFilter };
        newFilter.usersSortState.column = UsersSortColumn.LastName;
        newFilter.usersSortState.sortOrder = order;
        usersStore.updateUsersFilter(newFilter);
    };

    const getPagerText = (): string => {
        const lastItemNumber = usersStore.usersFilter.offset + (usersStore.paginatedUsers?.users.length || 0);
        const firstItemNumber = lastItemNumber !== 0 ? usersStore.usersFilter.offset + 1 : 0;
        return lastItemNumber !== 0 ? `${firstItemNumber} - ${lastItemNumber}` : '0 - 0';
    };

    return (
        <article className="flex flex-col h-full">
            <div className="flex justify-between py-2 pl-4">
                <div className="flex flex-row">
                    <div className="text-3xl mr-4">Users</div>
                    <Link to={"./new"}>
                        <button className="flex flex-row border-2 pl-2 pr-4 pt-1.5 pb-1.5 font-bold rounded-md bg-blue-4 hover:bg-blue-5">
                            <Plus className="fill-green-1 h-5 w-5" />
                            New User
                        </button>
                    </Link>
                </div>
                <div className="flex flex-row">
                    <Search className="mt-2 mr-3 h-5 w-5" />
                    <input className="mr-6 mt-2 h-6 w-52 rounded-md border-2" placeholder="Search" type="text" onChange={debouncedHandleChange} />
                </div>
            </div>

            <div className="table-header-u bg-blue-5">
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        Date Of Registration
                    </div>
                    <div className="flex flex-col ml-1 mt-1">
                        <button onClick={() => sortrDate(SortOrder.Asc)} disabled={usersStore.usersFilter.usersSortState.sortOrder === SortOrder.Asc}>
                            <ArrowUp className="h-4 w-4" />
                        </button>
                        <button onClick={() => sortrDate(SortOrder.Desc)} disabled={usersStore.usersFilter.usersSortState.sortOrder === SortOrder.Desc}>
                            <ArrowDown className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        First Name
                    </div>
                    <div className="flex flex-col ml-1 mt-1">
                        <button onClick={() => sortrFirstName(SortOrder.Asc)} disabled={usersStore.usersFilter.usersSortState.sortOrder === SortOrder.Asc}>
                            <ArrowUp className="h-4 w-4" />
                        </button>
                        <button onClick={() => sortrFirstName(SortOrder.Desc)} disabled={usersStore.usersFilter.usersSortState.sortOrder === SortOrder.Desc}>
                            <ArrowDown className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        Last Name
                    </div>
                    <div className="flex flex-col ml-1 mt-1">
                        <button onClick={() => sortrLastName(SortOrder.Asc)} disabled={usersStore.usersFilter.usersSortState.sortOrder === SortOrder.Asc}>
                            <ArrowUp className="h-4 w-4" />
                        </button>
                        <button onClick={() => sortrLastName(SortOrder.Desc)} disabled={usersStore.usersFilter.usersSortState.sortOrder === SortOrder.Desc}>
                            <ArrowDown className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        Role
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        Job Title
                    </div>
                </div>
                <div className="mt-2 pl-2 font-bold truncate">
                    Phone Number
                </div>
                <div></div>
            </div>
            <div className="flex-1 overflow-auto min-h-0">
                {usersStore.paginatedUsers?.users.map((u) => {
                    return (
                        <div key={u.id} className="table-row-u even:bg-blue-6">
                            <div className="pt-1 pl-2 truncate">{formatDateTime(u.createdAtUtc)}</div>
                            <div className="pt-1 pl-2 truncate">{u.firstName}</div>
                            <div className="pt-1 pl-2 truncate">{u.lastName}</div>
                            <div className="pt-1 pl-2 truncate">{u.role}</div>
                            <div className="pt-1 pl-2 truncate">{u.jobTitle}</div>
                            <div className="pt-1 pl-2 truncate">{u.phoneNumber}</div>
                            <Link className="pt-1 pl-2 truncate text-blue-400 cursor-pointer" to={"/"}>Details</Link>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-row justify-center h-10 pt-2 font-bold">
                <button onClick={toPreviousPage} disabled={!usersStore.paginatedUsers?.isPreviousPageAvailable}>
                    <ArrowLeft className="h-7 w-7" />
                </button>
                <div className="mt-2">
                    {getPagerText()}
                </div>
                <button onClick={toNextPage} disabled={!usersStore.paginatedUsers?.isNextPageAvailable}>
                    <ArrowRight className="h-7 w-7" />
                </button>
            </div>
        </article>

    );
}