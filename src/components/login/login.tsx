import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";

interface FormData {
    email: string;
    password: string;
}

export const Login = () => {

    const [formData, setFormData] = useState<FormData>({
        password: '',
        email: '',
    });

    const [errors, setErrors] = useState<Partial<FormData>>({});

    const validate = (values: FormData) => {
        const errors: Partial<FormData> = {};

        if (!values.email) {
            errors.email = 'Email field is required';
        }

        if (!values.password) {
            errors.password = 'Password field is required';
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
            //TODO to implement api request
        }
    };

    return (
        <div className="flex flex-col h-full p-5">
            <div className="grid grid-cols-1 gap-4 mb-5 mt-auto mb-auto mx-auto border-2 border-[#92b1f7] rounded-lg p-5 w-full max-w-[420px]">
                <div className="w-full">
                    <label>
                        <span className="font-bold">Email</span>
                        {errors.email && <span className="ml-2 text-red-500 text-xs">{errors.email}</span>}

                    </label>
                    <input
                        type="text"
                        name="email"
                        className="mb-4 w-full pl-1 py-1"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <label>
                        <span className="font-bold">Password</span>
                        {errors.password && <span className="ml-2 text-red-500 text-xs">{errors.password}</span>}

                    </label>
                    <input
                        type="password"
                        name="password"
                        className="mb-4 w-full pl-1 py-1"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="">
                    <button className="w-auto inline-block py-2 px-5 mb-4 font-bold border-2 rounded-md bg-blue-4 hover:bg-blue-5" onClick={() => handleSubmit()} >Login</button>
                </div>
            </div>


        </div>

    );
}