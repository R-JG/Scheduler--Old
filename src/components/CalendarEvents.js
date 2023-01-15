import React from 'react';
import './css/CalendarEvents.css';

export default function CalendarEvents(props) {

    const { 
        calendarDates, 
        events,
        eventFormData,
        editEventMode,
        selection,
        updateSelection
    } = props;

    function handleEventRowClick(event) {
        if (editEventMode && (eventFormData.id !== event.id)) return;
        updateSelection('event', event);
    };

    function renderAsSelectedEvent(event) {
        if (selection.type !== 'event') return;
        return (selection.value.id === event.id)
            ? 'selected-event' 
            : '';
    };

    // Derive the grid item coordinates corresponding to each date in calendarDates, 
    // which is a set of 42 that gets arranged in a 7 x 6 rectangle, via their index numbers. 
    const dateGridItemCoordinates = calendarDates.map((date, index) => (
        {
            date,
            columnStart: index % 7 + 1,
            columnEnd: index % 7 + 2,
            rowStart: Math.ceil((index + 1) / 7),
            rowEnd: Math.ceil((index + 1) / 7) + 1
        }
    ));

    // Create an array of six arrays representing each of the six rows on the calendar.
    // Each row array is filled with objects representing each event that occupies the row.
    //
    // First, filter the total set of coordinates for each of the 42 calendar dates to return
    // only the dates taken up by the current event in the reduce loop.
    // Then, build rowsArray by creating only one object for each different row, with column 
    // start and end being defined by the first and last item in the set of items within the
    // array which share the same row property.
    // Then, distribute the objects in rowsArray to the array in the accumulator corresponding
    // to the its row number. 
    const eventRows = events.reduce((accumulator, eventItem) => {
        const eventGridItemCoordinates = dateGridItemCoordinates.filter((gridItem) => {
            return ((gridItem.date.toDateString() === eventItem.start.toDateString())
            || (gridItem.date.toDateString() === eventItem.end.toDateString())
            || (((gridItem.date.valueOf() >= eventItem.start.valueOf())
            && (gridItem.date.valueOf() <= eventItem.end.valueOf()))));
        });
        if (eventGridItemCoordinates.length === 0) return accumulator;
        const eventRowFactory = (index) => {
            const isFirstRow = (index === 0);
            return {
                event: eventItem,
                columnStart: eventGridItemCoordinates[index].columnStart,
                columnEnd: eventGridItemCoordinates[index].columnEnd,
                rowStart: eventGridItemCoordinates[index].rowStart,
                isFirstRow
            };
        };
        let rowsArray = [eventRowFactory(0)];
        for (let i = 1; i < eventGridItemCoordinates.length; i++) {
            if ((eventGridItemCoordinates[i].rowStart) 
                > (eventGridItemCoordinates[i - 1].rowStart)) {
                    const newEventRow = eventRowFactory(i);
                    rowsArray.push(newEventRow);
            };
            rowsArray[rowsArray.length - 1]
                .columnEnd = eventGridItemCoordinates[i].columnEnd;
        };
        rowsArray.forEach((row) => accumulator[row.rowStart - 1].push(row));
        return accumulator;
    }, [[], [], [], [], [], []]);

    // Sort the event rows so that the longer ones are placed first in each array of rows.
    eventRows.forEach((row) => row.sort((a, b) => {
        const aLength = a.columnEnd - a.columnStart;
        const bLength = b.columnEnd - b.columnStart;
        if (bLength > aLength) return 1;
    }));

    // For each row array, create elements for each event in the row, and place them in
    // a grid container element representing the calendar row.
    const rowElements = eventRows.map((row, rowIndex) => {
        const eventElements = row.map((eventRow, eventIndex) => {
            let overlapCount = 1;
            eventRows[rowIndex].forEach((event, index) => {
                if ((index < eventIndex) && ((eventRow.columnStart < event.columnEnd) 
                && (eventRow.columnEnd > event.columnStart))) {
                    overlapCount++;
                };
            });
            const style = {
                gridColumn: `${eventRow.columnStart} / ${eventRow.columnEnd}`,
                gridRow: `${overlapCount} / ${overlapCount + 1}`,
                backgroundColor: `hsl(${eventRow.event.color})`,
            };
            return (
                <div
                    key={eventRow.rowStart + eventRow.event.id}
                    className={`event-row ${renderAsSelectedEvent(eventRow.event)}`}
                    style={style}
                    onClick={() => handleEventRowClick(eventRow.event)}
                >
                    {(eventRow.isFirstRow) 
                    && 
                    <div className='event-title'>
                        {eventRow.event.title}
                    </div>}
                </div>
            );
        });
        return (
            <div 
                key={rowIndex}
                className='event-row-container'>
                {eventElements}
            </div>
        );
    });

    return (
        <div className='CalendarEvents'>
            {rowElements}
        </div>
    );
};