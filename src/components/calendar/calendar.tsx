import { Calendar as BigCalendar, momentLocalizer, stringOrDate } from 'react-big-calendar'
import moment from 'moment'
import withDragAndDrop, { EventInteractionArgs } from "react-big-calendar/lib/addons/dragAndDrop";
import { useState } from 'react';
import Modal from 'react-modal';

const localizer = momentLocalizer(moment)
const DnDCalendar = withDragAndDrop(BigCalendar);
type Event = {
    start: stringOrDate;
    end: stringOrDate;
    title: string;
};

export const Calendar = () => {
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


    const handleSelectSlot = (slotInfo: { start: Date; end: Date }) => {
        const title = window.prompt('Enter a title for your event');
        if (title) {
            const newEvent: Event = {
                start: slotInfo.start,
                end: slotInfo.end,
                title,
            };
            setEvents([...events, newEvent]);
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