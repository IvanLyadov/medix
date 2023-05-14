import { User } from "../user/user";

export interface ChatMessage {
    id: string;
    caseId: string;
    message: string;
    createdBy: User;
    createdAt: string;
}
