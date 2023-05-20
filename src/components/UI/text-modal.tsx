import { useState, useEffect } from "react";
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";

export enum SelectDoctorModalType {
  AddDoctor,
  AddAppointment
}

export interface SelectDoctorModalProps {
  patientCardId?: string;
  onConfirm: (value: string) => void;
  title: string;
  initialText?: string;
  icon?: React.ReactElement;
}

export const NodeModal = ({ onConfirm, title, initialText, icon }: SelectDoctorModalProps) => {
  const [modalStatus, setModalStatus] = useState<'hidden' | 'visible'>('hidden');
  const [text, setText] = useState("");



  useEffect(() => {
    if(initialText)
    setText(initialText)
  }, [initialText]);


  const confirmHandler = async () => {
    if (text) {
      onConfirm(text);

    }
    setModalStatus('hidden');
  }

  return (
    <>
      <button onClick={() => setModalStatus('visible')} id="dropdownSearchButton" data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" className="" type="button">
        {icon ? icon : (<Plus className="fill-green-1 h-5 w-5 cursor-pointer" />)}
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
              <div className="relative text-white">
                {title}
              </div>
            </div>

            <div className="p-3">
              <label htmlFor="input-group-search" className="sr-only">Search</label>
              <div className="relative">
                <textarea value={text} onChange={(e) => setText(e.target.value)} id="" className="w-full" />
              </div>
            </div>


            <div className="flex items-center p-3 text-sm font-medium text-green-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600">
              <button disabled={text.trim().length === 0} onClick={() => confirmHandler()} data-dropdown-toggle="dropdownSearch" data-dropdown-placement="bottom" className="text-white bg-green-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Save
              </button>
            </div>


          </div>
        </div>
      </div>


    </>

  );
}