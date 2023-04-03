import { Link } from "react-router-dom";
import "./menu.css";

export const Menu = () => {
    return (
        <div className="menu-container bg-blue-2 h-full">
            <div className="cursor-pointer">
            <Link to="/">Cases</Link>
            </div>
            <div className="cursor-pointer">
            <Link to="/patientCards">Patient Cards</Link>
            </div>
        </div>
    );
};