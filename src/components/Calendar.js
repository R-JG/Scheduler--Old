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
        editEventMode,
        timeSelectMode,
        changeMonth,
        updateSelection,
        updateEventFormTimes
    } = props;

    const createMonthName = () => {
        const monthArray = 
            ['January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'];
        return monthArray[calendarDates[10].getMonth()];
    };

    // Create components for each date in calendarDates.
    const calendarDateComponentsArray = calendarDates.map((date, index) => (
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
                <h1 className='month'>{createMonthName()}</h1>
                <h1 className='year'>{calendarDates[10].getFullYear()}</h1>
                <button 
                    className='header-button next-month'
                    onClick={() => changeMonth('next')}
                >→</button>
            </div>
            <div className='calendar-container'>
                {calendarDateComponentsArray}
            </div>
            <CalendarEvents 
                calendarDates={calendarDates}
                events={events}
                eventFormData={eventFormData}
                editEventMode={editEventMode}
                selection={selection}
                updateSelection={updateSelection}
            />
        </div>
    );
};