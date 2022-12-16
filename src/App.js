import React, { useState } from 'react';
import './App.css';

export default function App() {

    const [ currentDate, setCurrentDate ] = useState(new Date()); 
    const [ calendarDates, setCalendarDates ] = useState(
        generateDates(currentDate.getFullYear(), currentDate.getMonth())
    );

    function generateDates(year, month) {
        const dateArray = [];
        const dayMonthBegins = new Date(year, month, 1).getDay();
        for (let i = 0; i < 35; i++) {
            let dayValue = i - dayMonthBegins;
            if (i >= dayMonthBegins) {
                dayValue++;
            };
            dateArray.push(new Date(year, month, dayValue));
        };
        return dateArray;
    };

    // events will be updated independently in state, saved in local storage, and rendered upon the condition that the date object corresponds with the date saved with the event. 

    console.log(calendarDates);

    return (
        <main>
            <div className='calendar-container'></div>
        </main>
    );
};