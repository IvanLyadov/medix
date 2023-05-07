import { useState, useEffect, useCallback } from "react";
import { useStore } from "zustand";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";
import { User } from "../../models/user/user";
import { addCaseDoctor } from "../../services/cases.service";
import { getDoctors } from "../../services/users.service";
import { sessionState } from "../../store/appState";

export interface SelectDoctorModalProps {
  caseId: string;
  patientCardId?: string;
}

export const SelectDoctorModal = ({caseId, patientCardId}: SelectDoctorModalProps) => {
  const sessionStore = useStore(sessionState);
  const [modalStatus, setModalStatus] = useState<'hidden' | 'visible'>('hidden');
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [doctors, setDoctors] = useState<User[]>([]);
  const [search, setSearch] = useState<string>();

  const fetchDoctors = useCallback(async () => {
    const doctors = await getDoctors(search);
    setDoctors(doctors)
  },[search]);

  useEffect(() => {
    if (sessionStore.loggedInUser){
      fetchDoctors();
    }
  }, [search]);

  const searchHandler = (value: string) => {
    setSearch(value);
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkboxValue = event.target.value;
    console.log(checkboxValue);
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedCheckboxes([...selectedCheckboxes, checkboxValue]);
    } else {
      setSelectedCheckboxes(
        selectedCheckboxes.filter((value) => value !== checkboxValue)
      );
    }
  };

  const confirmHandler = async () => {
    console.log('selectedCheckboxes', selectedCheckboxes);
    await addCaseDoctor({caseId: caseId, doctorId: selectedCheckboxes[0]});
    setModalStatus('hidden');
  }

  return (
    <>
      <button onClick={() => setModalStatus('visible')} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" className="" type="button">
        <Plus className="fill-green-1 h-5 w-5 cursor-pointer" />
      </button>

      <div id="defaultModal" aria-hidden="true" className={`${modalStatus} bg-[#0000007a] fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className="relative w-full max-w-2xl max-h-full  m-auto">


          {/* Modal Content */}
          <div id="dropdownSearch" className="top-[50%]  inset-y-1/2 translate-y-2/4 z-10 bg-white rounded-lg shadow max-w-[420px] w-full dark:bg-gray-700  m-auto">

            {/* Close button */}
            <button onClick={() => setModalStatus('hidden')} type="button" className="absolute right-[-20px] top-[-20px] z-50 bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Close menu</span>
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-3">
              <label htmlFor="input-group-search" className="sr-only">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                </div>
                <input onChange={(event) => searchHandler(event.target.value)} type="text" id="input-group-search" className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search user" />
              </div>
            </div>

            {/* List */}
            <ul className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownSearchButton">
              {doctors.map(item => (
                <li key={item.id}>
                  <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                    <input value={item.id} checked={selectedCheckboxes.includes(item.id)} id={`checkbox-item-${item.id}`} onChange={handleCheckboxChange} type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label htmlFor="checkbox-item-17" className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300">{item.firstName} {item.lastName}</label>
                  </div>
                </li>
              ))}

            </ul>
            <div className="flex items-center p-3 text-sm font-medium text-green-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
              <button onClick={() => confirmHandler()} data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Confirm
              </button>
            </div>


          </div>
        </div>
      </div>


    </>

  );
}