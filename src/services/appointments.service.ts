import axios from "axios";
import { RowAppointment } from "../models/appointment/row-appointment";
import { CalendarAppointment } from "../models/appointment/calendar-appointment";
import { AddAppointmentParams } from "../models/appointment/add-appointment-params";

const appointmentsUrl = `${process.env.REACT_APP_API_URL}/api/appointments`;

export const getRowAppointments = async (caseId: string): Promise<RowAppointment[]> => {
    const { data } = await axios.get<RowAppointment[]>(`${appointmentsUrl}/case/${caseId}`);
    return data;
}

export const getCalendarAppointments = async (doctorId: string): Promise<CalendarAppointment[]> => {
    const { data } = await axios.get<CalendarAppointment[]>(`${appointmentsUrl}/doctor/${doctorId}`);
    return data;
}

export const addAppointment = async (addAppointmentParams: AddAppointmentParams): Promise<any> => {
    const { data } = await axios.post(appointmentsUrl, addAppointmentParams);
    return data;
}

export const removeAppointment = async (appointmentId: string): Promise<any> => {
    const { data } = await axios.delete(`${appointmentsUrl}/${appointmentId}`);
    return data;
}
