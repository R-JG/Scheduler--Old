import React, { useState } from 'react';
import CalendarSquare from './components/CalendarSquare';
import './App.css';

export default function App() {

    const [ currentDate ] = useState(new Date()); 
    const [ calendarDates, setCalendarDates ] = useState(
        generateDates(currentDate.getFullYear(), currentDate.getMonth())
    );

    function generateDates(year, month) {
        const dateArray = [];
        const dayMonthBegins = new Date(year, month, 1).getDay();
        for (let i = 0; i < 42; i++) {
            let dayValue = i - dayMonthBegins;
            if (i >= dayMonthBegins) {
                dayValue++;
            };
            dateArray.push(new Date(year, month, dayValue));
        };
        return dateArray;
    };

    function changeMonth(direction) {
        let year = calendarDates[10].getFullYear();
        let month = calendarDates[10].getMonth();
        if (direction === 'next') month++;
        if (direction === 'previous') month--;
        setCalendarDates(generateDates(year, month));
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
            <div className='calendar-header'>
                <button 
                    className='header-button previous-month'
                    onClick={() => changeMonth('previous')}
                >←</button>
                <h1 className='month'>{monthName}</h1>
                <h1 className='year'>{calendarDates[10].getFullYear()}</h1>
                <button 
                    className='header-button next-month'
                    onClick={() => changeMonth('next')}
                >→</button>
            </div>
            <div className='calendar-container'>
                {calendarSquares}
            </div>
        </main>
    );
};