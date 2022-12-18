import React, { useState } from 'react';
import Calendar from './components/Calendar';
import EventsPanel from './components/EventsPanel';
import DayPanel from './components/DayPanel';
import './App.css';
import { nanoid } from 'nanoid';

export default function App() {

    const [ currentDate ] = useState(new Date()); 
    const [ calendarDates, setCalendarDates ] = useState(
        generateDates(currentDate.getFullYear(), currentDate.getMonth())
    );
    const [ selectedDate, setSelectedDate ] = useState(currentDate.toDateString());
    const [ events, setEvents ] = useState([]);
    const [ eventFormData, setEventFormData ] = useState(
        {start: '', end: '', title: '', description: ''}
    );

    function generateDates(year, month) {
        const dateArray = [];
        const dayMonthBegins = new Date(year, month, 1).getDay();
        for (let i = 0; i < 42; i++) {
            let dayValue = i - dayMonthBegins;
            if (i >= dayMonthBegins) {
                dayValue++;
            };
            dateArray.push(new Date(year, month, dayValue));
        };
        return dateArray;
    };

    function changeMonth(direction) {
        let year = calendarDates[10].getFullYear();
        let month = calendarDates[10].getMonth();
        if (direction === 'next') month++;
        if (direction === 'previous') month--;
        setCalendarDates(generateDates(year, month));
    };

    function updateEventFormData(name, value) {
        setEventFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    function addNewEvent() {
        const newEvent = {
            ...eventFormData,
            id: nanoid(),
        };
        setEvents((prevEvents) => [
            ...prevEvents,
            newEvent
        ]);
    };

    const monthName = (() => {
        const monthArray = 
            ['January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'];
        return monthArray[calendarDates[10].getMonth()];
    })();

    return (
        <main className='App'>
            <EventsPanel 
                events={events}
                eventFormData={eventFormData}
                addNewEvent={addNewEvent}
                updateEventFormData={updateEventFormData}
            />
            <Calendar 
                currentDate={currentDate}
                calendarDates={calendarDates}
                monthName={monthName}
                changeMonth={changeMonth}
                setSelectedDate={setSelectedDate}
            />
            <DayPanel 
                currentDate={currentDate}
                selectedDate={selectedDate}
            />
        </main>
    );
};