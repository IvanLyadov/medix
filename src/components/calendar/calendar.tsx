import { Calendar as BigCalendar, momentLocalizer, stringOrDate } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop, { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { ReactComponent as ArrowLeft } from "../../assets/icons/arrow_left.svg";
import { addAppointment, getCalendarAppointments } from '../../services/appointments.service';
import { AddAppointmentParams } from '../../models/appointment/add-appointment-params';
import { formatCalendarDateTime, formatDateToUtcString } from '../../utils/date.util';
import { useStore } from 'zustand';
import { sessionState } from '../../store/appState';
import { getUser } from '../../services/users.service';
import { User } from '../../models/user/user';
import { NodeModal } from '../UI/text-modal';
import { ReactComponent as Plus } from "../../assets/icons/plus.svg";

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(BigCalendar);
type Event = {
    start: stringOrDate;
    end: stringOrDate;
    title: string;
};

// export interface CalendarProps {
//     caseId: string;
//     doctorId: string;
//     patientCardId: string;
// }

export const Calendar = () => {
    const sessionStore = useStore(sessionState);
    const { doctorId, caseId, patientCardId } = useParams();
    const [doctor, setDoctor] = useState<User>();
    const [selectedEvent, setSelectedEvent] = useState<Event | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [promptModal, setPromptModal] = useState(false);
    const [modalInfo, setModalInfo] = useState<{ start: Date; end: Date }>({ start: new Date(), end: new Date()})


    const handleSelectEvent = (event: any): void => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const handleCloseModal = (): void => {
        setIsModalOpen(false);
    };
    const [events, setEvents] = useState<Event[]>([]);

    const fetchAppointments = useCallback(async () => {
        if (doctorId) {
            const appointments = await getCalendarAppointments(doctorId);
            const calendarEvents = appointments.map(a => {
                return {
                    start: formatCalendarDateTime(a.fromUtc),
                    end: formatCalendarDateTime(a.toUtc),
                    title: a.description
                } as Event
            })

            setEvents(calendarEvents);
        }
    }, [doctorId]);

    const fetchUser = useCallback(async () => {
        if (doctorId) {
            const user = await getUser(doctorId);
            setDoctor(user);
        }
    }, [doctorId]);

    useEffect(() => {
        if (sessionStore.loggedInUser) {
            fetchUser();
            fetchAppointments();
        }
    }, [sessionStore.loggedInUser]);

    const getTitle = (): string => {
        if (doctorId === sessionStore.loggedInUser?.id){
            return "Your Schedule";
        }
        else{
            return `${doctor?.firstName} ${doctor?.lastName}\`s Schedule`
        }
    };


    const handleSelectSlot = async (slotInfo: { start: Date; end: Date }) => {
        setPromptModal(true);
        setModalInfo(slotInfo);
    };

    const handleEventResize = ({ event, start, end }: EventInteractionArgs<object>) => {
        // Find the index of the event being resized
        const index = events.findIndex((ev) => ev === event);

        // Create a new array with the updated event
        const updatedEvents = [...events];
        updatedEvents[index] = { ...event, start, end, title: updatedEvents[index].title };

        // Update the events array
        setEvents(updatedEvents);
    };

    const handleEventDrop = ({ event, start, end }: EventInteractionArgs<object>) => {
        const updatedEvent = { ...event, start, end };
        const updatedEvents = events.map((e) => (e === event ? updatedEvent : e));
        setEvents(updatedEvents as Event[]);
    };

    const goBack = () => {
        window.history.back();
    }

    const modalInputHandler = async (inputTitle: string) => {
       if (inputTitle && caseId && doctorId && patientCardId) {
            const newEvent: Event = {
                start: modalInfo.start,
                end: modalInfo.end,
                title: inputTitle,
            };
            setEvents([...events, newEvent]);
            const newAppointment: AddAppointmentParams = {
                caseId: caseId,
                patientCardId: patientCardId,
                doctorId: doctorId,
                fromUtc: formatDateToUtcString(modalInfo.start),
                toUtc: formatDateToUtcString(modalInfo.end),
                description: inputTitle
            }
            await addAppointment(newAppointment);
        }
        setPromptModal(false);
    }

    return (
        <div className="flex flex-col h-full">
            <div className="w-[100%] bg-blue-5 py-2 mb-5 flex flex-row">
                <button onClick={goBack}>
                    <ArrowLeft className="h-7 w-7 ml-2" />
                </button>
                <span className="text-center text-xl m-auto font-bold">{getTitle()}</span>
            </div>
            <div className="flex-1 overflow-auto min-h-0">
                <DnDCalendar
                    localizer={localizer}
                    events={events}
                    selectable={true}
                    onSelectEvent={handleSelectEvent}
                    onSelectSlot={handleSelectSlot}
                    onEventDrop={handleEventDrop}
                    handleDragStart={() => console.log('test')}
                    defaultView="week"
                    views={['week', 'day']}
                    step={30}
                    showMultiDayTimes
                    defaultDate={new Date()}
                    resizable
                    onEventResize={handleEventResize}
                />
                <Modal ariaHideApp={false} className="h-96 w-52 ml-auto mr-auto" isOpen={isModalOpen} onRequestClose={handleCloseModal} >
                    <div id="defaultModal" aria-hidden="true" className={`bg-[#0000007a] fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}>

                        <div id="dropdownSearch" className="p-5 top-[50%]  inset-y-1/2 translate-y-2/4 z-10 bg-white rounded-lg shadow max-w-[420px] w-full dark:bg-gray-700  m-auto">

                                {/* Close button */}
                                <button onClick={() => handleCloseModal()} type="button" className="absolute right-[6px] top-[6px] z-50 bg-white rounded-full p-1 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                                    <span className="sr-only">Close menu</span>
                                    <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                        
                                <div className="text-white">
                                    <h2>{selectedEvent?.title}</h2>
                                    <p>Start Time: {moment(selectedEvent?.start).format('MM/DD/YYYY hh:mm a')}</p>
                                    <p>End Time: {moment(selectedEvent?.end).format('MM/DD/YYYY hh:mm a')}</p>
                                </div>
                        </div>
                    </div>

                </Modal>

                {promptModal && <NodeModal
                    onConfirm={modalInputHandler}
                    title="Enter a title for your event"
                    modalHidden='visible'
                    icon={<Plus className="hidden" />}
                    customModalConfirm={true}
                />}
            </div>
        </div>
    )
}