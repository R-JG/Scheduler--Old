import React from 'react';
import './css/CalendarSquare.css'

export default function CalendarSquare(props) {

    const { 
        date, 
        currentDate, 
        calendarDates,
        setSelectedDate,
        updateEventFormTimes
    } = props;

    function handleClick() {
        setSelectedDate(date.toDateString());
        updateEventFormTimes(date);
    };

    function renderAsCurrentDate() {
        return (date.toDateString() === currentDate.toDateString()) 
            ? 'current-date'
            : ''
    };

    function renderAsCurrentMonth() {
        return (date.getMonth() !== calendarDates[10].getMonth())
            ? 'not-current-month'
            : ''
    };

    return (
        <div 
            className={
                `CalendarSquare
                 ${renderAsCurrentDate()}
                 ${renderAsCurrentMonth()}`
            }
            onClick={handleClick}
        >
            <div className={`date`}>
                {date.getDate()}
            </div>
        </div>
    );
};