import { Link } from "react-router-dom";
import { useStore } from "zustand";
import { UserRole } from "../../models/user/user-role";
import { sessionState } from "../../store/appState";
import "./menu.css";

export const Menu = () => {
    const sessionStore = useStore(sessionState);

    const canViewSchedule = sessionStore.loggedInUser?.role == UserRole.Doctor || sessionStore.loggedInUser?.role == UserRole.SuperUser

    return (
        <div className="menu-container bg-blue-2 h-full px-3">
            <div className="cursor-pointer">
                <Link to="/cases">Cases</Link>
            </div>
            <div className="cursor-pointer">
                <Link to="/patientCards">Patient Cards</Link>
            </div>
            <div className="cursor-pointer">
                <Link to="/users">Users</Link>
            </div>
            {canViewSchedule && <div className="cursor-pointer">
                <Link to={`/calendar/${sessionStore.loggedInUser?.id}/6dadac7a-9d63-4650-b1ae-82b9f582cf33/b611ca56-1c0d-4b6a-a21e-7e2de1b9af90`}>Schedule</Link>
            </div>}
        </div>
    );
};