import axios from "axios";
import { AddChatMessageParams } from "../models/chat/add-chat-message-params";
import { ChatMessage } from "../models/chat/chat-message";

const chatUrl = `${process.env.REACT_APP_API_URL}/api/chat`;

export const getCaseChatMessages = async (caseId: string): Promise<ChatMessage[]> => {
    const { data } = await axios.get(`${chatUrl}/${caseId}`);
    return data;
}

export const addCaseChatMessage = async (params: AddChatMessageParams): Promise<any> => {
    const { data } = await axios.post(`${chatUrl}`, params);
    return data;
}
