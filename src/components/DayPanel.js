import React, { useState, useEffect, useRef } from 'react';
import './css/DayPanel.css';

export default function DayPanel(props) {

    const { 
        calendarDates,
        currentDate,
        selection,
        events,
        deleteEvent
    } = props;

    const dayPanelRef = useRef(null);

    useEffect(() => {
        scrollToDate(currentDate);
    }, []);

    useEffect(() => {
        if (selection.type === 'date') {
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
        const dateIndex = getCalendarDateIndex(eventObject.start);
        dayPanelRef.current.children[dateIndex + 1].scrollIntoView(
            {behavior: 'smooth', block: 'start'}
        );
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

    const hoursOfDayElementArrayFactory = () => Array.from(
        {length: 24}, 
        (value, index) => {
            return (
            <div key={index} className='hour'>
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
                     ${renderAsSubsidiaryMonth(date)}`
                }
            >
                <div className='date-separator'>
                    {date.toDateString()}
                </div>
                {hoursOfDayElementArrayFactory()}
            </div>
        )
    );

    // refactor this to be a separate component:
    const eventColumnElements = (() => {
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
            const gridRowStart = (startDateIndex * 24) + 1;
            const gridRowEnd = ((endDateIndex + 1) * 24) + 1;
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
                <div 
                    key={'DayPanel' + currentEvent.id}
                    className='event-column'
                    style={gridItemStyle}
                    >
                        {(currentEvent.id === selection.value.id) 
                        && 
                        <div 
                            className='expanded-event-column'
                            style={{backgroundColor: `hsl(${currentEvent.color})`}}
                            >
                                <button 
                                    className='button--delete-event'
                                    onClick={() => deleteEvent(currentEvent)}
                                >
                                    Delete Event
                                </button>
                                <h1>{currentEvent.title}</h1>
                                <p>{currentEvent.description}</p>
                        </div>}
                </div>
            );
            return accumulator;
        }, []);
        return elementArray;
    })();

    return (
        <div ref={dayPanelRef} className='DayPanel'>
            <div className='events-container--day-panel'>
                {eventColumnElements}
            </div>
            {dailyHourBlockElements}
        </div>
    );
};