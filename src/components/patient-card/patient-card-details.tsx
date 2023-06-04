import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getPatientCardDetail } from "../../services/patient-cards.service";
import { Link, useParams } from "react-router-dom";
import { PatientCard } from "../../models/patient-card/patient-card";
import { ReactComponent as Pencil } from "../../assets/icons/pencil-outline.svg";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { ReactComponent as Active } from "../../assets/icons/active.svg";
import moment from "moment";
import { sessionState } from "../../store/appState";
import { useStore } from "zustand";
import { UserRole } from "../../models/user/user-role";

export const PatientCardDetails = () => {
    const { patientCardId } = useParams();
    const sessionStore = useStore(sessionState);
    const [error, setError] = useState('');
    const [patientDetail, setPatientDetail] = useState<PatientCard | null>(null);

    const canEditPatientCard = sessionStore.loggedInUser?.role === UserRole.Administrator
        || sessionStore.loggedInUser?.role === UserRole.SuperUser;

    const canAddNewCase = sessionStore.loggedInUser?.role === UserRole.Administrator
        || sessionStore.loggedInUser?.role === UserRole.SuperUser;

    const goBack = () => {
        window.history.back();
    }

    useEffect(() => {
        if (patientCardId) {
            getPatientCardDetail(patientCardId).then((response) => {
                setPatientDetail(response);
            });
        }

        if (!patientCardId) {
            setError('No patient provided')
        }

    }, [])

    return (
        <article className="flex flex-col h-full p-3">
            <div className="w-[100%] bg-blue-5 py-2 mb-5 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">Patient Card Details</span>
            </div>
            {error && (<div>{error}</div>)}
            <div className="flex-1 overflow-auto min-h-0">
                <div className="grid grid-cols-3 mb-5">
                    <div className="">
                        <div className="flex flex-col mb-3">
                            <span className="font-bold">First Name:</span>
                            <span >{patientDetail?.firstName}</span>
                        </div>
                        <div className="flex flex-col mb-3">
                            <span className="font-bold">Middle Name:</span>
                            <span >{patientDetail?.middleName}</span>
                        </div>
                        <div className="flex flex-col mb-3">
                            <span className="font-bold">Phone:</span>
                            <span >{patientDetail?.phoneNumber}</span>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex flex-col mb-3">
                            <span className="font-bold">Last Name:</span>
                            <span >{patientDetail?.lastName}</span>
                        </div>
                        <div className="flex flex-col mb-3">
                            <span className="font-bold">Date of birth:</span>
                            <span >{moment.utc(patientDetail?.dateOfBirth).format('MM/DD/YYYY')}</span>
                        </div>
                        <div className="flex flex-col mb-3">
                            <span className="font-bold">Email:</span>
                            <span >{patientDetail?.email}</span>
                        </div>
                    </div>
                    <div className="flex flex-col mb-3">
                        {canAddNewCase && <Link to={`/new-case/${patientCardId}`} className="flex flex-row items-center justify-center font-bold text-center border-2 rounded-md bg-blue-4 py-2 hover:bg-blue-5  mb-1 cursor-pointer">
                            <Plus className="fill-green-1 h-5 w-5 cursor-pointer" />
                            <span> New Case</span>
                        </Link>}
                        {canEditPatientCard && <Link to={`/patientCards/edit/${patientDetail?.id}`} className="flex flex-row items-center justify-center font-bold text-center border-2 rounded-md bg-blue-4 py-2 hover:bg-blue-5  mb-1 cursor-pointer">
                            <span> Edit Patient</span>
                            <Pencil className="w-[18px] h-[18px] ml-1 fill-green-1 h-5 w-5 cursor-pointer fill-red-400" />
                        </Link>}
                        {canEditPatientCard && <Link to={`./cases-history`} className="flex flex-row items-center justify-center font-bold text-center border-2 rounded-md bg-blue-4 py-2 hover:bg-blue-5  mb-1 cursor-pointer">
                            <span> Cases History</span>
                            <Active className="w-[18px] h-[18px] ml-1 fill-blue-2 h-5 w-5 cursor-pointer fill-red-400" />
                        </Link>}
                    </div>

                </div>
            </div>
        </article>
    );
}
