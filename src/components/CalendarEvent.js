import React from 'react';
import './css/CalendarEvent.css';

export default function CalendarEvent(props) {

    const { 
        event, 
        gridCoordinates
    } = props;

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
            gridRow: `${block.rowStart} / ${block.rowEnd}`
        };
        return (
            <div
                key={gridItemStyle.gridRow}
                className='event-block'
                style={gridItemStyle}
            >
                TEST
            </div>
        );
    });

    return (
        <div className='CalendarEvent calendar-grid'>
            {eventBlockElements}
        </div>
    );
};