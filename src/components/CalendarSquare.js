import React from 'react';
import './css/CalendarSquare.css'

export default function CalendarSquare(props) {

    const { date } = props;

    return (
        <div className='CalendarSquare'>
            {date.getDate()}
        </div>
    );
};