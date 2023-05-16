import { useCallback, useEffect, useState, KeyboardEvent } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "zustand";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { ChatMessage } from "../../models/chat/chat-message";
import { User } from "../../models/user/user";
import { addCaseChatMessage, getCaseChatMessages } from "../../services/chat-messages.service";
import { sessionState } from "../../store/appState";
import { formatDateTime } from "../../utils/date.util";

export const Chat = () => {
    const sessionStore = useStore(sessionState);
    const { caseId, isActive } = useParams();
    const [caseMessages, setMessages] = useState<ChatMessage[]>();
    const [inputValue, setInputValue] = useState<string>("");

    const fethcMessages = useCallback(async () => {
        if (caseId) {
            const messages = await getCaseChatMessages(caseId);
            setMessages(messages);
        }
    }, [caseId]);

    useEffect(() => {
        if (sessionStore.loggedInUser) {
            fethcMessages();
        }
    }, [sessionStore.loggedInUser]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setInputValue(e.target.value);
    };

    const handleSendMessage = async () => {
        if (caseId){
            await addCaseChatMessage({caseId: caseId, message: inputValue});
            setInputValue("");
            fethcMessages();
        }
    };

    const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputValue.trim().length > 0){
            handleSendMessage();
        }
    };

    const getMessagePositionClass = (userId: string): string => {
        if (sessionStore.loggedInUser?.id === userId) {
            return "text-right";
        }
        return "";
    };

    const getMessageColorClass = (userId: string): string => {
        if (sessionStore.loggedInUser?.id === userId) {
            return "bg-blue-5 mr-1";
        }
        return "bg-blue-2";
    };

    const getUserInitials = (user: User): string => {
        return `${user.firstName[0]}${user.lastName[0]}`;
    };

    const goBack = () => {
        window.history.back();
    }

    return (
        <div className="flex flex-col h-full p-3">
            <div className="w-[100%] bg-blue-5 py-2 mb-2 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">Case Discussion</span>
            </div>
            <div className="flex-1 overflow-auto min-h-0 mb-2">
                {caseMessages && caseMessages?.map(m => {
                    return <div key={m.id} className={`${getMessagePositionClass(m.createdBy.id)} w-full my-2`}>
                        {sessionStore.loggedInUser?.id !== m.createdBy.id && <div className={`inline-block h-8 w-8 mr-2 pt-1.5 pl-1.5 font-bold rounded-full ${getMessageColorClass(m.createdBy.id)}`}>
                            {getUserInitials(m.createdBy)}
                        </div>}
                        <div className={`inline-block p-2 align-top max-w-85% rounded ${getMessageColorClass(m.createdBy.id)}`}>
                            <div className="">
                                {sessionStore.loggedInUser?.id !== m.createdBy.id && <div className="break-words">
                                    <span className="font-bold">{m.createdBy.firstName} {m.createdBy.lastName}   </span>
                                    <span>{m.createdBy.jobTitle}</span>
                                </div>}
                                <div className="font-semibold">
                                    {formatDateTime(m.createdAt)}
                                </div>
                            </div>
                            <div className="overflow-content whitespace-pre-wrap text-left">
                                {m.message}
                            </div>
                        </div>
                    </div>
                })}

            </div>
            <div className="py-2 bg-blue-5">
                <input
                type="text"
                className="ml-2 w-5/6 rounded-md"
                value={inputValue}
                disabled={isActive !== "true"}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}/>
                <button
                className="border-2 pl-4 pr-4 pt-1 pb-1 ml-3 font-bold rounded-md bg-blue-4 hover:bg-blue-5"
                disabled={inputValue.trim().length === 0 || isActive !=="true"}
                onClick={handleSendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}