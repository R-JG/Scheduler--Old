import React from 'react';
import './css/DayPanelEvent.css';

export default function DayPanelEvent(props) {

    const { 
        event, 
        gridItemStyle, 
        selection,
        editEventMode,
        stageEventEdit,
        editEvent,
        deleteEvent
    } = props;

    function renderExpandedEvent() {
        if (!editEventMode) {
            return (
                <div
                    className='expanded-event-column'
                    style={{backgroundColor: `hsl(${event.color})`}}
                >
                    <button 
                        className='button--edit-event'
                        onClick={() => stageEventEdit(event)}
                    >
                        ⛭
                    </button>
                    <h1>{event.title}</h1>
                    <p>{event.description}</p>
                </div>
            );
        };
        if (editEventMode) {
            return (
                <div
                    className='expanded-event-column'
                    style={{backgroundColor: `hsl(${event.color})`}}
                >
                    <button
                        className='button--confirm-edit'
                        onClick={() => editEvent(event)}
                    >
                        Confirm Edit
                    </button>
                    <button 
                        className='button--delete-event'
                        onClick={() => deleteEvent(event)}
                    >
                        Delete Event
                    </button>
                </div>
            );
        };
    };

    return (
        <div 
            className='event-column'
            style={gridItemStyle}
            >
                {(event.id === selection.value.id) 
                && renderExpandedEvent()}
        </div>
    );
};