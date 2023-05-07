import { Calendar as BigCalendar, momentLocalizer, stringOrDate } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop, { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useParams } from 'react-router-dom';
import { addAppointment, getCalendarAppointments } from '../../services/appointments.service';
import { AddAppointmentParams } from '../../models/appointment/add-appointment-params';
import { formatCalendarDateTime, formatDateToUtcString } from '../../utils/date.util';
import { useStore } from 'zustand';
import { sessionState } from '../../store/appState';

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

    useEffect(() => {
        if (sessionStore.loggedInUser) {
            fetchAppointments();
        }
    }, [sessionStore.loggedInUser]);


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

    return (
        <div className="h-full overflow-auto">
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
    )
}