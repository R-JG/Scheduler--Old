import React from 'react';
import './css/CalendarDate.css'

export default function CalendarDate(props) {

    const { 
        date, 
        currentDate, 
        calendarDates,
        selection,
        eventFormData,
        updateSelection,
        updateEventFormTimes
    } = props;

    function handleMouseDown() {
        updateSelection('date', date);
        updateEventFormTimes(date);
    };

    function handleMouseOver(event) {
        if (event.buttons) updateEventFormTimes(date);
    };

    function renderAsSelectedDate() {
        if (selection.type !== 'date') return;
        return (date.toDateString() === selection.value.toDateString())
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

    function renderAsFormDateSelection() {
        if ((eventFormData.start !== '') && (eventFormData.end === '')) {
            return (date.toDateString() === eventFormData.start.toDateString())
                ? 'form-date-selection'
                : '';
        } else if((eventFormData.start === '') && (eventFormData.end !== '')) {
            return (date.toDateString() === eventFormData.end.toDateString())
                ? 'form-date-selection'
                : '';
        } else {
            return ((date.valueOf() >= eventFormData.start.valueOf())
            && (date.valueOf() <= eventFormData.end.valueOf())) 
                ? 'form-date-selection'
                : '';
        };
    };

    return (
        <div 
            className={
                `CalendarDate
                 ${renderAsSelectedDate()}
                 ${renderAsCurrentDate()}
                 ${renderAsCurrentMonth()}
                 ${renderAsFormDateSelection()}`
            }
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
        >
            <div className={`date`}>
                {date.getDate()}
            </div>
        </div>
    );
};