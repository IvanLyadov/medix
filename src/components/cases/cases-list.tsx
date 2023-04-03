import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { Case } from "../../models/case/case";
import "./cases-list.css";

export const CasesList = () => {
    const cases: Case[] = [
        {
            id: "123",
            patientFirstName: "William",
            patientLastName: "Jameson",
            diagnosis: "Migraine",
            primaryComplaint: "Headache",
            createdAtUtc: "15/03/2023",
            closedAtUtc: ""
        },
        {
            id: "133",
            patientFirstName: "Jack",
            patientLastName: "Daniels",
            primaryComplaint: "Temperature",
            createdAtUtc: "11/03/2023",
            closedAtUtc: ""
        },
        {
            id: "345",
            patientFirstName: "William",
            patientLastName: "Jameson",
            diagnosis: "Migraine",
            primaryComplaint: "Headache",
            createdAtUtc: "15/03/2023",
            closedAtUtc: ""
        },
        {
            id: "6756",
            patientFirstName: "Jack",
            patientLastName: "Daniels",
            primaryComplaint: "Temperature",
            createdAtUtc: "11/03/2023",
            closedAtUtc: ""
        },
        {
            id: "25346",
            patientFirstName: "William",
            patientLastName: "Jameson",
            diagnosis: "Migraine",
            primaryComplaint: "Headache",
            createdAtUtc: "15/03/2023",
            closedAtUtc: ""
        },
        {
            id: "133234",
            patientFirstName: "Jack",
            patientLastName: "Daniels",
            primaryComplaint: "Temperature",
            createdAtUtc: "11/03/2023",
            closedAtUtc: "12/03/2023"
        },
        {
            id: "278946",
            patientFirstName: "William",
            patientLastName: "Jameson",
            diagnosis: "Migraine",
            primaryComplaint: "Headache",
            createdAtUtc: "15/03/2023",
            closedAtUtc: ""
        },
        {
            id: "13454",
            patientFirstName: "Jack",
            patientLastName: "Daniels",
            primaryComplaint: "Temperature",
            createdAtUtc: "11/03/2023",
            closedAtUtc: "12/03/2023"
        },
        {
            id: "20896",
            patientFirstName: "William",
            patientLastName: "Jameson",
            diagnosis: "Migraine",
            primaryComplaint: "Headache",
            createdAtUtc: "15/03/2023",
            closedAtUtc: ""
        },
        // {
        //     id: "10004",
        //     patientFirstName: "Jack",
        //     patientLastName: "Daniels",
        //     primaryComplaint: "Temperature",
        //     createdAtUtc: "11/03/2023",
        //     closedAtUtc: "12/03/2023"
        // },
        // {
        //     id: "223526",
        //     patientFirstName: "William",
        //     patientLastName: "Jameson",
        //     diagnosis: "Migraine",
        //     primaryComplaint: "Headache",
        //     createdAtUtc: "15/03/2023",
        //     closedAtUtc: ""
        // },
        // {
        //     id: "10345634",
        //     patientFirstName: "Jack",
        //     patientLastName: "Daniels",
        //     primaryComplaint: "Temperature",
        //     createdAtUtc: "11/03/2023",
        //     closedAtUtc: "12/03/2023"
        // },
        // {
        //     id: "2034634",
        //     patientFirstName: "William",
        //     patientLastName: "Jameson",
        //     diagnosis: "Migraine",
        //     primaryComplaint: "Headache",
        //     createdAtUtc: "15/03/2023",
        //     closedAtUtc: ""
        // },
        // {
        //     id: "10463463",
        //     patientFirstName: "Jack",
        //     patientLastName: "Daniels",
        //     primaryComplaint: "Temperature",
        //     createdAtUtc: "11/03/2023",
        //     closedAtUtc: "12/03/2023"
        // },
    ];
    return (
        <article className="flex flex-col h-full">
            <div className="flex justify-between py-2 pl-4">
                <div className="flex flex-row">
                    <div className="text-3xl mr-4">Cases</div>
                    <button className="flex flex-row border-2 pl-2 pr-4 pt-2 font-bold rounded-md bg-blue-4 hover:bg-blue-1">
                        <Plus className="fill-green-1 h-5 w-5" />
                        New Case
                    </button>
                </div>
                <div className="flex flex-row">
                    <Search className="mt-2 mr-3 h-5 w-5" />
                    <input className="mr-6 mt-2 h-6 w-52 rounded-md border-2" placeholder="Search" type="text" />
                </div>
            </div>
            <div className="flex-1 overflow-auto min-h-0">
                <div className="table-header bg-blue-5">
                    <div className="mt-2 pl-2 font-bold truncate">
                        Created Date
                    </div>
                    <div className="mt-2 pl-2 font-bold truncate">
                        Status
                    </div>
                    <div className="mt-2 pl-2 font-bold truncate">
                        Patient Name
                    </div>
                    <div className="mt-2 pl-2 font-bold truncate">
                        Primary Complaint
                    </div>
                    <div className="mt-2 pl-2 font-bold truncate">
                        Diagnosis
                    </div>
                    <div></div>
                </div>
                <div>
                    {cases.map((c) => {
                        return (
                            <div key={c.id} className="table-row even:bg-blue-6">
                                <div className="pt-1 pl-2 truncate">{c.createdAtUtc}</div>
                                <div className="pt-1 pl-2 truncate">{c.closedAtUtc ? "Closed" : "Active"}</div>
                                <div className="pt-1 pl-2 truncate">{c.patientFirstName} {c.patientLastName}</div>
                                <div className="pt-1 pl-2 truncate">{c.primaryComplaint}</div>
                                <div className="pt-1 pl-2 truncate">{c.diagnosis}</div>
                                <div className="pt-1 pl-2 truncate text-blue-400 cursor-pointer">Details</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className="text-center h-10 pt-2 font-bold">
                1...1
            </div>
        </article>

    );
}