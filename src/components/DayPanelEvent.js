import React from 'react';
import './css/DayPanelEvent.css';

export default function DayPanelEvent(props) {

    const { 
        event, 
        gridItemStyle, 
        selection,
        eventFormData,
        editEventMode,
        timeSelectMode,
        setTimeSelectMode,
        stageEventEdit,
        endEventEdit,
        editEvent,
        deleteEvent,
        updateEventFormValue
    } = props;

    function handleSubmit(e) {
        e.preventDefault();
        if (
            (eventFormData.start === '') 
            || (eventFormData.end === '')
            || (eventFormData.title === '')
        ) return;
        editEvent(event);
    };

    function handleChange(e) {
        const { name, value } = e.target;
        updateEventFormValue(name, value);
    };

    function handleSetTimeButtons(e) {
        if (e.target.name === 'start')
        setTimeSelectMode((prevState) => ({
            eventStart: !prevState.eventStart,
            eventEnd: false
        }));
        if (e.target.name === 'end')
        setTimeSelectMode((prevState) => ({
            eventEnd: !prevState.eventEnd,
            eventStart: false
        }));
    };

    function renderExpandedEvent() {
        switch (editEventMode) {
            case false:
                if (event.id === selection.value.id) {
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
                break;
            case true:
                if (eventFormData.id === event.id) {
                    return (
                        <div
                            className='expanded-event-column 
                            expanded-event-column--edit-mode'
                            style={{backgroundColor: `hsl(${event.color})`}}
                        >
                            <button
                                className='button--cancel-edit'
                                onClick={endEventEdit}
                            >
                                Cancel Edit
                            </button>
                            <button 
                                className='button--delete-event'
                                onClick={() => deleteEvent(event)}
                            >
                                Delete Event
                            </button>
                            <form
                                onSubmit={handleSubmit}
                            >
                                <button className='button--confirm-edit'>
                                    Confirm Edit
                                </button>
                                <input
                                    type='text'
                                    name='title'
                                    value={eventFormData.title}
                                    onChange={handleChange}
                                />
                                <textarea
                                    name='description'
                                    value={eventFormData.description}
                                    onChange={handleChange}
                                />
                                <div>
                                    <p>Start: </p>
                                    <p>
                                        {(typeof eventFormData.start === 'object') 
                                            ? eventFormData.start.toDateString() 
                                            : ''}
                                    </p>
                                    <button 
                                        name='start'
                                        className='button--set-start-time--DayPanel'
                                        type='button'
                                        onClick={handleSetTimeButtons}
                                    >
                                        {(timeSelectMode.eventStart) ? '✓' : 'Set Start Time'}
                                    </button>
                                </div>
                                <div>
                                    <p>End: </p>
                                    <p>
                                        {(typeof eventFormData.end === 'object') 
                                            ? eventFormData.end.toDateString() 
                                            : ''}
                                    </p>
                                    <button 
                                        name='end'
                                        className='button--set-end-time--DayPanel'
                                        type='button'
                                        onClick={handleSetTimeButtons}
                                    >
                                        {(timeSelectMode.eventEnd) ? '✓' : 'Set End Time'}
                                    </button>
                                </div>  
                            </form>
                        </div>
                    );
                };
                break;
        };
    };

    return (
        <div 
            className='event-column'
            style={gridItemStyle}
            >
                {renderExpandedEvent()}
        </div>
    );
};