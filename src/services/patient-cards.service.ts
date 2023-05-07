import axios from "axios";
import { Params } from "react-router-dom";
import { PaginatedPatientCards } from "../models/patient-card/paginated-patient-cards";
import { PatientCard, PatientCardInfo } from "../models/patient-card/patient-card";
import { PatientCardsFilter } from "../models/patient-card/patient-cards-filter";

const patientCardsUrl = `${process.env.REACT_APP_API_URL}/api/patient-cards`;

export const getPatientCards = async (patientCardsFilter: PatientCardsFilter): Promise<PaginatedPatientCards> => {
    let params: Params = {
        limit: patientCardsFilter.limit.toString(),
        offset: patientCardsFilter.offset.toString(),
        sortColumn: patientCardsFilter.patientCardsSortState.column,
        sortOrder: patientCardsFilter.patientCardsSortState.sortOrder
    };

    if (patientCardsFilter.doctorId != null) {
        params = {...params, isActive: patientCardsFilter.doctorId.toString()}
    }

    if (patientCardsFilter.search != null) {
    params = {...params, search: patientCardsFilter.search}
    }

    const { data } = await axios.get<PaginatedPatientCards>(patientCardsUrl, {params: params});
    return data;
}

export const createPatientCard = async (patientCardData: PatientCardInfo): Promise<any> => {
    const { data } = await axios.post(patientCardsUrl, patientCardData);
    return data;
}

export const getPatientCardDetail = async (patientId: string): Promise<PatientCard> => {
    const { data } = await axios.get(`${patientCardsUrl}/${patientId}`);
    return data;
}