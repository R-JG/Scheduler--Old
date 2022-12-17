import React, { useState } from 'react';
import CalendarSquare from './components/CalendarSquare';
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

    const monthName = (() => {
        const monthArray = 
            ['January', 'February', 'March', 'April', 'May', 'June', 
            'July', 'August', 'September', 'October', 'November', 'December'];
        return monthArray[calendarDates[10].getMonth()];
    })();

    const calendarSquares = calendarDates.map((date) => (
        <CalendarSquare 
            key={date}
            date={date}
        />
    ));

    return (
        <main className='App'>
            <h1 className='month-name'>{monthName}</h1>
            <div className='calendar-container'>
                {calendarSquares}
            </div>
        </main>
    );
};