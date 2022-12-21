import React from 'react';
import CalendarDate from './CalendarDate';
import CalendarEvent from './CalendarEvent';
import './css/Calendar.css';

export default function Calendar(props) {

    const { 
        currentDate, 
        calendarDates, 
        selectedDate,
        events,
        eventFormData,
        changeMonth,
        setSelectedDate,
        updateEventFormTimes
    } = props;

    const monthName = (() => {
        const monthArray = 
            ['January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'];
        return monthArray[calendarDates[10].getMonth()];
    })();

    const dateGridItemCoordinates = calendarDates.map((date, index) => (
        {
            date,
            columnStart: index % 7 + 1,
            columnEnd: index % 7 + 2,
            rowStart: Math.ceil((index + 1) / 7),
            rowEnd: Math.ceil((index + 1) / 7) + 1
        }
    ));

    const CalendarEventComponents = events.reduce((accumulator, eventItem) => {
        const eventGridItemCoordinates = dateGridItemCoordinates.filter(
            (dateItem) => {
                const dateItemValue = dateItem.date.valueOf()
                return ((dateItemValue >= eventItem.start.valueOf()) 
                && (dateItemValue <= eventItem.end.valueOf()));
            }
        );
        if (eventGridItemCoordinates.length !== 0) accumulator.push(
            <CalendarEvent 
                key={eventItem.id}
                event={eventItem}
                gridCoordinates={eventGridItemCoordinates}
            />
        );
        return accumulator;
    }, []);

    const CalendarDateComponents = calendarDates.map((date, index) => (
        <CalendarDate 
            key={date.toDateString()}
            date={date}
            currentDate={currentDate}
            calendarDates={calendarDates}
            selectedDate={selectedDate}
            eventFormData={eventFormData}
            setSelectedDate={setSelectedDate}
            updateEventFormTimes={updateEventFormTimes}
        />
    ));

    return (
        <div className='Calendar'>
            <div className='calendar-header'>
                <button 
                    className='header-button previous-month'
                    onClick={() => changeMonth('previous')}
                >←</button>
                <h1 className='month'>{monthName}</h1>
                <h1 className='year'>{calendarDates[10].getFullYear()}</h1>
                <button 
                    className='header-button next-month'
                    onClick={() => changeMonth('next')}
                >→</button>
            </div>
            <div className='calendar-container'>
                {CalendarDateComponents}
            </div>
            <div className='events-container'>
                {CalendarEventComponents}
            </div>
        </div>
    );
};