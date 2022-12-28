import React, { useState, useEffect, useRef } from 'react';
import './css/DayPanel.css';

export default function DayPanel(props) {

    const { 
        calendarDates,
        currentDate,
        selection,
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

    function scrollToDate(dateObject) {
        const dateIndex = calendarDates.findIndex((date) => (
            date.toDateString() === dateObject.toDateString()
        ));
        const targetHour = (dateIndex * 24) + 12;
        dayPanelRef.current.children[targetHour].scrollIntoView(
            {behavior: 'smooth', block: 'center'}
        );
    };

    function scrollToEvent(eventObject) {
        if (typeof eventObject !== 'object') return;
        const dateIndex = calendarDates.findIndex((date) => (
            date.toDateString() === eventObject.start.toDateString()
        ));
        const targetHour = (dateIndex * 24) + eventObject.start.getHours();
        dayPanelRef.current.children[targetHour].scrollIntoView(
            {behavior: 'smooth', block: 'center'}
        );
    };

    function convertHourFormat(hour) {
        if (hour === 0) return '12:00 AM';
        if (hour === 12) return '12:00 PM';
        if (hour > 12) return `${hour - 12}:00 PM`;
        return `${hour}:00 AM`;
    };

    // Changes to make:
    // try putting the 24h divs into their own div container so that there might be scroll events per day 
    // this would not visually affect the list 

    const hoursOfDayElementArrayFactory = () => Array.from(
        {length: 24}, 
        (value, index) => {
            return (
            <div 
                key={index}
                className={`
                    hour-block
                `}
            >
                <div className='hour'>
                    {convertHourFormat(index)}
                </div>
            </div>
        );}
    );

    const totalSetOfHourElements = calendarDates.map(
        (date) => hoursOfDayElementArrayFactory(date)
    );

    return (
        <div ref={dayPanelRef} className='DayPanel'>
            {totalSetOfHourElements}
        </div>
    );
};