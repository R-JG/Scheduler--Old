import React from 'react';

export default function CalendarSquare(props) {

    const { date } = props;

    return (
        <div>{date.getDate()}</div>
    );
};