import { User } from "../user/user";

export interface Attachment {
    id: string;
    description: string;
    fileName: string;
    createdBy: User;
    createdAt: string;
}
