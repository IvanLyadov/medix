import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "zustand";
import { sessionState } from "../../store/appState";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { ReactComponent as Trash } from "../../assets/icons/trash.svg";
import { ReactComponent as Download } from "../../assets/icons/download.svg";
import { ConfirmModal } from "../UI/confirm-modal";
import { addAttachment, downloadAttachment, getAttachments, removeAttachment } from "../../services/attachments.service";
import { Attachment } from "../../models/attachment/attachment";
import { formatDateTime } from "../../utils/date.util";
import "./attachments.css";
import { ACCESS_TOKEN_KEY } from "../../services/auth.service";

export const Attachments = () => {
    const sessionStore = useStore(sessionState);
    const { caseId } = useParams();
    const [attachments, setAttachments] = useState<Attachment[]>();
    const [file, setFile] = useState<File | null>(null);
    const [description, setDescription] = useState("");

    const [openModal, setOpenModal] = useState(false);
    const [attachmentToRemove, setAttachmentToRemove] = useState<string | null>(null);

    const fetchAttachments = useCallback(async () => {
        if (caseId) {
            const attachments = await getAttachments(caseId);
            setAttachments(attachments);
        }
    }, [caseId]);

    useEffect(() => {
        if (sessionStore.loggedInUser) {
            fetchAttachments();
        }
    }, [sessionStore.loggedInUser]);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        setFile(selectedFile || null);
    };

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value);
    };

    const handleUpload = async () => {
        if (file && caseId) {
            const formData = new FormData();
            formData.append('caseId', caseId);
            formData.append('description', description);
            formData.append('file', file);
            formData.append('fileName', file.name);

            await addAttachment(formData);
            setFile(null);
            setDescription("");
            fetchAttachments();
        }
    };

    const handleDownload = async (attachmentId: string) => {
        const attachmentsUrl = `${process.env.REACT_APP_API_URL}/api/attachments`;
        try {
            const response = await fetch(`${attachmentsUrl}/download/${attachmentId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem(ACCESS_TOKEN_KEY)}`
                }
            });
            const blob = await response.blob();

            const contentDisposition: string | null = response.headers.get('content-disposition');

            if (contentDisposition) {
              const fileName: string = contentDisposition
              .split(';')[1]
              .split('filename')[1]
              .split('=')[1]
              .trim();

              const url: string = URL.createObjectURL(blob);
        
              const link: HTMLAnchorElement = document.createElement('a');
              link.href = url;
              link.setAttribute('download', fileName);
              document.body.appendChild(link);
        
              link.click();
        
              link.remove();
              URL.revokeObjectURL(url);
            }
          } catch (error) {
            console.error('Error:', error);
          }
      };

    const deleteAttachment = (attachmentId: string) => {
        setAttachmentToRemove(attachmentId);
        setOpenModal(true);
    }

    const handleRemoveAttachment = async (id: string) => {
        await removeAttachment(id);
        fetchAttachments();
    };

    const confirmRemoveAttachment = () => {
        if (attachmentToRemove) {
            handleRemoveAttachment(attachmentToRemove);
        }
    }

    const goBack = () => {
        window.history.back();
    }

    return (
        <article className="flex flex-col h-full p-3">
            <div className="w-[100%] bg-blue-5 py-2 mb-2 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">Attachments</span>
            </div>
            <div className="attachment-table-header bg-blue-5">
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        File Name
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        Description
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        User Name
                    </div>
                </div>
                <div className="flex flex-row pl-2 truncate">
                    <div className="inline-block pt-2 font-bold truncate">
                        Job Title
                    </div>
                </div>
                <div></div>
                <div></div>
            </div>
            <div className="flex-1 overflow-auto min-h-0">
                {attachments && attachments?.map(a => {
                    return <div key={a.id} className="attachment-table-row even:bg-blue-6">
                        <div className="pt-1 pl-2 truncate">{a.fileName}</div>
                        <div className="pt-1 pl-2 truncate">{a.description}</div>
                        <div className="pt-1 pl-2 truncate">{a.createdBy.firstName} {a.createdBy.lastName}</div>
                        <div className="pt-1 pl-2 truncate">{formatDateTime(a.createdAt)}</div>
                        <div>
                            <Download onClick={() => handleDownload(a.id)}
                                className="w-[20px] h-[20px] mt-2 fill-green-400 cursor-pointer" />
                        </div>
                        <div>
                            {a.createdBy.id === sessionStore.loggedInUser?.id &&
                                <Trash onClick={() => deleteAttachment(a.id)}
                                    className="w-[20px] h-[20px] mt-2 fill-red-400 cursor-pointer" />}
                        </div>
                    </div>
                })}
            </div>

            <div className="flex flex-row">
                <div>
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className="w-full">
                    <input type="text" className="w-full" value={description} onChange={handleDescriptionChange} placeholder="Description" />
                </div>
                <div className="ml-2">
                    <button
                        className="font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5 px-2 py-1"
                        onClick={handleUpload}
                        disabled={file === null}>
                        Upload
                    </button>
                </div>
            </div>

            {openModal &&
                <ConfirmModal
                    confirm={confirmRemoveAttachment}
                    cancel={() => setOpenModal(false)}
                    close={() => setOpenModal(false)}
                    title="Are you sure you want to remove Attachment?"
                />
            }
        </article>
    );
}
