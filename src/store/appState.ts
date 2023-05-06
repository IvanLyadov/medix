import create from 'zustand';
import { User } from '../models/user/user';
import { SessionState } from './models/session-state';


export const sessionState = create<SessionState>((set) => ({
    loggedInUser: undefined, 
    updateUser: (user: User | undefined) => set(() => ({ loggedInUser: user }))
}));
