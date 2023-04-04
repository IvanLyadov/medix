export interface PatientCard {
    id: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
    createdAtUtc: string;
}
