import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";

export const CaseDetail = () => {
    const goBack = () => {
        window.history.back();
    }
    return (
        <article className="flex flex-col h-full p-5">
            <div className="w-[100%] bg-blue-5 py-2 mb-5 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">Case Details</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="flex flex-col">
                    <span className="font-bold">Patient:</span>
                    <span className="">John Doe</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">Date of opening:</span>
                    <span className="text-[#3030ba] font-bold text-xs">03/31/2023</span>
                </div>
                <div className="flex flex-col">
                    <span className="font-bold">Case Status:</span>
                    <span>Active</span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-5">
                <div className="flex flex-col">
                    <span className="font-bold">Primary Complaint:</span>
                    <span>Lorem ipsum</span>
                </div>
                <div className="flex flex-col">
                    <span className="flex flex-row">
                        <span className="font-bold">Diagnosis:</span>
                        <Plus className="fill-green-1 h-5 w-5 cursor-pointer" />
                    </span>
                    <span>Perpetuates disinformation</span>
                </div>
            </div>

            <div className="mb-5">
                <span className="flex flex-row">
                    <span className="font-bold">Notes:</span>
                    <Plus className="fill-green-1 h-5 w-5 cursor-pointer" />
                </span>
                <p>
                    In publishing and graphic design, Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available
                </p>
            </div>

            <div>
                <span className="font-bold">Doctors:</span>
                <div className="grid grid-cols-3 gap-4 mb-5">
                    <div>
                        <div className="font-bold bg-[#eee] p-1 mb-1">Dave Thomas</div>
                        <div className="font-bold bg-[#eee] p-1 mb-1">Jerone Orreliene</div>
                    </div>
                    <div>
                        <div className="font-bold bg-[#eee] p-1 mb-1">John Dacket</div>
                    </div>
                </div>
            </div>

            <div>
                <div className="grid grid-cols-4 gap-4 mb-5">
                    <div className="font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5 p-1 mb-1 cursor-pointer">Appointments</div>
                    <div className="font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5 p-1 mb-1 cursor-pointer">Case Discusstion</div>
                    <div className="font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5 p-1 mb-1 cursor-pointer">Attachments</div>
                    <div className="font-bold text-center border-2 rounded-md bg-blue-4 hover:bg-blue-5 p-1 mb-1 cursor-pointer">Case Logs</div>
                </div>
            </div>

        </article>

    );
}