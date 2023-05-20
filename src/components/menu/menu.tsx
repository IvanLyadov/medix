import { Link } from "react-router-dom";
import { useStore } from "zustand";
import { UserRole } from "../../models/user/user-role";
import { sessionState } from "../../store/appState";
import "./menu.css";

export const Menu = () => {
    const sessionStore = useStore(sessionState);

    const canViewSchedule = sessionStore.loggedInUser?.role === UserRole.Doctor
    || sessionStore.loggedInUser?.role === UserRole.SuperUser;

    const canViewCases = sessionStore.loggedInUser?.role === UserRole.Doctor
    || sessionStore.loggedInUser?.role === UserRole.SuperUser
    || sessionStore.loggedInUser?.role === UserRole.Administrator;

    const canViewPatientCards = sessionStore.loggedInUser?.role === UserRole.SuperUser
    || sessionStore.loggedInUser?.role === UserRole.Administrator;

    const canViewUsers = sessionStore.loggedInUser?.role === UserRole.UserManager
    || sessionStore.loggedInUser?.role === UserRole.SuperUser;

    return (
        <div className="menu-container bg-blue-2 h-full px-3">
            {canViewCases && <div className="cursor-pointer">
                <Link to="/cases">Cases</Link>
            </div>}
            {canViewPatientCards && <div className="cursor-pointer">
                <Link to="/patientCards">Patient Cards</Link>
            </div>}
            {canViewUsers && <div className="cursor-pointer">
                <Link to="/users">Users</Link>
            </div>}
            {canViewSchedule && <div className="cursor-pointer">
                <Link to={`/calendar/${sessionStore.loggedInUser?.id}`}>Schedule</Link>
            </div>}
        </div>
    );
};