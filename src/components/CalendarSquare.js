import React from 'react';
import './css/CalendarSquare.css'

export default function CalendarSquare(props) {

    const { 
        date, 
        currentDate, 
        calendarDates,
        selectedDate,
        setSelectedDate,
        updateEventFormTimes
    } = props;

    function handleClick() {
        setSelectedDate(date);
        updateEventFormTimes(date);
    };

    function renderAsSelectedDate() {
        return (date.toDateString() === selectedDate.toDateString())
            ? 'selected-date' 
            : '';
    };

    function renderAsCurrentDate() {
        return (date.toDateString() === currentDate.toDateString()) 
            ? 'current-date'
            : '';
    };

    function renderAsCurrentMonth() {
        return (date.getMonth() !== calendarDates[10].getMonth())
            ? 'not-current-month'
            : '';
    };

    return (
        <div 
            className={
                `CalendarSquare
                 ${renderAsSelectedDate()}
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