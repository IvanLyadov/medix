import { User } from "../../models/user/user";

export interface SessionState {
    loggedInUser?: User;
    updateUser: (data: User | undefined) => void;
}
