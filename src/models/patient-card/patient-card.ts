export interface PatientCard extends PatientCardInfo{
    id: string;
    createdAtUtc: string;
}

export interface PatientCardInfo {
    firstName: string;
    lastName: string;
    middleName?: string;
    dateOfBirth: string;
    email: string;
    phoneNumber: string;
}