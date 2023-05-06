import { useEffect, useRef, useState } from "react";
import { ReactComponent as Profile } from "../../assets/icons/profile.svg";
import { useStore } from "zustand";
import { sessionState } from "../../store/appState";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN_KEY, USER_ID_KEY } from "../../services/auth.service";

export const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpened, setMenuOpened] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const sessionStore = useStore(sessionState);

    const hideMenuHandler = () => {
        setMenuOpened(!isMenuOpened);
    };

    const clickAway = (e: MouseEvent) => {
        if (!menuRef.current?.contains(e.target as Node)) {
            setMenuOpened(false);
        }
    };

    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];

        if (body) {
            body.addEventListener("click", clickAway);
        }

        return () => {
            if (body) {
                body.removeEventListener("click", clickAway);
            }
        }

    });

    const handleLogOut = () => {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(USER_ID_KEY);
        sessionStore.updateUser(undefined);
        navigate("/");
    };

    return (
        <header>
            <div className="bg-blue-1 h-16 border-b-2">
                <nav className="flex justify-between">

                    <a href="/" className="text-3xl mt-2 ml-5">
                        Medix
                    </a>

                    {sessionStore.loggedInUser && <div id="account-menu" ref={menuRef} onClick={hideMenuHandler} className="relative flex flex-col items-center mt-2 mr-3 cursor-pointer hover:text-slate-400">
                        <Profile className="h-6 w-6" />
                        <div className="font-bold">
                            {sessionStore.loggedInUser.firstName} {sessionStore.loggedInUser.lastName}
                        </div>
                    </div >}
                    {isMenuOpened && <div className="absolute flex flex-col right-0 top-16 w-40 items-center border-2 bg-white">
                        <div className="h-8 w-full text-center cursor-pointer hover:bg-slate-400">Profile</div>
                        <div className="h-8 w-full text-center cursor-pointer hover:bg-slate-400" onClick={handleLogOut}>LogOut</div>
                    </div>}

                </nav >
            </div >
        </header >
    );
};