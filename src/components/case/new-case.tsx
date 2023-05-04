import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";
import { createCase } from "../../services/cases.service";

export const NewCase = () => {
    const [primaryComplaint, setPrimaryComplaint] = useState('');
    const [error, setError] = useState<string | null>('');

    const { patientCardId } = useParams();

    const handleSubmit = () => {
        if (!primaryComplaint) {
            setError('Primary Complaint field is required');
            return;
        }

        if (patientCardId) {
            const formData = {
                primaryComplaint,
                patientCardId,
            }
            createCase(formData);
            goBack();
        }
    }

    const changeHandler = (value: string) => {
        if (!primaryComplaint) {
            setError('Primary Complaint field is required');
        }

        setError(null);
        setPrimaryComplaint(value);
    }

    const goBack = () => {
        window.history.back();
    }

    return (
        <article className="flex flex-col h-full p-5">
            <div className="w-[100%] bg-blue-5 py-2 mb-5 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">New Case</span>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-5">
                <div className="w-full">
                    <label>
                        <span className="font-bold">Primary Complaint*</span>
                        {error && <span className="ml-2 text-red-500 text-xs">{error}</span>}
                    </label>
                    <textarea value={primaryComplaint} onChange={(event) => changeHandler(event.target.value)} name="primaryComplaint" className="w-full p-2"></textarea>
                </div>
            </div>

            <div className="">
                <button className="w-auto inline-block py-2 px-5 mb-4 font-bold border-2 rounded-md bg-blue-4 hover:bg-blue-5" onClick={() => handleSubmit()} >Save</button>
            </div>
        </article>

    );
}