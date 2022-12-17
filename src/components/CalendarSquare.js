import React from 'react';
import './css/CalendarSquare.css'

export default function CalendarSquare(props) {

    const { 
        date, 
        currentDate, 
        calendarDates,
        setSelectedDate
    } = props;

    function renderAsCurrentDate() {
        return (date.toDateString() === currentDate.toDateString()) 
            ? 'current-date'
            : ''
    };

    function renderAsCurrentMonth() {
        return (date.getMonth() !== calendarDates[10].getMonth())
            ? 'current-month'
            : ''
    };

    return (
        <div 
            className={
                `CalendarSquare
                 ${renderAsCurrentDate()}
                 ${renderAsCurrentMonth()}`
            }
            onClick={() => setSelectedDate(date.toDateString())}
        >
            <div className={`date`}>
                {date.getDate()}
            </div>
        </div>
    );
};