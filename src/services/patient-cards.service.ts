import axios from "axios";
import { PatientCardInfo } from "../models/patient-card/patient-card";

const patientCardsUrl = `${process.env.REACT_APP_API_URL}/api/patient-cards`;

export const createPatientCard = async (patientCardData: PatientCardInfo): Promise<any> => {
    console.log(patientCardData)
    const { data } = await axios.post(patientCardsUrl, patientCardData);
    return data;
}