import { UserJobTitle } from "../user/user-job-title";
import { UserRole } from "../user/user-role";

export interface AuthRegister {
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phoneNumber: string;
    role?: UserRole;
    jobTitle: UserJobTitle;
}
