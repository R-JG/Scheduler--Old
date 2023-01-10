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
        updateEventFormValue,
        updateSelection
    } = props;

    //console.log(gridItemStyle);

    function handleEventClick() {
        if ((selection.type === 'event') 
        && (selection.value.id === event.id)) return;
        updateSelection('event', event);
    };

    function handleFormSubmit(e) {
        e.preventDefault();
        if (
            (eventFormData.start === '') 
            || (eventFormData.end === '')
            || (eventFormData.title === '')
        ) return;
        editEvent(event);
    };

    function handleFormChange(e) {
        const { name, value } = e.target;
        updateEventFormValue(name, value);
    };

    function handleFormTimeButtons(e) {
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

    function processDateString(dateObject) {
        const timeString = dateObject.toLocaleTimeString();
        const processedTimeString = (
            timeString.substring(0, (timeString.length - 6)) 
            + timeString.substring((timeString.length - 3), timeString.length)
        );
        return dateObject.toDateString() + ', ' + processedTimeString;
    };

    function ExpandedEvent() {
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
                            <h1 className='event-column-title'>
                                {event.title}
                            </h1>
                            <div className='event-column-start'>
                                <p>From: </p>
                                {processDateString(event.start)}
                            </div>
                            <div className='event-column-end'>
                                <p>To: </p>
                                {processDateString(event.end)}
                            </div>
                            <p className='event-column-description'>
                                {event.description}
                            </p>
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
                                onSubmit={handleFormSubmit}
                            >
                                <button className='button--confirm-edit'>
                                    Confirm Edit
                                </button>
                                <input
                                    type='text'
                                    name='title'
                                    value={eventFormData.title}
                                    onChange={handleFormChange}
                                />
                                <textarea
                                    name='description'
                                    value={eventFormData.description}
                                    onChange={handleFormChange}
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
                                        onClick={handleFormTimeButtons}
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
                                        onClick={handleFormTimeButtons}
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
            onClick={handleEventClick}
            >
                {ExpandedEvent()}
        </div>
    );
};