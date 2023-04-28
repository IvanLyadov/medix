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
    isActive: boolean;
    createdAtUtc: string;
    updatedAtUtc?: string;
}
