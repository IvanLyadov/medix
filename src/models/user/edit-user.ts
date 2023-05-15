import { UserJobTitle } from "./user-job-title";
import { UserRole } from "./user-role";

export interface EditUser {
    id: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phoneNumber: string;
    role?: UserRole;
    jobTitle: UserJobTitle;
    isActive: boolean;
}