import axios from "axios";
import { CaseLog } from "../models/case-log/case-log";

const caseLogsUrl = `${process.env.REACT_APP_API_URL}/api/case-logs`;

export const getCaseLogs = async (caseId: string): Promise<CaseLog[]> => {
    const { data } = await axios.get<CaseLog[]>(`${caseLogsUrl}/${caseId}`);
    return data;
}
