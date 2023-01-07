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
    const [ selection, setSelection ] = useState({type: 'date', value: currentDate});
    const [ events, setEvents ] = useState([]);
    const [ eventFormData, setEventFormData ] = useState(
        {start: '', end: '', title: '', description: ''}
    );
    const [ timeSelectMode, setTimeSelectMode ] = useState(
        {eventStart: false, eventEnd: false}
    );
    const [ createEventMode, setCreateEventMode ] = useState(false);
    const [ editEventMode, setEditEventMode ] = useState(false);

    function generateDates(year, month) {
        const dateArray = [];
        const dayMonthBegins = new Date(year, month, 1).getDay();
        for (let i = 0; i < 42; i++) {
            let dayValue = i - dayMonthBegins + 1;
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

    function updateSelection(type, value) {
        setSelection({type, value});
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
            if ((eventFormData.end !== '') 
                && (date.valueOf() > eventFormData.end.valueOf())
            ) return;
            key = 'start';
        }else if (timeSelectMode.eventEnd) {
            if (date.valueOf() < eventFormData.start.valueOf()) return;
            key = 'end';
        } else return; 
        updateEventFormValue(key, date);
        if ((key === 'start') && (eventFormData.end === '')) 
            setTimeSelectMode({eventStart: false, eventEnd: true});
    };

    function clearEventFormData() {
        setEventFormData(
            {start: '', end: '', title: '', description: ''}
        );
    };

    function addNewEvent() {
        const newEvent = {
            ...eventFormData,
            id: nanoid(),
            color: getRandomHSLColor()
        };
        setEvents((prevEvents) => [
            ...prevEvents,
            newEvent
        ]);
    };

    function stageEventEdit(eventToEdit) {
        if (createEventMode) return;
        setEventFormData({...eventToEdit});
        setEditEventMode(true);
    };

    function endEventEdit() {
        clearEventFormData();
        setTimeSelectMode({eventStart: false, eventEnd: false});
        setEditEventMode(false);
    };

    function editEvent(eventToEdit) {
        const eventIndex = events.findIndex((event) => (
            event.id === eventToEdit.id
        ));
        setEvents((prevEvents) => {
            const newEvents = [...prevEvents]
            newEvents.splice(eventIndex, 1, eventFormData);
            return newEvents;
        });
        endEventEdit();
    };

    function deleteEvent(eventToDelete) {
        const eventIndex = events.findIndex((event) => (
            event.id === eventToDelete.id
        ));
        setEvents((prevEvents) => {
            const newEvents = [...prevEvents]
            newEvents.splice(eventIndex, 1);
            return newEvents;
        });
        if (editEventMode) {
            endEventEdit();
        };
    };

    function getRandomHSLColor() {
        const randomNumber = Math.floor(Math.random() * 361);
        return `${randomNumber}, 100%, 50%`;
    };

    return (
        <main className='App'>
            <Calendar 
                currentDate={currentDate}
                calendarDates={calendarDates}
                selection={selection}
                events={events}
                eventFormData={eventFormData}
                changeMonth={changeMonth}
                updateSelection={updateSelection}
                updateEventFormTimes={updateEventFormTimes}
            />
            <div className='main--second-section'>
                {!createEventMode && 
                <div className='second-section-header'>
                    <button
                        className='button--create-event'
                        onClick={() => (!editEventMode) ? setCreateEventMode(true) : undefined}
                    >
                        Create Event
                    </button>
                </div>}
                {createEventMode &&
                <EventPanel 
                    events={events}
                    eventFormData={eventFormData}
                    timeSelectMode={timeSelectMode}
                    setTimeSelectMode={setTimeSelectMode}
                    setCreateEventMode={setCreateEventMode}
                    clearEventFormData={clearEventFormData}
                    addNewEvent={addNewEvent}
                    updateEventFormValue={updateEventFormValue}
                />}
                <DayPanel 
                    calendarDates={calendarDates}
                    currentDate={currentDate}
                    selection={selection}
                    eventFormData={eventFormData}
                    events={events}
                    editEventMode={editEventMode}
                    timeSelectMode={timeSelectMode}
                    setTimeSelectMode={setTimeSelectMode}
                    stageEventEdit={stageEventEdit}
                    endEventEdit={endEventEdit}
                    editEvent={editEvent}
                    deleteEvent={deleteEvent}
                    updateEventFormValue={updateEventFormValue}
                />
            </div>
        </main>
    );
};