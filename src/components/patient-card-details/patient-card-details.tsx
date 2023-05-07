import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { getPatientCardDetail } from "../../services/patient-cards.service";
import { useParams } from "react-router-dom";
import { PatientCard } from "../../models/patient-card/patient-card";
import moment from "moment";

export const PatientCardDetails = () => {
    const { patientCardId } = useParams();
    const [error, setError] = useState('');
    const [patientDetail, setPatientDetail] = useState<PatientCard | null>(null);

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
        <article className="flex flex-col h-full p-5">
            <div className="w-[100%] bg-blue-5 py-2 mb-5 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">Patient Card Details</span>
            </div>
            {error && (<div>{error}</div>)}

            <div className="grid grid-cols-2 mb-5">
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

            </div>


        </article>

    );
}