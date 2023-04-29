import axios from "axios";
import http from "axios";
import { Params } from "react-router-dom";
import { CasesFilter } from "../models/case/cases-filter";
import { FullCase } from "../models/case/full-case";
import { PaginatedCases } from "../models/case/paginated-cases";

export const setTokenForHttpClient = (token: string) => {
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

const casesUrl = `${process.env.REACT_APP_API_URL}/api/cases`;

export const getCases = async (casesFilter: CasesFilter): Promise<PaginatedCases> => {
    let params: Params = {
        limit: casesFilter.limit.toString(),
        offset: casesFilter.offset.toString(),
        sortColumn: casesFilter.casesSortState.column,
        sortOrder: casesFilter.casesSortState.sortOrder
    };

    if (casesFilter.isActive != null) {
        params = {... params, isActive: casesFilter.isActive.toString()}
    }

    if (casesFilter.search != null) {
    params = {... params, search: casesFilter.search}
    }

    const { data } = await axios.get<PaginatedCases>(casesUrl, {params: params});
    return data;
}

// export const getCase = (caseId: string): FullCase => {
        
// }