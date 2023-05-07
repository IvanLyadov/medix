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
        const title = window.prompt('Enter a title for your event');
        if (title && caseId && doctorId && patientCardId) {
            const newEvent: Event = {
                start: slotInfo.start,
                end: slotInfo.end,
                title,
            };
            setEvents([...events, newEvent]);
            const newAppointment: AddAppointmentParams = {
                caseId: caseId,
                patientCardId: patientCardId,
                doctorId: doctorId,
                fromUtc: formatDateToUtcString(slotInfo.start),
                toUtc: formatDateToUtcString(slotInfo.end),
                description: title
            }
            await addAppointment(newAppointment);
        }
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
                <Modal className="h-96 w-52 ml-auto mr-auto bg-white" isOpen={isModalOpen} onRequestClose={handleCloseModal} >
                    <div className="">
                        <h2>{selectedEvent?.title}</h2>
                        <p>Start Time: {selectedEvent?.start.toString()}</p>
                        <p>End Time: {selectedEvent?.end.toString()}</p>
                        <button onClick={handleCloseModal}>Close</button>
                    </div>

                </Modal>
            </div>
        </div>
    )
}