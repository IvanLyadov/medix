import axios from "axios";
import { Params } from "react-router-dom";
import { CasesFilter } from "../models/case/cases-filter";
import { PaginatedCases } from "../models/case/paginated-cases";
import { Case, CreateCase } from "../models/case/case";
import { CaseDoctorParams } from "../models/case/case-doctor-params";
import { FullCase } from "../models/case/full-case";
import { CaseStatusChange } from "../models/case/case-status-change";
import { CaseNote } from "../models/case/case-notes";

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

export const getCase = async (caseId: string): Promise<FullCase> => {
    const { data } = await axios.get<FullCase>(`${casesUrl}/${caseId}`);
    return data;   
}

export const getPatientCases = async (patientCardId: string): Promise<Case[]> => {
    console.log(patientCardId)
    const { data } = await axios.get<Case[]>(`${casesUrl}/patient/${patientCardId}`);
    return data;   
}

export const createCase = async (caseData: CreateCase): Promise<any> => {
    const { data } = await axios.post(casesUrl, caseData);
    return data;
}

export const addCaseDoctor = async (caseDoctorParams: CaseDoctorParams): Promise<any> => {
    const { data } = await axios.put(`${casesUrl}/add-doctor`, caseDoctorParams);
    return data;
}

export const removeCaseDoctor = async (caseDoctorParams: CaseDoctorParams): Promise<any> => {
    const { data } = await axios.put(`${casesUrl}/remove-doctor`, caseDoctorParams);
    return data;
}

export const closeCase = async (params: CaseStatusChange): Promise<any> => {
    const { data } = await axios.put(`${casesUrl}/change-status`, params);
    return data;
}

export const caseNoteEdit = async (params: CaseNote): Promise<any> => {
    const { data } = await axios.put(`${casesUrl}/edit`, params);
    return data;
}
