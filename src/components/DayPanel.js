import React from 'react';
import './css/DayPanel.css';

export default function DayPanel(props) {

    const { 
        currentDate,
        selectedDate
    } = props;

    function convertHourFormat(hour) {
        if (hour === 0) return '12:00 AM';
        if (hour === 12) return '12:00 PM';
        if (hour > 12) return `${hour - 12}:00 PM`;
        return `${hour}:00 AM`;
    };

    function renderAsCurrentHour(index) {
        return ((currentDate.getHours() === index) 
        && (currentDate.toDateString() 
            === selectedDate.toDateString())) 
            ? 'current-hour' 
            : '';
    };

    const hourBlocks = Array.from(
        {length: 24}, 
        (value, index) => (
            <div 
                key={index}
                className={`
                    hour-block
                     ${renderAsCurrentHour(index)}
                `}
            >
                <div className='hour'>
                    {convertHourFormat(index)}
                </div>
            </div>
        )
    );

    return (
        <div className='DayPanel'>
            <h1 className='selected-date--title'>
                {selectedDate.toDateString()}
            </h1>
            {hourBlocks}
        </div>
    );
};