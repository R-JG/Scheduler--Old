import React from 'react';
import './css/CalendarEvent.css';

export default function CalendarEvent(props) {

    const { 
        event,
        gridCoordinates,
        selection,
        updateSelection,
    } = props;

    function handleClick() {
        updateSelection('event', event);
    };

    function renderAsSelectedEvent() {
        if (selection.type !== 'event') return;
        return (selection.value.id === event.id)
            ? 'selected-event' 
            : '';
    };

    const eventBlocks = (() => {
        const eventBlockFactory = (index) => ({
            columnStart: gridCoordinates[index].columnStart,
            columnEnd: gridCoordinates[index].columnEnd,
            rowStart: gridCoordinates[index].rowStart,
            rowEnd: gridCoordinates[index].rowEnd
        });
        let blocksArray = [eventBlockFactory(0)];
        for (let i = 1; i < gridCoordinates.length; i++) {
            if ((gridCoordinates[i].rowStart) 
                > (gridCoordinates[i - 1].rowStart)) {
                    const newBlock = eventBlockFactory(i);
                    blocksArray.push(newBlock);
            };
            blocksArray[blocksArray.length - 1]
                .columnEnd = gridCoordinates[i].columnEnd;
        };
        return blocksArray;
    })();

    const eventBlockElements = eventBlocks.map((block) => {
        const gridItemStyle = {
            gridColumn: `${block.columnStart} / ${block.columnEnd}`,
            gridRow: `${block.rowStart} / ${block.rowEnd}`,
            backgroundColor: `hsl(${event.color})`
        };
        return (
            <div
                key={gridItemStyle.gridRow}
                className={`event-block ${renderAsSelectedEvent()}`}
                style={gridItemStyle}
                onClick={handleClick}
            >
                {(eventBlocks[0] === block) 
                && <div className='event-title'>{event.title}</div>}
            </div>
        );
    });

    return (
        <div className='CalendarEvent calendar-grid'>
            {eventBlockElements}
        </div>
    );
};