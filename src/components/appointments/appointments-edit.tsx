import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { useCallback, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { editAppointment, getRowAppointments } from "../../services/appointments.service";
import { useParams } from "react-router-dom";
import { useStore } from "zustand";
import { sessionState } from "../../store/appState";
import { RowAppointment } from "../../models/appointment/row-appointment";

interface FormData {
    description: string;
    fromUtc: Date;
    toUtc: Date;
}

interface FormDataErrors {
    description: string;
    fromUtc: string;
    toUtc: string;
}

export const AppointmentsEdit = () => {
    const sessionStore = useStore(sessionState);
    const { caseId, appointmenID } = useParams();

    const handleDateChange = (value: any) => {
        const newFormData = { ...formData, ...value };
        setFormData(newFormData);
        const newErrors = validate(newFormData);
        setErrors(newErrors);

        setStartDate(new Date(value))
    }

    const fetchAppointments = useCallback(async () => {
        if (caseId) {
            const appointments = await getRowAppointments(caseId);
            const appointment = appointments.find(item => item.id === appointmenID);
            setFormData({
                description: appointment?.description || '',
                fromUtc: new Date(appointment?.fromUtc.toString() || ''),
                toUtc: new Date(appointment?.toUtc.toString() || ''),
            })
        }
    }, [caseId]);

    useEffect(() => {
        if (sessionStore.loggedInUser) {
            fetchAppointments();
        }
    }, [sessionStore.loggedInUser]);

    const [startDate, setStartDate] = useState<Date>();
    const [formData, setFormData] = useState<FormData>({
        description: '',
        fromUtc: new Date(),
        toUtc: new Date(),
    });

    const [errors, setErrors] = useState<Partial<FormDataErrors>>({});

    const validate = (values: FormData) => {
        const errors: Partial<FormDataErrors> = {};

        if (!values.description) {
            errors.description = 'Description is required';
        }

        if (!values.fromUtc) {
            errors.fromUtc = 'Beginning time is required';
        }

        if (!values.toUtc) {
            errors.toUtc = 'End time is required';
        }

        return errors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
        const newErrors = validate(newFormData);
        setErrors(newErrors);
    };

    const handleSubmit = () => {
        const errors = validate(formData);
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            const correctFormData = {
                id: appointmenID || '',
                description: formData.description,
                fromUtc: formData.fromUtc.toISOString(),
                toUtc: formData.toUtc.toISOString(),
            }
            editAppointment(correctFormData);
            goBack();
        }
    };

    const goBack = () => {
        window.history.back();
    }

    return (
        <article className="flex flex-col h-full p-3">
            <div className="w-[100%] bg-blue-5 py-2 mb-5 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">Edit Appointment</span>
            </div>
            <div className="grid grid-cols- mb-5">
                <div className="max-w-[600px]">
                    <form>

                        <label>
                            <span className="font-bold">Title*</span>
                            {errors.description && <span className="ml-2 text-red-500 text-xs">{errors.description}</span>}

                        </label>
                        <input
                            type="text"
                            name="description"
                            className="mb-4 w-full pl-1 py-1 rounded-md"
                            value={formData.description}
                            onChange={(value) => handleDateChange({description: value.target.value})}
                        />



                        <label>
                            <span className="font-bold">Start*</span>
                            {errors.fromUtc && <span className="ml-2 text-red-500 text-xs">{errors.fromUtc}</span>}

                        </label>
                        <DatePicker
                            selected={formData.fromUtc}
                            onChange={(value: Date) => handleDateChange({fromUtc:  new Date(value.toString() || '')})}
                            dateFormat="HH:mm" name="fromUtc"
                            showTimeSelect
                            className="mb-4 w-full pl-1 py-1 rounded-md"
                            includeDates={[new Date(formData.fromUtc || '')]}
                            showTimeInput
                        />
                        

                        <label>
                            <span className="font-bold">Start*</span>
                            {errors.toUtc && <span className="ml-2 text-red-500 text-xs">{errors.toUtc}</span>}

                        </label>
                        <DatePicker
                            selected={formData.toUtc}
                            onChange={(value: Date) => handleDateChange({toUtc:  new Date(value.toString() || '')})}
                            dateFormat="HH:mm" name="toUtc"
                            showTimeSelect
                            className="mb-4 w-full pl-1 py-1 rounded-md"
                            includeDates={[new Date(formData.toUtc)]}
                            showTimeInput
                        />

                    </form>

                </div>

            </div>

            <div className="">
                <button className="w-auto inline-block py-2 px-5 mb-4 font-bold border-2 rounded-md bg-blue-4 hover:bg-blue-5" onClick={handleSubmit} >Save</button>
            </div>
        </article>

    );
}