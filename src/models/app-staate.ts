export interface AppState {
    user: userData;
    updateUserData: (data: userData) => void;
}

export interface userData {
    name: string;
    age: number;
}
