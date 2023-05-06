import axios from "axios";
import { Params } from "react-router-dom";
import { CasesFilter } from "../models/case/cases-filter";
import { PaginatedCases } from "../models/case/paginated-cases";
import { CreateCase } from "../models/case/case";

const casesUrl = `${process.env.REACT_APP_API_URL}/api/cases`;

export const getCases = async (casesFilter: CasesFilter): Promise<PaginatedCases> => {
    let params: Params = {
        limit: casesFilter.limit.toString(),
        offset: casesFilter.offset.toString(),
        sortColumn: casesFilter.casesSortState.column,
        sortOrder: casesFilter.casesSortState.sortOrder
    };

    if (casesFilter.isActive != null) {
        params = {...params, isActive: casesFilter.isActive.toString()}
    }

    if (casesFilter.search != null) {
    params = {...params, search: casesFilter.search}
    }

    const { data } = await axios.get<PaginatedCases>(casesUrl, {params: params});
    return data;
}

// export const getCase = (caseId: string): FullCase => {
        
// }

export const createCase = async (caseData: CreateCase): Promise<any> => {
    const { data } = await axios.post(casesUrl, caseData);
    return data;
}