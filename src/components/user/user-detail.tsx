import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useParams } from "react-router-dom";
import { ReactComponent as Pencil } from "../../assets/icons/pencil-outline.svg";
import { getUser } from "../../services/users.service";
import { User } from "../../models/user/user";

export const UserDetails = () => {
    const { userId } = useParams();
    const [error, setError] = useState('');
    const [patientDetail, setPatientDetail] = useState<User | null>(null);

    const goBack = () => {
        window.history.back();
    }

    useEffect(() => {
        if (userId) {
            getUser(userId).then((response) => {
                setPatientDetail(response);
            });
        }

        if (!userId) {
            setError('No user provided')
        }

    }, [])

    return (
        <article className="flex flex-col h-full p-3">
            <div className="w-[100%] bg-blue-5 py-2 mb-5 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">User Details</span>
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
                    <div className="flex flex-col mb-3">
                        <span className="font-bold">Role:</span>
                        <span >{patientDetail?.role}</span>
                    </div>
                </div>

                <div className="">
                    <div className="flex flex-col mb-3">
                        <span className="font-bold">Last Name:</span>
                        <span >{patientDetail?.lastName}</span>
                    </div>

                    <div className="flex flex-col mb-3">
                        <span className="font-bold">Email:</span>
                        <span >{patientDetail?.email}</span>
                    </div>

                    <div className="flex flex-col mb-3">
                        <span className="font-bold">Job Title:</span>
                        <span >{patientDetail?.jobTitle}</span>
                    </div>
                </div>

                <div className="flex flex-col mb-3">
                    <Link to={`/users/edit/${patientDetail?.id}`} className="flex flex-row items-center justify-center font-bold text-center border-2 rounded-md bg-blue-4 py-2 hover:bg-blue-5  mb-1 cursor-pointer">
                        <span> Edit</span>
                        <Pencil className="w-[18px] h-[18px] ml-1 fill-green-1 h-5 w-5 cursor-pointer fill-red-400" />
                    </Link>
                </div>

            </div>
            </div>
        </article>
    );
}