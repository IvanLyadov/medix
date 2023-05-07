import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { RowAppointment } from "../../models/appointment/row-appointment";
import { getRowAppointments } from "../../services/appointments.service";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { formatDateTime } from "../../utils/date.util";
import { useStore } from "zustand";
import { sessionState } from "../../store/appState";

export const Appointments = () => {
    const sessionStore = useStore(sessionState);
    const { caseId } = useParams();
    const [caseAppointments, setAppointments] = useState<RowAppointment[]>();

    const fetchAppointments = useCallback(async () => {
        if (caseId) {
            const appointments = await getRowAppointments(caseId);
            setAppointments(appointments);
        }
    }, [caseId]);

    useEffect(() => {
        if (sessionStore.loggedInUser){
            fetchAppointments();
        }
    }, [sessionStore.loggedInUser]);

    const goBack = () => {
        window.history.back();
    }

    return (
        <article className="flex flex-col h-full p-5">
            <div className="w-[100%] bg-blue-5 py-2 mb-5 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">Appointments</span>
                <div className="mr-2">
                    <button className="flex flex-row border-2 pl-2 pr-4 pt-1.5 pb-1.5 font-bold rounded-md bg-blue-4 hover:bg-blue-5">
                        <Plus className="fill-green-1 h-5 w-5" />
                        New Appointment
                    </button>
                </div>
            </div>
            <div className="flex flex-col">
                {caseAppointments && caseAppointments?.map(a => {
                    return <div key={a.id} className="flex flex-row">
                        <div>{a.doctor.firstName} {a.doctor.lastName}</div>
                        <div>{a.doctor.jobTitle} {a.doctor.jobTitle}</div>
                        <div>{formatDateTime(a.fromUtc)}</div>
                        <div>{formatDateTime(a.toUtc)}</div>
                        <div>{a.description}</div>
                    </div>
                })}
            </div>
        </article>
    );
}