import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { ReactComponent as Search } from "../../assets/icons/search.svg";
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrow_right.svg";
import { ReactComponent as ArrowUp } from "../../assets/icons/arrow_up.svg";
import { ReactComponent as ArrowDown } from "../../assets/icons/arrow_down.svg";
import { ReactComponent as Active } from "../../assets/icons/active.svg";
import { ReactComponent as Inactive } from "../../assets/icons/inactive.svg";
import { Case } from "../../models/case/case";
import "./cases-list.css";
import { SortOrder } from "../../models/sort-order";
import { useState } from "react";
import { Link } from "react-router-dom";

export const CasesList = () => {
    const cases: Case[] = [
        {
            id: "123",
            patientCard: {
                id: "",
                firstName: "Hankey",
                lastName: "Bannister",
                dateOfBirth: "",
                phoneNumber: "",
                email: "",
                createdAtUtc: ""
            },
            diagnosis: "Migraine",
            primaryComplaint: "Headache",
            createdAtUtc: "15/03/2023",
            closedAtUtc: ""
        },
        {
            id: "133",
            patientCard: {
                id: "",
                firstName: "Jack",
                lastName: "Daniels",
                dateOfBirth: "",
                phoneNumber: "",
                email: "",
                createdAtUtc: ""
            },
            primaryComplaint: "Temperature",
            createdAtUtc: "11/03/2023",
            closedAtUtc: ""
        },
        {
            id: "3465",
            patientCard: {
                id: "",
                firstName: "Hankey",
                lastName: "Bannister",
                dateOfBirth: "",
                phoneNumber: "",
                email: "",
                createdAtUtc: ""
            },
            diagnosis: "Migraine",
            primaryComplaint: "Headache",
            createdAtUtc: "15/03/2023",
            closedAtUtc: ""
        },
        {
            id: "56856",
            patientCard: {
                id: "",
                firstName: "Jack",
                lastName: "Daniels",
                dateOfBirth: "",
                phoneNumber: "",
                email: "",
                createdAtUtc: ""
            },
            primaryComplaint: "Temperature",
            createdAtUtc: "11/03/2023",
            closedAtUtc: ""
        },
        {
            id: "64523",
            patientCard: {
                id: "",
                firstName: "Hankey",
                lastName: "Bannister",
                dateOfBirth: "",
                phoneNumber: "",
                email: "",
                createdAtUtc: ""
            },
            diagnosis: "Migraine",
            primaryComplaint: "Headache",
            createdAtUtc: "15/03/2023",
            closedAtUtc: ""
        },
        {
            id: "634634",
            patientCard: {
                id: "",
                firstName: "Jack",
                lastName: "Daniels",
                dateOfBirth: "",
                phoneNumber: "",
                email: "",
                createdAtUtc: ""
            },
            primaryComplaint: "Temperature",
            createdAtUtc: "11/03/2023",
            closedAtUtc: "13/03/2023"
        },

    ];

    const [isActiveStatusFilterApplied, setActiveStatusFilter] = useState<boolean>();
    const [isInactiveStatusFilterApplied, setInactiveStatusFilter] = useState<boolean>();

    const toPreviousPage = () => {

    };

    const toNextPage = () => {

    };

    const sortrDate = (order: SortOrder) => {

    };

    const filterStatus = (isActive: boolean) => {
        if (isActive && isActiveStatusFilterApplied){
            setActiveStatusFilter(false)
        }
        if (isActive && !isActiveStatusFilterApplied){
            setActiveStatusFilter(true)
            setInactiveStatusFilter(false)
        }

        if (!isActive && isInactiveStatusFilterApplied){
            setInactiveStatusFilter(false)
        }
        if (!isActive && !isInactiveStatusFilterApplied){
            setInactiveStatusFilter(true)
            setActiveStatusFilter(false)
        }
    };

    const getActiveStatusFilterBtnClass = (): string => {
        if (isActiveStatusFilterApplied){
            return "fill-green-600"
        } else {
            return "";
        }
    }

    const getInactiveStatusFilterBtnClass = (): string => {
        if (isInactiveStatusFilterApplied){
            return "fill-red-600"
        } else {
            return "";
        }
    }

    return (
        <article className="flex flex-col h-full">
            <div className="flex justify-between py-2 pl-4">
                <div className="flex flex-row">
                    <div className="text-3xl mr-4">Cases</div>
                    <button className="flex flex-row border-2 pl-2 pr-4 pt-2 font-bold rounded-md bg-blue-4 hover:bg-blue-5">
                        <Plus className="fill-green-1 h-5 w-5" />
                        New Case
                    </button>
                </div>
                <div className="flex flex-row">
                    <Search className="mt-2 mr-3 h-5 w-5" />
                    <input className="mr-6 mt-2 h-6 w-52 rounded-md border-2" placeholder="Search" type="text" />
                </div>
            </div>

            <div className="table-header bg-blue-5">
                <div className="flex flex-row pl-2">
                    <div className="inline-block pt-2 font-bold truncate">
                        Created Date
                    </div>
                    <div className="flex flex-col ml-1 mt-1">
                        <button onClick={() => sortrDate(SortOrder.Asc)}>
                            <ArrowUp className="h-4 w-4" />
                        </button>
                        <button onClick={() => sortrDate(SortOrder.Desc)}>
                            <ArrowDown className="h-4 w-4" />
                        </button>
                    </div>
                </div>
                <div className="flex flex-row pl-2">
                    <div className="inline-block pt-2 font-bold truncate">
                        Status
                    </div>
                    <div className="flex flex-col ml-1 mt-1">
                        <button onClick={() => filterStatus(true)}>
                            <Active className={`${getActiveStatusFilterBtnClass()} h-4 w-4`} />
                        </button>
                        <button onClick={() => filterStatus(false)}>
                            <Inactive className={`${getInactiveStatusFilterBtnClass()} h-4 w-4`} />
                        </button>
                    </div>
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
            <div className="flex-1 overflow-auto min-h-0">
                {cases.map((c) => {
                    return (
                        <div key={c.id} className="table-row even:bg-blue-6">
                            <div className="pt-1 pl-2 truncate">{c.createdAtUtc}</div>
                            <div className="pt-1 pl-2 truncate">{c.closedAtUtc ? "Closed" : "Active"}</div>
                            <div className="pt-1 pl-2 truncate">{c.patientCard.firstName} {c.patientCard.lastName}</div>
                            <div className="pt-1 pl-2 truncate">{c.primaryComplaint}</div>
                            <div className="pt-1 pl-2 truncate">{c.diagnosis}</div>
                            <Link className="pt-1 pl-2 truncate text-blue-400 cursor-pointer" to={"/case"}>Details</Link>
                        </div>
                    )
                })}
            </div>
            <div className="flex flex-row justify-center h-10 pt-2 font-bold">
                <button onClick={toPreviousPage}>
                    <ArrowLeft className="h-7 w-7" />
                </button>
                <div className="mt-2">
                    1...1
                </div>
                <button onClick={toNextPage}>
                    <ArrowRight className="h-7 w-7" />
                </button>
            </div>
        </article>

    );
}