import { useCallback, useEffect, useState } from "react";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { casesState } from "../../store/casesState";
import { Link, useParams } from "react-router-dom";
import { Case } from "../../models/case/case";
import moment from "moment";
import { SelectDoctorModal } from "../UI/select-doctor-modal";
import { FullCase } from "../../models/case/full-case";
import { getCase } from "../../services/cases.service";
import { useStore } from "zustand";
import { sessionState } from "../../store/appState";

export const CaseDetail = () => {
    const sessionStore = useStore(sessionState);
    const { caseId } = useParams();
    const [patientCase, setPatientCase] = useState<FullCase | null>(null);

    const fetchCase = useCallback(async() => {
        if (caseId){
            const fullCase = await getCase(caseId);
            setPatientCase(fullCase)
        }
    }, []);

    useEffect(() => {
        sessionStore.loggedInUser && fetchCase();
    }, [])

    const goBack = () => {
        window.history.back();
    }

    return (
        <article className="flex flex-col h-full p-5">
            <div className="w-[100%] bg-blue-5 py-2 mb-5 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">Case Details</span>
            </div>
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
                        <Plus className="fill-green-1 h-5 w-5 cursor-pointer" />
                    </span>
                    <span>{patientCase?.diagnosis}</span>
                </div>
            </div>

            <div className="mb-5">
                <span className="flex flex-row">
                    <span className="font-bold">Notes:</span>
                    <Plus className="fill-green-1 h-5 w-5 cursor-pointer" />
                </span>
                <p>
                    {patientCase?.notes}
                </p>
            </div>

            <div>
                <span className="font-bold">Doctors:</span>
                <span className="font-bold">
                    <SelectDoctorModal caseId={caseId!}/>
                </span>
                <div className="grid grid-cols-3 gap-4 mb-5">
                    {patientCase && patientCase.doctors.map(d => {
                        return <div className="font-bold bg-[#eee] p-1 mb-1">{d.firstName} {d.lastName} {d.jobTitle}</div>
                    })}
                </div>
            </div>

            <div>
                <div className="grid grid-cols-4 gap-4 mb-5">
                    <Link to={"appointments"}>
                        <div className="font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5 p-1 mb-1 cursor-pointer">Appointments</div>
                    </Link>
                    <div className="font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5 p-1 mb-1 cursor-pointer">Case Discusstion</div>
                    <div className="font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5 p-1 mb-1 cursor-pointer">Attachments</div>
                    <div className="font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5 p-1 mb-1 cursor-pointer">Case Logs</div>
                </div>
            </div>

        </article>

    );
}