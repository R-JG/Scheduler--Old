import React, { useState } from 'react';
import Calendar from './components/Calendar';
import EventPanel from './components/EventPanel';
import DayPanel from './components/DayPanel';
import './App.css';
import { nanoid } from 'nanoid';

export default function App() {

    const [ currentDate ] = useState(new Date()); 
    const [ calendarDates, setCalendarDates ] = useState(
        generateDates(currentDate.getFullYear(), currentDate.getMonth())
    );
    const [ selectedDate, setSelectedDate ] = useState(currentDate);
    const [ events, setEvents ] = useState([]);
    const [ eventFormData, setEventFormData ] = useState(
        {start: '', end: '', title: '', description: ''}
    );
    const [ timeSelectMode, setTimeSelectMode ] = useState(
        {eventStart: false, eventEnd: false}
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

    function updateEventFormValue(key, value) {
        setEventFormData((prevData) => ({
            ...prevData,
            [key]: value
        }));
    };

    function updateEventFormTimes(date) {
        let key;
        if (timeSelectMode.eventStart) {
            if (
                (eventFormData.end !== '') 
                && (date.valueOf() > eventFormData.end.valueOf())
            ) return;
            key = 'start';
        }else if (timeSelectMode.eventEnd) {
            if (date.valueOf() < eventFormData.start.valueOf()) return;
            key = 'end';
        } else return; 
        updateEventFormValue(key, date);
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

    return (
        <main className='App'>
            <EventPanel 
                events={events}
                eventFormData={eventFormData}
                timeSelectMode={timeSelectMode}
                setTimeSelectMode={setTimeSelectMode}
                setEventFormData={setEventFormData}
                addNewEvent={addNewEvent}
                updateEventFormValue={updateEventFormValue}
            />
            <Calendar 
                currentDate={currentDate}
                calendarDates={calendarDates}
                selectedDate={selectedDate}
                changeMonth={changeMonth}
                setSelectedDate={setSelectedDate}
                updateEventFormTimes={updateEventFormTimes}
            />
            <DayPanel 
                currentDate={currentDate}
                selectedDate={selectedDate}
            />
        </main>
    );
};