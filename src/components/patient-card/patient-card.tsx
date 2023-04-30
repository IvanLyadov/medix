import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormData {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    phoneNumber: string;
    email: string;
}

export const PatientCard = () => {
    const handleDateChange = (value: any) => {

        const newFormData = { ...formData, dateOfBirth: new Date(value).toString() };
        setFormData(newFormData);
        const newErrors = validate(newFormData);
        setErrors(newErrors);

        setStartDate(new Date(value))
    }

    const [startDate, setStartDate] = useState<Date>();


    const [formData, setFormData] = useState<FormData>({
        firstName: '',
        lastName: '',
        middleName: '',
        dateOfBirth: '',
        phoneNumber: '',
        email: '',
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});

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
            console.log(formData);
            // handle form submission here
        }
    };

    return (
        <article className="flex flex-col h-full p-5">
            <div className="w-[100%]  bg-[#384578] text-white py-2 mb-5 flex flex-row">
                <ArrowLeft className="h-7 w-7 text-white fill-white ml-2" />
                <span className="text-center m-auto text-white font-bold">New Patient</span>
            </div>
            <div className="grid grid-cols- mb-5">
                <div className="max-w-[600px]">
                    <form>

                        <label>
                            <span>First Name*</span>
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
                            <span>Last Name*</span>
                            {errors.lastName && <span className="ml-2 text-red-500 text-xs">{errors.lastName}</span>}

                        </label>
                        <input
                            type="text"
                            name="lastName"
                            className="mb-4 w-full pl-1 py-1"
                            value={formData.lastName}
                            onChange={handleChange}
                        />

                        <label>Middle Name</label>
                        <input
                            type="text"
                            name="middleName"
                            className="mb-4 w-full pl-1 py-1"
                            value={formData.middleName}
                            onChange={handleChange}
                        />

                        <label>
                            <span>Date of birth*</span>
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
                            <span>Phone number*</span>
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
                            <span>Email*</span>
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
                <button className="w-auto inline-block py-2 px-5 mb-4 bg-[#384578] text-white" onClick={handleSubmit} >Save</button>
            </div>
        </article>

    );
}