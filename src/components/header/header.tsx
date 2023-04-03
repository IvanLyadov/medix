import { useEffect, useRef, useState } from "react";
import { ReactComponent as Profile } from "../../assets/icons/profile.svg";

export const Header = () => {
    const [isMenuOpened, setMenuOpened] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const hideMenuHandler = () => {
        setMenuOpened(!isMenuOpened);
    };

    const clickAway = (e: MouseEvent) => {
        if (!menuRef.current?.contains(e.target as Node)){
            setMenuOpened(false);
        }
    };

    useEffect(() => {
        const body = document.getElementsByTagName("body")[0];

        if (body){
            body.addEventListener("click", clickAway);
        }

        return () => {
            if (body){
                body.removeEventListener("click", clickAway);
            }
        }

    });

    return (
        <header>
            <div className="bg-blue-1 h-16">
                <nav className="flex justify-between">

                    <a className="text-3xl mt-2 ml-5">
                        Medix</a>

                    <div id="account-menu" ref={menuRef} onClick={hideMenuHandler} className="relative flex flex-col items-center mt-2 mr-3 cursor-pointer hover:text-slate-400">
                        <Profile className="h-6 w-6" />
                        <div className="font-bold">
                            Martin Sallenger
                        </div>
                    </div >
                    {isMenuOpened && <div className="absolute flex flex-col right-0 top-16 w-40 items-center border-2">
                        <div className="h-8 w-full text-center cursor-pointer hover:bg-slate-400">Profile</div>
                        <div className="h-8 w-full text-center cursor-pointer hover:bg-slate-400">LogOut</div>
                    </div>}

                </nav >
            </div >
        </header >
    );
};