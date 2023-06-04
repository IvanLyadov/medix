import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useStore } from "zustand";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { Case } from "../../models/case/case";
import { PatientCard } from "../../models/patient-card/patient-card";
import { getPatientCases } from "../../services/cases.service";
import { getPatientCardDetail } from "../../services/patient-cards.service";
import { sessionState } from "../../store/appState";
import { formatDateTime } from "../../utils/date.util";
import "./cases-history.css";

export const CasesHistory = () => {
    const sessionStore = useStore(sessionState);
    const { patientCardId } = useParams();
    const [cases, setCases] = useState<Case[]>();
    const [patientCard, setPatientCard] = useState<PatientCard>();

    const fetchCases = useCallback(async () => {
        if (patientCardId) {
            const cases = await getPatientCases(patientCardId);
            setCases(cases);
        }
    }, [patientCardId]);

    useEffect(() => {
        if (sessionStore.loggedInUser) {
            fetchCases();
        }
    }, [sessionStore.loggedInUser]);

    useEffect(() => {
        if (patientCardId) {
            getPatientCardDetail(patientCardId).then((response) => {
                setPatientCard(response);
            });
        }
    }, [])

    const goBack = () => {
        window.history.back();
    }

    return(
        <article className="flex flex-col h-full p-3">
            <div className="w-[100%] bg-blue-5 py-2 mb-2 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">{patientCard?.firstName} {patientCard?.lastName} Cases History</span>
            </div>

            <div className="chistory-table-header bg-blue-5">
                <div className="flex flex-row pl-2">
                    <div className="inline-block pt-2 font-bold truncate">
                        Created Date
                    </div>
                </div>
                <div className="flex flex-row pl-2">
                    <div className="inline-block pt-2 font-bold truncate">
                        Status
                    </div>
                </div>
                <div className="mt-2 pl-2 font-bold truncate">
                    Primary Complaint
                </div>
                <div className="mt-2 pl-2 font-bold truncate">
                    Diagnosis
                </div>
                <div></div>
            </div>
            <div className="flex-1 overflow-auto min-h-0">
                {cases && cases.map((c) => {
                    return (
                        <div key={c.id} className="chistory-table-row even:bg-blue-6">
                            <div className="pt-1 pl-2 truncate">{formatDateTime(c.createdAtUtc)}</div>
                            <div className="pt-1 pl-2 truncate">{c.closedAtUtc ? "Closed" : "Active"}</div>
                            <div className="pt-1 pl-2 truncate">{c.primaryComplaint}</div>
                            <div className="pt-1 pl-2 truncate">{c.diagnosis}</div>
                            <Link className="pt-1 pl-2 truncate text-blue-400 cursor-pointer" to={`/cases/${c.id}`}>Details</Link>
                        </div>
                    )
                })}
            </div>
        </article>
    )
}