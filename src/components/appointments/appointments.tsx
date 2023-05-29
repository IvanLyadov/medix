import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { RowAppointment } from "../../models/appointment/row-appointment";
import { getRowAppointments, removeAppointment } from "../../services/appointments.service";
import { dateComparer, formatDateTime } from "../../utils/date.util";
import { useStore } from "zustand";
import { sessionState } from "../../store/appState";
import { SelectDoctorModal, SelectDoctorModalType } from "../UI/select-doctor-modal";
import { UserRole } from "../../models/user/user-role";
import "./appointments.css";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { ConfirmModal } from "../UI/confirm-modal";

export const Appointments = () => {
    const sessionStore = useStore(sessionState);
    const { caseId, patientCardId, isActive } = useParams();
    const [caseAppointments, setAppointments] = useState<RowAppointment[]>();

    const [openModal, setOpenModal] = useState(false);
    const [appointmentToRemove, setAppointmentToRemove] = useState<string | null>(null);

    const canManageAppointment = isActive === "true" && (sessionStore.loggedInUser?.role === UserRole.Administrator
        || sessionStore.loggedInUser?.role === UserRole.SuperUser);

    const fetchAppointments = useCallback(async () => {
        if (caseId) {
            const appointments = await getRowAppointments(caseId);
            setAppointments(appointments);
        }
    }, [caseId]);

    useEffect(() => {
        if (sessionStore.loggedInUser) {
            fetchAppointments();
        }
    }, [sessionStore.loggedInUser]);

    const handleRemoveAppointment = async (id: string) => {
        await removeAppointment(id);
        fetchAppointments();
    };

    const goBack = () => {
        window.history.back();
    }

    const deleteAppointment = (appointmentID: string) => {
        setAppointmentToRemove(appointmentID);
        setOpenModal(true);
    }

    const confirmDeleteAppointment = () => {
        if (appointmentToRemove) {
            handleRemoveAppointment(appointmentToRemove);
        }
    }

    return (
        <article className="flex flex-col h-full p-3">
            <div className="w-[100%] bg-blue-5 py-2 mb-2 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">Appointments</span>
                {canManageAppointment && isActive === "true" && <div className="mr-2">
                    <SelectDoctorModal caseId={caseId!} patientCardId={patientCardId} modalType={SelectDoctorModalType.AddAppointment} />
                </div>}
            </div>
            <div className="appointment-table-header bg-blue-5">
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        Doctor
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        Job Title
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        From
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        To
                    </div>
                </div>
                <div className="mt-2 pl-2 font-bold truncate">
                    Description
                </div>
                <div></div>
            </div>
            <div className="flex-1 overflow-auto min-h-0">
                {caseAppointments && caseAppointments?.map(a => {
                    return <div key={a.id} className="appointment-table-row even:bg-blue-6">
                        <div className="pt-1 pl-2 truncate">{a.doctor.firstName} {a.doctor.lastName}</div>
                        <div className="pt-1 pl-2 truncate">{a.doctor.jobTitle}</div>
                        <div className="pt-1 pl-2 truncate">{formatDateTime(a.fromUtc)}</div>
                        <div className="pt-1 pl-2 truncate">{formatDateTime(a.toUtc)}</div>
                        <div className="pt-1 pl-2 truncate">{a.description}</div>
                        <div>
                            {canManageAppointment && dateComparer(formatDateTime(a.fromUtc)) &&
                            <Trash onClick={() => deleteAppointment(a.id)}
                            className="w-[20px] h-[20px] mt-2 fill-red-400 cursor-pointer" />}
                        </div>
                    </div>
                })}
            </div>

            {openModal && 
                <ConfirmModal 
                    confirm={confirmDeleteAppointment}
                    cancel={() => setOpenModal(false)} 
                    close={() => setOpenModal(false)}
                    title="Are you sure you want to remove Appointment?"
                />
            }
        </article>
    );
}
