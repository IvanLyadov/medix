import { debounce } from 'lodash';
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow_right.svg";
import { ReactComponent as ArrowUp } from "../../assets/icons/arrow_up.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow_down.svg";
import { ReactComponent as Active } from "../../assets/icons/active.svg";
import { ReactComponent as Inactive } from "../../assets/icons/inactive.svg";
import { Case } from "../../models/case/case";
import "./cases-list.css";
import { SortOrder } from "../../models/sort-order";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useStore } from "zustand";
import { casesState } from "../../store/casesState";
import { getCases } from "../../services/cases.service";
import moment from "moment";
import { defaultLimit, defaultOffset } from "../../models/model-constants";

export const CasesList = () => {
    const casesStore = useStore(casesState);

    const fetchCases = useCallback(async () => {
        const paginatedCases = await getCases(casesStore.casesFilter);
        casesStore.updateCases(paginatedCases);
    }, [casesStore]);

    useEffect(() => {
        const timeout = setTimeout(fetchCases, 500);
        return () => clearTimeout(timeout);
    },[casesStore.casesFilter]);

    const formatDateTime = (dateTime: string): string => {
        const date = moment.utc(dateTime);
        const localDate = date.local();
        return localDate.format('YYYY-MM-DD HH:mm');
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        var newFilter = {...casesStore.casesFilter};
        newFilter.search = value;
        newFilter.limit = defaultLimit;
        newFilter.offset = defaultOffset;
        casesStore.updateCasesFilter(newFilter);
      }

    const debouncedHandleChange = debounce(handleChange, 800);

    const toPreviousPage = () => {
        const offset = casesStore.casesFilter.offset - defaultLimit;

        var newFilter = {...casesStore.casesFilter};
        newFilter.offset = offset >= 0 ? offset : 0;
        casesStore.updateCasesFilter(newFilter);
    };

    const toNextPage = () => {
        var newFilter = {...casesStore.casesFilter};
        newFilter.offset += defaultLimit;
        
        casesStore.updateCasesFilter(newFilter);
    };

    const sortrDate = (order: SortOrder) => {
        var newFilter = {...casesStore.casesFilter};
        newFilter.casesSortState.sortOrder = order;
        casesStore.updateCasesFilter(newFilter);
    };

    const filterStatus = (isActive: boolean) => {
        var newFilter = {...casesStore.casesFilter};

        let res: boolean | undefined = undefined;

        if (casesStore.casesFilter.isActive != isActive){
            res = isActive;
        }

        newFilter.isActive = res;
        casesStore.updateCasesFilter(newFilter);
    };

    const getActiveStatusFilterBtnClass = (): string => {
        if (casesStore.casesFilter.isActive){
            return "fill-green-600"
        } else {
            return "";
        }
    }

    const getInactiveStatusFilterBtnClass = (): string => {
        if (casesStore.casesFilter.isActive !== undefined && !casesStore.casesFilter.isActive){
            return "fill-red-600"
        } else {
            return "";
        }
    }

    return (
        <article className="flex flex-col h-full">
            <div className="flex justify-between py-2 pl-4">
                <div className="flex flex-row">
                    <div className="text-3xl mr-4">Cases</div>
                    <button className="flex flex-row border-2 pl-2 pr-4 pt-2 font-bold rounded-md bg-blue-4 hover:bg-blue-5">
                        <Plus className="fill-green-1 h-5 w-5" />
                        New Case
                    </button>
                </div>
                <div className="flex flex-row">
                    <Search className="mt-2 mr-3 h-5 w-5" />
                    <input className="mr-6 mt-2 h-6 w-52 rounded-md border-2" placeholder="Search" type="text" onChange={debouncedHandleChange}/>
                </div>
            </div>

            <div className="table-header bg-blue-5">
                <div className="flex flex-row pl-2">
                    <div className="inline-block pt-2 font-bold truncate">
                        Created Date
                    </div>
                    <div className="flex flex-col ml-1 mt-1">
                        <button onClick={() => sortrDate(SortOrder.Asc)} disabled={casesStore.casesFilter.casesSortState.sortOrder === SortOrder.Asc}>
                            <ArrowUp className="h-4 w-4" />
                        </button>
                        <button onClick={() => sortrDate(SortOrder.Desc)} disabled={casesStore.casesFilter.casesSortState.sortOrder === SortOrder.Desc}>
                            <ArrowDown className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-row pl-2">
                    <div className="inline-block pt-2 font-bold truncate">
                        Status
                    </div>
                    <div className="flex flex-col ml-1 mt-1">
                        <button onClick={() => filterStatus(true)}>
                            <Active className={`${getActiveStatusFilterBtnClass()} h-4 w-4`} />
                        </button>
                        <button onClick={() => filterStatus(false)}>
                            <Inactive className={`${getInactiveStatusFilterBtnClass()} h-4 w-4`} />
                        </button>
                    </div>
                </div>
                <div className="mt-2 pl-2 font-bold truncate">
                    Patient Name
                </div>
                <div className="mt-2 pl-2 font-bold truncate">
                    Primary Complaint
                </div>
                <div className="mt-2 pl-2 font-bold truncate">
                    Diagnosis
                </div>
                <div></div>
            </div>
            <div className="flex-1 overflow-auto min-h-0">
                {casesStore.paginatedCases?.cases.map((c) => {
                    return (
                        <div key={c.id} className="table-row even:bg-blue-6">
                            <div className="pt-1 pl-2 truncate">{formatDateTime(c.createdAtUtc)}</div>
                            <div className="pt-1 pl-2 truncate">{c.closedAtUtc ? "Closed" : "Active"}</div>
                            <div className="pt-1 pl-2 truncate">{c.patientCard.firstName} {c.patientCard.lastName}</div>
                            <div className="pt-1 pl-2 truncate">{c.primaryComplaint}</div>
                            <div className="pt-1 pl-2 truncate">{c.diagnosis}</div>
                            <Link className="pt-1 pl-2 truncate text-blue-400 cursor-pointer" to={"/case"}>Details</Link>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-row justify-center h-10 pt-2 font-bold">
                <button onClick={toPreviousPage} disabled={!casesStore.paginatedCases?.isPreviousPageAvailable}>
                    <ArrowLeft className="h-7 w-7" />
                </button>
                <div className="mt-2">
                    1...1
                </div>
                <button onClick={toNextPage} disabled={!casesStore.paginatedCases?.isNextPageAvailable}>
                    <ArrowRight className="h-7 w-7" />
                </button>
            </div>
        </article>

    );
}