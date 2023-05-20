import { User } from "../user/user";

export interface CaseLog {
    id: string;
    user?: User;
    description: string;
    createdAtUtc: string;
}
