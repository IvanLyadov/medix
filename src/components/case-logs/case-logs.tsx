import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { formatDateTime } from "../../utils/date.util";
import { useStore } from "zustand";
import { sessionState } from "../../store/appState";
import "./case-logs.css";
import { CaseLog } from "../../models/case-log/case-log";
import { getCaseLogs } from "../../services/case-logs.service";

export const CaseLogs = () => {
    const sessionStore = useStore(sessionState);
    const { caseId } = useParams();
    const [caseLogs, setCaseLogs] = useState<CaseLog[]>();

    const fetchCaseLogs = useCallback(async () => {
        if (caseId) {
            const caseLogs = await getCaseLogs(caseId);
            setCaseLogs(caseLogs);
        }
    }, [caseId]);

    useEffect(() => {
        if (sessionStore.loggedInUser) {
            fetchCaseLogs();
        }
    }, [sessionStore.loggedInUser]);

    const goBack = () => {
        window.history.back();
    }

    return (
        <article className="flex flex-col h-full p-3">
            <div className="w-[100%] bg-blue-5 py-2 mb-2 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">Case Logs</span>
            </div>
            <div className="case-logs-table-header bg-blue-5">
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        Date
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        User
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                    Job Title
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        Description
                    </div>
                </div>
            </div>
            <div className="flex-1 overflow-auto min-h-0">
                {caseLogs && caseLogs?.map(l => {
                    return <div key={l.id} className="case-logs-table-row even:bg-blue-6">
                        <div className="pt-1 pl-2 truncate">{formatDateTime(l.createdAtUtc)}</div>
                        <div className="pt-1 pl-2 truncate">{l.user ? l.user.firstName : "System"} {l.user ? l.user.lastName : "Message"}</div>
                        <div className="pt-1 pl-2 truncate">{l.user ? l.user.jobTitle : "System"}</div>
                        <div className="pt-1 pl-2 truncate">{l.description}</div>
                    </div>
                })}
            </div>
        </article>
    );
}
