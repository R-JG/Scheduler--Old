import React from 'react';
import './css/DayPanel.css';

export default function DayPanel(props) {

    const { 
        selectedDate, 
    } = props;

    function convertHourFormat(hour) {
        if (hour === 0) return '12:00 AM';
        if (hour > 12) return `${hour - 12}:00 PM`;
        return `${hour}:00 AM`;
    };

    const hourBlocks = Array.from(
        {length: 24}, 
        (value, index) => (
            <div 
                key={index}
                className='hour-block'
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
                {selectedDate}
            </h1>
            {hourBlocks}
        </div>
    );
};