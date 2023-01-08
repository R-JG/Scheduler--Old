import React, { useEffect, useRef } from 'react';
import DayPanelEvent from './DayPanelEvent';
import './css/DayPanel.css';

export default function DayPanel(props) {

    const { 
        calendarDates,
        currentDate,
        selection,
        eventFormData,
        events,
        editEventMode,
        timeSelectMode,
        setTimeSelectMode,
        stageEventEdit,
        endEventEdit,
        editEvent,
        deleteEvent,
        updateEventFormValue,
        updateEventFormTimes
    } = props;

    const dayPanelRef = useRef(null);

    useEffect(() => {
        scrollToDate(currentDate);
    }, []);

    useEffect(() => {
        if ((selection.type === 'date') 
        && (editEventMode === false)) {
            scrollToDate(selection.value);
        };
        if (selection.type === 'event') {
            scrollToEvent(selection.value);
        };
    }, [selection]);

    function getCalendarDateIndex(dateObject) {
        return calendarDates.findIndex((date) => (
            date.toDateString() === dateObject.toDateString()
        ));
    };

    function scrollToDate(dateObject) {
        const dateIndex = getCalendarDateIndex(dateObject);
        dayPanelRef.current.children[dateIndex + 1].scrollIntoView(
            {behavior: 'smooth', block: 'start'}
        );
    };

    function scrollToEvent(eventObject) {
        if (typeof eventObject !== 'object') return;
        const eventIndex = events.findIndex((eventItem) => (
            eventItem.id === eventObject.id
        ));
        dayPanelRef.current.children[0].children[eventIndex].scrollIntoView(
            {behavior: 'smooth', block: 'start'}
        );
    };

    function delegateClickForHourSelection(e) {
        if (!timeSelectMode.eventStart 
            && !timeSelectMode.eventEnd) return;
        if (!(e.target.classList.contains('hour'))) return;
        const idArray = e.target.id.split(' ');
        const hourValue = idArray.pop();
        const dateValue = idArray.join(' ');
        const nextDate = new Date(dateValue)
        nextDate.setHours(hourValue);
        updateEventFormTimes(nextDate);
    };

    function convertHourFormat(hour) {
        if (hour === 0) return '12:00 AM';
        if (hour === 12) return '12:00 PM';
        if (hour > 12) return `${hour - 12}:00 PM`;
        return `${hour}:00 AM`;
    };

    function renderAsSubsidiaryMonth(date) {
        return (date.getMonth() !== calendarDates[10].getMonth())
            ? 'subsidiary-month'
            : '';
    };

    const hoursOfDayElementArrayFactory = (date) => Array.from(
        {length: 24}, 
        (value, index) => {
            const id = `${date.toDateString()} ${index}`
            return (
            <div 
                key={id} 
                className='hour'
                id={id}>
                <div className='hour-text'>
                    {convertHourFormat(index)}
                </div>
            </div>
        );}
    );

    const dailyHourBlockElements = calendarDates.map(
        (date) => (
            <div 
                key={date.toDateString()}
                className={
                    `full-day-hour-block 
                     ${renderAsSubsidiaryMonth(date)}`}
            >
                <div className='date-separator'>
                    {date.toDateString()}
                </div>
                {hoursOfDayElementArrayFactory(date)}
            </div>
        )
    );

    // IIFE that returns an array of event components with properties for grid row to position
    // them vertically according to their start and end time, and for grid column to position them
    // horizontally, stacked from the left according to whether or not the event would overlap with another.
    const eventComponents = (() => {
        let eventOverlapRecord = [];
        const elementArray = events.reduce((accumulator, currentEvent) => {
            if ((currentEvent.end.valueOf() <= calendarDates[0].valueOf()) 
            || (currentEvent.start.valueOf() >= calendarDates[41].valueOf())) {
                return accumulator;
            };
            let startDateIndex = getCalendarDateIndex(currentEvent.start);
            let endDateIndex = getCalendarDateIndex(currentEvent.end);
            if (startDateIndex === -1) startDateIndex = 0;
            if (endDateIndex === -1) endDateIndex = 41;
            const gridRowStart = (startDateIndex * 24) + (currentEvent.start.getHours() + 1);
            const gridRowEnd = (endDateIndex * 24) + (currentEvent.end.getHours() + 2);
            let gridColumnStart;
            for (let i = 2; i <= (events.length + 1); i++) {
                const isOverlapping = eventOverlapRecord.some((event) => {
                    if (event.gridColumnStart === i) {
                        return ((event.gridRowStart < gridRowEnd) 
                        && (event.gridRowEnd > gridRowStart));
                    };
                });
                if (!isOverlapping) {
                    gridColumnStart = i;
                    break;
                };
            };
            const gridColumnEnd = gridColumnStart + 1;
            eventOverlapRecord.push({
                gridRowStart,
                gridRowEnd,
                gridColumnStart,
                gridColumnEnd
            });
            const gridItemStyle = {
                gridRow: `${gridRowStart} / ${gridRowEnd}`,
                gridColumn: `${gridColumnStart} / ${gridColumnEnd}`,
                backgroundColor: `hsl(${currentEvent.color})`
            };
            accumulator.push(
                <DayPanelEvent 
                    key={'DayPanel' + currentEvent.id}
                    event={currentEvent}
                    gridItemStyle={gridItemStyle}
                    selection={selection}
                    eventFormData={eventFormData}
                    editEventMode={editEventMode}
                    timeSelectMode={timeSelectMode}
                    setTimeSelectMode={setTimeSelectMode}
                    stageEventEdit={stageEventEdit}
                    endEventEdit={endEventEdit}
                    editEvent={editEvent}
                    deleteEvent={deleteEvent}
                    updateEventFormValue={updateEventFormValue}
                />
            );
            return accumulator;
        }, []);
        return elementArray;
    })();

    return (
        <div 
            ref={dayPanelRef} 
            className='DayPanel'
            onClick={delegateClickForHourSelection}>
            <div className='events-container--day-panel'>
                {eventComponents}
            </div>
            {dailyHourBlockElements}
        </div>
    );
};