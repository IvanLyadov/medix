import { Link } from "react-router-dom";
import "./menu.css";

export const Menu = () => {
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
        </div>
    );
};