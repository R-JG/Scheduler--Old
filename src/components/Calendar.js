import React from 'react';
import CalendarDate from './CalendarDate';
import CalendarEvents from './CalendarEvents';
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

    /*
    const CalendarEventComponents = events.reduce((accumulator, eventItem, index) => {
        const eventGridItemCoordinates = dateGridItemCoordinates.filter((gridItem) => {
                return ((gridItem.date.toDateString() === eventItem.start.toDateString())
                || (gridItem.date.toDateString() === eventItem.end.toDateString())
                || (((gridItem.date.valueOf() >= eventItem.start.valueOf())
                    && (gridItem.date.valueOf() <= eventItem.end.valueOf()))));
            }
        );
        const rowOrderStyle = {
            zIndex: `${index + 50}`,
            bottom: `${5 * index}%`,
            left: `${1.5 * index}%`
        };
        if (eventGridItemCoordinates.length !== 0) accumulator.push(
            <CalendarEvent 
                key={eventItem.id}
                event={eventItem}
                gridCoordinates={eventGridItemCoordinates}
                rowOrderStyle={rowOrderStyle}
                selection={selection}
                updateSelection={updateSelection}
            />
        );
        return accumulator;
    }, []);
    */

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
            <CalendarEvents 
                calendarDates={calendarDates}
                events={events}
                selection={selection}
                updateSelection={updateSelection}
            />
        </div>
    );
};