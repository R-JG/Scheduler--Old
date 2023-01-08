import React from 'react';
import CalendarDate from './CalendarDate';
import CalendarEvent from './CalendarEvent';
import './css/Calendar.css';

export default function Calendar(props) {

    const { 
        currentDate, 
        calendarDates, 
        selection,
        events,
        eventFormData,
        timeSelectMode,
        changeMonth,
        updateSelection,
        updateEventFormTimes
    } = props;

    const monthName = (() => {
        const monthArray = 
            ['January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'];
        return monthArray[calendarDates[10].getMonth()];
    })();

    // Derive the grid item coordinates corresponding to each date in calendarDates, 
    // which is a set of 42 that gets arranged in a 7 x 6 rectangle, via their index numbers. 
    const dateGridItemCoordinates = calendarDates.map((date, index) => (
        {
            date,
            columnStart: index % 7 + 1,
            columnEnd: index % 7 + 2,
            rowStart: Math.ceil((index + 1) / 7),
            rowEnd: Math.ceil((index + 1) / 7) + 1
        }
    ));

    // Create a CalendarEvent component for each event.
    // The component is a grid container matching the dimensions of the Calendar
    // in which there are multiple different rows created at the grid coordinates 
    // of each calendar date that the event covers.
    //
    // The dateGridItemCoordinates array is filtered to return only the coordiantes
    // of the grid pertaining to the event.
    // This set of coordinates for the event is then passed to the component.
    const CalendarEventComponents = events.reduce((accumulator, eventItem) => {
        const eventGridItemCoordinates = dateGridItemCoordinates.filter((gridItem) => {
                return ((gridItem.date.toDateString() === eventItem.start.toDateString())
                || (gridItem.date.toDateString() === eventItem.end.toDateString())
                || (((gridItem.date.valueOf() >= eventItem.start.valueOf())
                    && (gridItem.date.valueOf() <= eventItem.end.valueOf()))));
            }
        );
        if (eventGridItemCoordinates.length !== 0) accumulator.push(
            <CalendarEvent 
                key={eventItem.id}
                event={eventItem}
                gridCoordinates={eventGridItemCoordinates}
                selection={selection}
                updateSelection={updateSelection}
            />
        );
        return accumulator;
    }, []);

    // Create components for each date in calendarDates.
    const CalendarDateComponents = calendarDates.map((date, index) => (
        <CalendarDate 
            key={date.toDateString()}
            date={date}
            currentDate={currentDate}
            calendarDates={calendarDates}
            selection={selection}
            eventFormData={eventFormData}
            timeSelectMode={timeSelectMode}
            updateSelection={updateSelection}
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
            <div className='events-container--calendar'>
                {CalendarEventComponents}
            </div>
        </div>
    );
};