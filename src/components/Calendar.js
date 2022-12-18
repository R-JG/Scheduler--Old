import React from 'react';
import CalendarSquare from './CalendarSquare';
import './css/Calendar.css';

export default function Calendar(props) {

    const { 
        currentDate, 
        calendarDates, 
        monthName,
        changeMonth,
        setSelectedDate,
        updateEventFormTimes
    } = props;

    const calendarSquares = calendarDates.map((date) => (
        <CalendarSquare 
            key={date.toDateString()}
            date={date}
            currentDate={currentDate}
            calendarDates={calendarDates}
            setSelectedDate={setSelectedDate}
            updateEventFormTimes={updateEventFormTimes}
        />
    ));

    return (
        <div className='Calendar'>
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
        </div>
    );
};