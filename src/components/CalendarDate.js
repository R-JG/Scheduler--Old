import React from 'react';
import './css/CalendarDate.css'

export default function CalendarDate(props) {

    const { 
        date, 
        currentDate, 
        calendarDates,
        selection,
        eventFormData,
        timeSelectMode,
        updateSelection,
        updateEventFormTimes
    } = props;

    // Call the function to update the time values of the form data, 
    // with the condition that, when setting the end value, 
    // it is set to the end of the given date, as that would be the assumption in
    // selecting a date as an end.  
    function updateEventFormTimesFromCalendar() {
        if (timeSelectMode.eventEnd) date.setHours(23, 59, 59, 999);
        updateEventFormTimes(date);
    };

    function handleMouseDown() {
        updateSelection('date', date);
        updateEventFormTimesFromCalendar();
    };

    function handleMouseOver(event) {
        if (event.buttons) updateEventFormTimesFromCalendar();
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

    function renderAsSubsidiaryMonth() {
        return (date.getMonth() !== calendarDates[10].getMonth())
            ? 'subsidiary-month'
            : '';
    };
    
    // note: first condition checks whether the date is equal to the start date of the event,
    // the second condition after the disjunction checks this for the event end, 
    // and the third checks for whether the date falls in between.
    // The first two conditions are conjunctions beginning with a type check to avoid a crash.
    function renderAsFormDateSelection() {
        if (((typeof eventFormData.start === 'object') 
            && (date.toDateString() === eventFormData.start.toDateString()))
        || ((typeof eventFormData.end === 'object') 
            && (date.toDateString() === eventFormData.end.toDateString()))
        || (((date.valueOf() >= eventFormData.start.valueOf())
        && (date.valueOf() <= eventFormData.end.valueOf())))) {
            return 'form-date-selection';
        };
        return '';
    };
  
    return (
        <div 
            className={
                `CalendarDate
                 ${renderAsSelectedDate()}
                 ${renderAsCurrentDate()}
                 ${renderAsSubsidiaryMonth()}
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