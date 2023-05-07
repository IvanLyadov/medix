import { User } from "../user/user";

export interface RowAppointment {
    id: string;
    caseId: string;
    patientCardId: string;
    doctor: User;
    fromUtc: string;
    toUtc: string;
    description: string;
}
