import React from 'react';
import './css/DayPanelEvent.css';

export default function DayPanelEvent(props) {

    const { 
        event, 
        gridItemStyle, 
        selection,
        deleteEvent
    } = props;

    return (
        <div 
            className='event-column'
            style={gridItemStyle}
            >
                {(event.id === selection.value.id) 
                && 
                <div 
                    className='expanded-event-column'
                    style={{backgroundColor: `hsl(${event.color})`}}
                    >
                        <button 
                            className='button--delete-event'
                            onClick={() => deleteEvent(event)}
                        >
                            Delete Event
                        </button>
                        <h1>{event.title}</h1>
                        <p>{event.description}</p>
                </div>}
        </div>
    );
};