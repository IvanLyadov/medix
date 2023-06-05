import axios from "axios";
import { Attachment } from "../models/attachment/attachment";
import { DownloadAttachment } from "../models/attachment/download-attachment";

const attachmentsUrl = `${process.env.REACT_APP_API_URL}/api/attachments`;

export const getAttachments = async (caseId: string): Promise<Attachment[]> => {
    const { data } = await axios.get<Attachment[]>(`${attachmentsUrl}/${caseId}`);
    return data;
}

export const downloadAttachment = async (attachmentId: string): Promise<Blob> => {
    const { data } = await axios.get<Blob>(`${attachmentsUrl}/download/${attachmentId}`, {responseType: "blob"});
    return data;
}

export const addAttachment = async (addAttachmentParams: FormData): Promise<any> => {
    const { data } = await axios.post(attachmentsUrl, addAttachmentParams);
    return data;
}

export const removeAttachment = async (attachmentId: string): Promise<any> => {
    const { data } = await axios.delete(`${attachmentsUrl}/${attachmentId}`);
    return data;
}
