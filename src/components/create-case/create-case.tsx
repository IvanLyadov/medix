import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from "react-router-dom";

export const CreateCase = () => {
    const [primaryComplaint, setPrimaryComplaint] = useState('');
    const [error, setError] = useState<string | null>('');

    const { patientCardId } = useParams();

    const handleSubmit = () => {
        if (!primaryComplaint) {
            setError('Primary Complaint field is required');
            return;
        }

        const formData = {
            primaryComplaint,
            patientCardId,
        }
        console.log('submit data', formData);
    }

    const changeHandler = (value: string) => {
        if (!primaryComplaint) {
            setError('Primary Complaint field is required');
        }

        setError(null);
        setPrimaryComplaint(value);
    }


    return (
        <article className="flex flex-col h-full p-5">
            <div className="w-[100%]  bg-[#384578] text-white py-2 mb-5 flex flex-row">
                <ArrowLeft className="h-7 w-7 text-white fill-white ml-2" />
                <span className="text-center m-auto text-white font-bold">New Case</span>
            </div>
            <div className="grid grid-cols-1 gap-4 mb-5">
                <div className="w-full">
                    <label>
                        <span>Primary Complaint*</span>
                        {error && <span className="ml-2 text-red-500 text-xs">{error}</span>}
                    </label>
                    <textarea value={primaryComplaint} onChange={(event) => changeHandler(event.target.value)} name="primaryComplaint" className="w-full p-2"></textarea>
                </div>
            </div>

            <div className="">
                <button className="w-auto inline-block py-2 px-5 mb-4 bg-[#384578] text-white" onClick={() => handleSubmit()} >Save</button>
            </div>
        </article>

    );
}