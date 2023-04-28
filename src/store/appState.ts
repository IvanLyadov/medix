import create from 'zustand';
import { User } from '../models/user/user';
import { UserRole } from '../models/user/user-role';
import { SessionState } from './models/session-state';


export const sessionState = create<SessionState>((set) => ({
    loggedInUser: {
        id: "",
        firstName: "Martin",
        lastName: "Sallenger",
        email: "",
        phoneNumber: "",
        role: UserRole.Administrator,
        jobTitle: "",
        isActive: true,
        createdAtUtc: ""
    }, 
    updateUser: (user: User) => set(() => ({ loggedInUser: user }))
}));
