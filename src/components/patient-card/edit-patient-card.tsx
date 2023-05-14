import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createPatientCard, getPatientCardDetail } from "../../services/patient-cards.service";
import { useParams } from "react-router-dom";

interface FormData {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
}

export const EditPatientCard = () => {
    const { patientId } = useParams();


    const handleDateChange = (value: any) => {

        const newFormData = { ...formData, dateOfBirth: new Date(value).toISOString() };
        setFormData(newFormData);
        const newErrors = validate(newFormData);
        setErrors(newErrors);

        setStartDate(new Date(value))
    }

    const [startDate, setStartDate] = useState<Date>();

    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        middleName: undefined,
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});

    useEffect(() => {
        if (patientId) {
            getPatientCardDetail(patientId).then((response) => {
                setStartDate(new Date(response.dateOfBirth))
                setFormData(response);
            });
        }

    }, [])

    const validate = (values: FormData) => {
        const errors: Partial<FormData> = {};

        if (!values.firstName) {
            errors.firstName = 'First Name is required';
        }

        if (!values.lastName) {
            errors.lastName = 'Last Name is required';
        }

        if (!values.dateOfBirth) {
            errors.dateOfBirth = 'Date of birth is required';
        }

        if (!values.phoneNumber) {
            errors.phoneNumber = 'Phone number is required';
        }

        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email is invalid';
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
            createPatientCard(formData);
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
                <span className="text-center text-xl m-auto font-bold">Edit Patient</span>
            </div>
            <div className="grid grid-cols- mb-5">
                <div className="max-w-[600px]">
                    <form>

                        <label>
                            <span className="font-bold">First Name*</span>
                            {errors.firstName && <span className="ml-2 text-red-500 text-xs">{errors.firstName}</span>}

                        </label>
                        <input
                            type="text"
                            name="firstName"
                            className="mb-4 w-full pl-1 py-1"
                            value={formData.firstName}
                            onChange={handleChange}
                        />

                        <label>
                            <span className="font-bold">Last Name*</span>
                            {errors.lastName && <span className="ml-2 text-red-500 text-xs">{errors.lastName}</span>}

                        </label>
                        <input
                            type="text"
                            name="lastName"
                            className="mb-4 w-full pl-1 py-1"
                            value={formData.lastName}
                            onChange={handleChange}
                        />

                        <label className="font-bold">Middle Name</label>
                        <input
                            type="text"
                            name="middleName"
                            className="mb-4 w-full pl-1 py-1"
                            value={formData.middleName}
                            onChange={handleChange}
                        />

                        <label>
                            <span className="font-bold">Date of birth*</span>
                            {errors.dateOfBirth && <span className="ml-2 text-red-500 text-xs">{errors.dateOfBirth}</span>}

                        </label>
                        <DatePicker
                            selected={startDate}
                            onChange={handleDateChange}
                            dateFormat="dd-MM-yyyy" name="dateOfBirth"
                            scrollableYearDropdown
                            showYearDropdown
                            className="mb-4 w-full pl-1 py-1"
                            showMonthDropdown
                        />


                        <label>
                            <span className="font-bold">Phone number*</span>
                            {errors.phoneNumber && <span className="ml-2 text-red-500 text-xs">{errors.phoneNumber}</span>}

                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            className="mb-4 w-full pl-1 py-1"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />

                        <label>
                            <span className="font-bold">Email*</span>
                            {errors.email && <span className="ml-2 text-red-500 text-xs">{errors.email}</span>}

                        </label>
                        <input
                            type="text"
                            name="email"
                            className="mb-4 w-full pl-1 py-1"
                            value={formData.email}
                            onChange={handleChange}
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