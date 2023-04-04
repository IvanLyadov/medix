import { UserRole } from "./user-role";

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    email: string;
    phoneNumber: string;
    role?: UserRole;
    jobTitle: string;
    createdAtUtc: string;
    updatedAtUtc?: string;
}
