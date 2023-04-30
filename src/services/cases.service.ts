import axios from "axios";
import http from "axios";
import { Params } from "react-router-dom";
import { CasesFilter } from "../models/case/cases-filter";
import { FullCase } from "../models/case/full-case";
import { PaginatedCases } from "../models/case/paginated-cases";
import { PatientCardInfo } from "../models/patient-card/patient-card";
import { CreateCase } from "../models/case/case";

export const setTokenForHttpClient = (token: string) => {
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
  };

const casesUrl = `${process.env.REACT_APP_API_URL}/api/cases`;
const patientCards = `${process.env.REACT_APP_API_URL}/api/patient-cards`;
const newCase = `${process.env.REACT_APP_API_URL}/api/patient-case`;

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

export const createPatientCard = async (patientCardData: PatientCardInfo): Promise<any> => {
    const { data } = await axios.post(patientCards, patientCardData);
    return data;
}

export const createCase = async (caseData: CreateCase): Promise<any> => {
    const { data } = await axios.post(newCase, caseData);
    return data;
}