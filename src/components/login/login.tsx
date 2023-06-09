import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useStore } from "zustand";
import { AuthUser } from "../../models/auth/auth-user";
import { ACCESS_TOKEN_KEY, getToken, setTokenForHttpClient, USER_ID_KEY } from "../../services/auth.service";
import { getUser } from "../../services/users.service";
import { sessionState } from "../../store/appState";
import { useNavigate } from 'react-router-dom';
import { UserRole } from "../../models/user/user-role";
import { User } from "../../models/user/user";

export const Login = () => {
    const sessionStore = useStore(sessionState);
    const [isWrongCreds, setIsWrongCreds] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState<AuthUser>({
        password: '',
        email: '',
    });

    const [errors, setErrors] = useState<Partial<AuthUser>>({});

    useEffect(() => {
        if (sessionStore.loggedInUser){
            handleRedirect(sessionStore.loggedInUser);
        }
    });

    const validate = (values: AuthUser) => {
        const errors: Partial<AuthUser> = {};

        if (!values.email) {
            errors.email = 'Email field is required';
        }

        if (!values.password) {
            errors.password = 'Password field is required';
        }

        return errors;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsWrongCreds(false);
        const { name, value } = e.target;
        const newFormData = { ...formData, [name]: value };
        setFormData(newFormData);
        const newErrors = validate(newFormData);
        setErrors(newErrors);
    };

    const handleRedirect = (user: User) => {
        switch (user.role){
            case UserRole.UserManager:
                navigate("/users");
                break;
            case UserRole.Doctor:
                navigate("/cases");
                break;
            case UserRole.Administrator:
                navigate("/cases");
                break;
            case UserRole.SuperUser:
                navigate("/cases");
                break;
        }
    };

    const handleSubmit = async () => {
        const errors = validate(formData);
        setErrors(errors);

        if (Object.keys(errors).length === 0) {
            const token = await getToken(formData)
                .catch(() => setIsWrongCreds(true));
            if (token) {
                localStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
                localStorage.setItem(USER_ID_KEY, token.userId);
                setTokenForHttpClient(token.accessToken);
                const user = await getUser(token.userId);
                sessionStore.updateUser(user);
                handleRedirect(user);
            }
        }
    };

    return (
        <div className="flex flex-col h-full p-3">
            <div className="grid grid-cols-1 gap-4 mb-5 mt-auto mb-auto mx-auto border-2 bg-blue-4 border-[#92b1f7] rounded-lg p-5 w-full max-w-[420px]">
                <div className="w-full">
                    <div>{isWrongCreds && <span className="ml-2 text-red-500 text-xs">Wrong credentials</span>}</div>
                    <label>
                        <span className="font-bold">Email</span>
                        {errors.email && <span className="ml-2 text-red-500 text-xs">{errors.email}</span>}

                    </label>
                    <input
                        type="text"
                        name="email"
                        className="mb-4 w-full pl-1 py-1 rounded-md"
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
                        className="mb-4 w-full pl-1 py-1 rounded-md"
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="">
                    <button className="w-auto inline-block py-2 px-5 mb-4 font-bold border-2 rounded-md bg-blue-5 hover:bg-blue-1" onClick={() => handleSubmit()} >Login</button>
                </div>
            </div>


        </div>

    );
}