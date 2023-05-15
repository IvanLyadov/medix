import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { UserRole } from "../../models/user/user-role";
import { UserJobTitle } from "../../models/user/user-job-title";
import { editUser, getUser } from "../../services/users.service";
import { useParams } from "react-router-dom";

interface FormData {
    id: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    phoneNumber: string;
    jobTitle: UserJobTitle;
    role?: UserRole;
    email: string;
    isActive: boolean;
}

interface FormErrors extends Omit<FormData, 'jobTitle' | 'role'> {
    jobTitle: string;
    role: string;
}

export const EditUser = () => {
    const { userId } = useParams();
    const [formData, setFormData] = useState<FormData>({
        id: '',
        firstName: '',
        lastName: '',
        middleName: '',
        phoneNumber: '',
        jobTitle: UserJobTitle.Administrator,
        role: UserRole.Administrator,
        email: '',
        isActive: false,
    });

    const [errors, setErrors] = useState<Partial<FormErrors>>({});
    const role = [
        {
            title: 'Administrator',
            value: UserRole.Administrator
        },
        {
            title: 'Doctor',
            value: UserRole.Doctor
        },
        {
            title: 'User Manager',
            value: UserRole.UserManager
        },
        {
            title: 'Super User',
            value: UserRole.SuperUser
        },
    ]

    useEffect(() => {
        if (userId) {
            getUser(userId).then((response) => {
                setFormData({
                    id: response.id,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    middleName: response.middleName,
                    phoneNumber: response.phoneNumber,
                    jobTitle: response.jobTitle,
                    role: response.role,
                    email: response.email,
                    isActive: response.isActive
                });
            });
        }

    }, [])

    const validate = (values: FormData) => {
        const errors: Partial<FormErrors> = {};

        if (!values.firstName) {
            errors.firstName = 'First Name is required';
        }

        if (!values.lastName) {
            errors.lastName = 'Last Name is required';
        }

        if (!values.phoneNumber) {
            errors.phoneNumber = 'Phone number is required';
        }

        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email is invalid';
        }

        if (!values.role) {
            errors.role = 'Role is required';
        }

        if (!values.jobTitle) {
            errors.jobTitle = 'Job title is required';
        }

        return errors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
        const newErrors = validate(newFormData);
        setErrors(newErrors);
    };

    const handleSubmit = async () => {
        const errors = validate(formData);
        setErrors(errors);
        if (Object.keys(errors).length === 0) {
            await editUser(formData);
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
                <span className="text-center text-xl m-auto font-bold">Edit User</span>
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
                            <span className="font-bold">Role*</span>
                            {errors.role && <span className="ml-2 text-red-500 text-xs">{errors.role}</span>}
                        </label>

                        <select
                            id="role"
                            name="role"
                            className="mb-4 w-full pl-1 py-1"
                            value={formData.role}
                            onChange={(value) => handleChange(value)}
                        >
                            {
                                role.map((role) => {
                                    return (
                                        <option value={role.value}>{role.title}</option>
                                    )
                                })
                            }

                        </select>

                        <label>
                            <span className="font-bold">Job Title*</span>
                            {errors.jobTitle && <span className="ml-2 text-red-500 text-xs">{errors.jobTitle}</span>}
                        </label>

                        <select
                            id="role"
                            name="jobTitle"
                            className="mb-4 w-full pl-1 py-1"
                            value={formData.jobTitle}
                            onChange={(value) => handleChange(value)}
                        >

                            {Object.keys(UserJobTitle).map((value) => (
                                <option key={value} value={value}>{value}</option>
                            ))}

                        </select>

                    </form>

                </div>

            </div>

            <div className="">
                <button className="w-auto inline-block py-2 px-5 mb-4 font-bold border-2 rounded-md bg-blue-4 hover:bg-blue-5" onClick={handleSubmit} >Save</button>
            </div>
        </article>

    );
}