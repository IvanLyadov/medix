import { useCallback, useEffect, useState } from "react";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { ReactComponent as Pencil } from "../../assets/icons/pencil-outline.svg";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { SelectDoctorModal, SelectDoctorModalType } from "../UI/select-doctor-modal";
import { FullCase } from "../../models/case/full-case";
import { caseNoteEdit, closeCase, getCase, removeCaseDoctor } from "../../services/cases.service";
import { useStore } from "zustand";
import { sessionState } from "../../store/appState";
import { NodeModal } from "../UI/text-modal";
import { UserRole } from "../../models/user/user-role";

export const CaseDetail = () => {
    const sessionStore = useStore(sessionState);
    const { caseId } = useParams();
    const [patientCase, setPatientCase] = useState<FullCase>();

    const canManageCase = sessionStore.loggedInUser?.role === UserRole.Administrator
        || sessionStore.loggedInUser?.role === UserRole.SuperUser;

    const canEditCase = sessionStore.loggedInUser?.role === UserRole.Doctor
        || sessionStore.loggedInUser?.role === UserRole.SuperUser;

    const canViewDetails = sessionStore.loggedInUser?.role === UserRole.Doctor
        || sessionStore.loggedInUser?.role === UserRole.SuperUser;

    const fetchCase = useCallback(async () => {
        if (caseId) {
            const fullCase = await getCase(caseId);
            setPatientCase(fullCase)
        }
    }, []);

    useEffect(() => {
        sessionStore.loggedInUser && fetchCase();
    }, [sessionStore.loggedInUser])

    const goBack = () => {
        window.history.back();
    }

    const changeStatus = async () => {
        const patientCaseId = patientCase?.id;
        const patientCaseStatus = patientCase?.closedAtUtc !== null;

        if (patientCaseId) {
            await closeCase({ caseId: patientCaseId, isActive: patientCaseStatus }).then(() => {
                fetchCase();
            });
        }
    }

    const removeDoctor = async (doctorId: string) => {
        const patientCaseId = patientCase?.id;
        if (patientCaseId) {
            await removeCaseDoctor({ caseId: patientCaseId, doctorId: doctorId }).then(() => {
                fetchCase();
            });
        }
    }

    const addNote = async (note: string) => {
        const patientCaseId = patientCase?.id;
        if (patientCaseId) {
            await caseNoteEdit({ caseId: patientCaseId, notes: note }).then(() => {
                fetchCase();
            });
        }
    }

    const editDiagnosis = async (diagnosis: string) => {
        const patientCaseId = patientCase?.id;
        if (patientCaseId) {
            await caseNoteEdit({ caseId: patientCaseId, diagnosis: diagnosis }).then(() => {
                fetchCase();
            });
        }
    }


    return (
        <article className="flex flex-col h-full p-3">
            <div className="w-[100%] bg-blue-5 py-2 mb-5 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">Case Details</span>
            </div>
            <div className="flex-1 overflow-auto min-h-0">
                <div className="grid grid-cols-3 gap-4 mb-5">
                    <div className="flex flex-col">
                        <span className="font-bold">Patient:</span>
                        <span className="">
                            {`${patientCase?.patientCard.firstName} ${patientCase?.patientCard.lastName}`}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold">Date of opening:</span>
                        <span className="text-[#3030ba] font-bold text-xs">
                            {moment.utc(patientCase?.createdAtUtc).format('MM/DD/YYYY')}
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold">Case Status:</span>
                        <span>{patientCase?.closedAtUtc ? "Closed" : "Active"}</span>
                        {canManageCase && <div>
                            {!patientCase?.closedAtUtc ? (
                                <button onClick={changeStatus} className="flex flex-row items-center w-32 justify-center font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5  mb-1 cursor-pointer">
                                    <span>Close Case</span>
                                    <Close className="fill-red-400 w-[20px]" />
                                </button>
                            ) :
                                (
                                    <button onClick={changeStatus} className="flex flex-row items-center w-32 justify-center font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5  mb-1 cursor-pointer">
                                        <span>Open Case</span>
                                    </button>
                                )
                            }
                        </div>}
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-5">
                    <div className="flex flex-col">
                        <span className="font-bold">Primary Complaint:</span>
                        <span>{patientCase?.primaryComplaint}</span>
                    </div>
                    <div className="flex flex-col">
                        <span className="flex flex-row">
                            <span className="font-bold">Diagnosis:</span>
                            {canEditCase && <NodeModal
                                onConfirm={editDiagnosis}
                                title="Edit Diagnosis"
                                initialText={patientCase?.diagnosis}
                                icon={<Pencil className="w-[18px] h-[18px] ml-1 fill-green-1 h-5 w-5 cursor-pointer fill-red-400" />}
                            />}

                        </span>
                        <span>{patientCase?.diagnosis}</span>
                    </div>
                </div>

                <div className="mb-5">
                    <span className="flex flex-row">
                        <span className="font-bold">Notes:</span>
                        {canEditCase && <NodeModal onConfirm={addNote} title="Add note" />}
                    </span>
                    <p className="whitespace-pre-wrap">
                        {patientCase?.notes}
                    </p>
                </div>

                <div>
                    <span className="font-bold">Doctors:</span>
                    {canManageCase && <span className="font-bold">
                        <SelectDoctorModal caseId={caseId!} onConfirm={() => fetchCase()} modalType={SelectDoctorModalType.AddDoctor} />
                    </span>}
                    <div className="grid grid-cols-3 gap-4 mb-5">
                        {patientCase && patientCase.doctors.map(d => {
                            return <div key={d.id} className="font-bold bg-[#eee] p-1 mb-1 flex flex-row items-center justify-between rounded-sm">
                                <span> {d.firstName} {d.lastName} {d.jobTitle}</span>

                                {canManageCase && <button onClick={() => removeDoctor(d.id)} className="ml-auto">
                                    <Trash className="w-[20px] h-[20px] fill-red-400" />
                                </button>}
                            </div>
                        })}
                    </div>
                </div>

            </div>

            <div>
                <div className="grid grid-cols-4 gap-4">
                    <Link to={`appointments/${patientCase?.patientCard.id}/${!patientCase?.closedAtUtc}`}>
                        <div className="font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5 p-1 mb-1 cursor-pointer">Appointments</div>
                    </Link>
                    {canViewDetails && <Link to={`chat/${!patientCase?.closedAtUtc}`}>
                        <div className="font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5 p-1 mb-1 cursor-pointer">Case Discusstion</div>
                    </Link>}
                    {canViewDetails && <div className="font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5 p-1 mb-1 cursor-pointer">Attachments</div>}
                    {canViewDetails && <div className="font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5 p-1 mb-1 cursor-pointer">Case Logs</div>}
                </div>
            </div>

        </article>

    );
}