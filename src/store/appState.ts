import create from 'zustand';
import { AppState, userData } from '../models/app-staate';


export const userStore = create<AppState>((set) => ({
    user: {
        name: 'Martin Sallenger',
        age: 25,
    },
    updateUserData: (newState: userData) => set(() => ({ user: newState }))
}));
