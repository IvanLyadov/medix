import { debounce } from 'lodash';
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow_right.svg";
import { ReactComponent as ArrowUp } from "../../assets/icons/arrow_up.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow_down.svg";
import "./patient-cards-list.css";
import { SortOrder } from "../../models/sort-order";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "zustand";
import moment from "moment";
import { defaultLimit, defaultOffset } from "../../models/model-constants";
import { getPatientCards } from '../../services/patient-cards.service';
import { patientCardsState } from '../../store/patientCardsState';
import { PatientCardsSortColumn } from '../../models/patient-card/patient-cards-sort-column';
import { sessionState } from '../../store/appState';
import { formatDateTime, formatDate } from '../../utils/date.util';

export const PatientCardsList = () => {
    const sessionStore = useStore(sessionState);
    const patientCardsStore = useStore(patientCardsState);

    const fetchPatientCards = useCallback(async () => {
        const paginatedPatientCards = await getPatientCards(patientCardsStore.patientCardsFilter);
        patientCardsStore.updatePatientCards(paginatedPatientCards);
    }, [patientCardsStore]);

    useEffect(() => {
        if (sessionStore.loggedInUser){
            fetchPatientCards();
        }
    }, [patientCardsStore.patientCardsFilter, sessionStore.loggedInUser]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        var newFilter = { ...patientCardsStore.patientCardsFilter };
        newFilter.search = value;
        newFilter.limit = defaultLimit;
        newFilter.offset = defaultOffset;
        patientCardsStore.updatePatientCardsFilter(newFilter);
    }

    const debouncedHandleChange = debounce(handleChange, 800);

    const toPreviousPage = () => {
        const offset = patientCardsStore.patientCardsFilter.offset - defaultLimit;

        var newFilter = { ...patientCardsStore.patientCardsFilter };
        newFilter.offset = offset >= 0 ? offset : 0;
        patientCardsStore.updatePatientCardsFilter(newFilter);
    };

    const toNextPage = () => {
        var newFilter = { ...patientCardsStore.patientCardsFilter };
        newFilter.offset += defaultLimit;

        patientCardsStore.updatePatientCardsFilter(newFilter);
    };

    const sortrDate = (order: SortOrder) => {
        var newFilter = { ...patientCardsStore.patientCardsFilter };
        newFilter.patientCardsSortState.column = PatientCardsSortColumn.CreatedAtUtc;
        newFilter.patientCardsSortState.sortOrder = order;
        patientCardsStore.updatePatientCardsFilter(newFilter);
    };

    const sortrFirstName = (order: SortOrder) => {
        var newFilter = { ...patientCardsStore.patientCardsFilter };
        newFilter.patientCardsSortState.column = PatientCardsSortColumn.FirstName;
        newFilter.patientCardsSortState.sortOrder = order;
        patientCardsStore.updatePatientCardsFilter(newFilter);
    };

    const sortrLastName = (order: SortOrder) => {
        var newFilter = { ...patientCardsStore.patientCardsFilter };
        newFilter.patientCardsSortState.column = PatientCardsSortColumn.LastName;
        newFilter.patientCardsSortState.sortOrder = order;
        patientCardsStore.updatePatientCardsFilter(newFilter);
    };

    const sortrDateOfBirth = (order: SortOrder) => {
        var newFilter = { ...patientCardsStore.patientCardsFilter };
        newFilter.patientCardsSortState.column = PatientCardsSortColumn.DateOfBirth;
        newFilter.patientCardsSortState.sortOrder = order;
        patientCardsStore.updatePatientCardsFilter(newFilter);
    };

    const getPagerText = (): string => {
        const lastItemNumber = patientCardsStore.patientCardsFilter.offset + (patientCardsStore.paginatedPatientCards?.patientCards.length || 0);
        const firstItemNumber = lastItemNumber !== 0 ? patientCardsStore.patientCardsFilter.offset + 1 : 0;
        return lastItemNumber !== 0 ? `${firstItemNumber} - ${lastItemNumber}` : '0 - 0';
    };

    return (
        <article className="flex flex-col h-full">
            <div className="flex justify-between py-2 pl-4">
                <div className="flex flex-row">
                    <div className="text-3xl mr-4">Patient Cards</div>
                    <Link to={"./new"}>
                        <button className="flex flex-row border-2 pl-2 pr-4 pt-1.5 pb-1.5 font-bold rounded-md bg-blue-4 hover:bg-blue-5">
                            <Plus className="fill-green-1 h-5 w-5" />
                            New Patient
                        </button>
                    </Link>
                </div>
                <div className="flex flex-row">
                    <Search className="mt-2 mr-3 h-5 w-5" />
                    <input className="mr-6 mt-2 h-6 w-52 rounded-md border-2" placeholder="Search" type="text" onChange={debouncedHandleChange} />
                </div>
            </div>

            <div className="table-header bg-blue-5">
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        Date Of Registration
                    </div>
                    <div className="flex flex-col ml-1 mt-1">
                        <button onClick={() => sortrDate(SortOrder.Asc)} disabled={patientCardsStore.patientCardsFilter.patientCardsSortState.sortOrder === SortOrder.Asc}>
                            <ArrowUp className="h-4 w-4" />
                        </button>
                        <button onClick={() => sortrDate(SortOrder.Desc)} disabled={patientCardsStore.patientCardsFilter.patientCardsSortState.sortOrder === SortOrder.Desc}>
                            <ArrowDown className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        First Name
                    </div>
                    <div className="flex flex-col ml-1 mt-1">
                        <button onClick={() => sortrFirstName(SortOrder.Asc)} disabled={patientCardsStore.patientCardsFilter.patientCardsSortState.sortOrder === SortOrder.Asc}>
                            <ArrowUp className="h-4 w-4" />
                        </button>
                        <button onClick={() => sortrFirstName(SortOrder.Desc)} disabled={patientCardsStore.patientCardsFilter.patientCardsSortState.sortOrder === SortOrder.Desc}>
                            <ArrowDown className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        Last Name
                    </div>
                    <div className="flex flex-col ml-1 mt-1">
                        <button onClick={() => sortrLastName(SortOrder.Asc)} disabled={patientCardsStore.patientCardsFilter.patientCardsSortState.sortOrder === SortOrder.Asc}>
                            <ArrowUp className="h-4 w-4" />
                        </button>
                        <button onClick={() => sortrLastName(SortOrder.Desc)} disabled={patientCardsStore.patientCardsFilter.patientCardsSortState.sortOrder === SortOrder.Desc}>
                            <ArrowDown className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        Date Of Birth
                    </div>
                    <div className="flex flex-col ml-1 mt-1">
                        <button onClick={() => sortrDateOfBirth(SortOrder.Asc)} disabled={patientCardsStore.patientCardsFilter.patientCardsSortState.sortOrder === SortOrder.Asc}>
                            <ArrowUp className="h-4 w-4" />
                        </button>
                        <button onClick={() => sortrDateOfBirth(SortOrder.Desc)} disabled={patientCardsStore.patientCardsFilter.patientCardsSortState.sortOrder === SortOrder.Desc}>
                            <ArrowDown className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="mt-2 pl-2 font-bold truncate">
                    Phone Number
                </div>
                <div></div>
            </div>
            <div className="flex-1 overflow-auto min-h-0">
                {patientCardsStore.paginatedPatientCards?.patientCards.map((pc) => {
                    return (
                        <div key={pc.id} className="table-row even:bg-blue-6">
                            <div className="pt-1 pl-2 truncate">{formatDateTime(pc.createdAtUtc)}</div>
                            <div className="pt-1 pl-2 truncate">{pc.firstName}</div>
                            <div className="pt-1 pl-2 truncate">{pc.lastName}</div>
                            <div className="pt-1 pl-2 truncate">{formatDate(pc.dateOfBirth)}</div>
                            <div className="pt-1 pl-2 truncate">{pc.phoneNumber}</div>
                            <Link title="Add new case" className="flex flex-row mt-1.5 px-1 truncate text-blue-400 cursor-pointer h-fit border-2 rounded-md border-blue-5" to={`/new-case/${pc.id}`}>
                                <Plus className="fill-green-1 h-5 w-5 cursor-pointer" />
                                <span className="text-blue-400">New Case</span>
                            </Link>
                            <Link className="pt-1 pl-2 truncate text-blue-400 cursor-pointer" to={"/"}>Details</Link>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-row justify-center h-10 pt-2 font-bold">
                <button onClick={toPreviousPage} disabled={!patientCardsStore.paginatedPatientCards?.isPreviousPageAvailable}>
                    <ArrowLeft className="h-7 w-7" />
                </button>
                <div className="mt-2">
                    {getPagerText()}
                </div>
                <button onClick={toNextPage} disabled={!patientCardsStore.paginatedPatientCards?.isNextPageAvailable}>
                    <ArrowRight className="h-7 w-7" />
                </button>
            </div>
        </article>

    );
}