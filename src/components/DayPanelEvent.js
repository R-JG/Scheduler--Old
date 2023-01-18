import React from 'react';
import './css/DayPanelEvent.css';

export default function DayPanelEvent(props) {

    const { 
        event, 
        gridItemStyle, 
        selection,
        eventFormData,
        createEventMode,
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

    function handleEventClick() {
        if ((selection.type === 'event') 
        && (selection.value.id === event.id)) return;
        if (editEventMode && (eventFormData.id !== event.id)) return;
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

    function renderAsInactiveButton() {
        return (createEventMode) ? 'inactive-button' : '';
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
                            style={{backgroundColor: event.color}}
                        >
                            <button 
                                className={
                                    `button--edit-event 
                                    ${renderAsInactiveButton()}`}
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
                            className='expanded-event-column'
                            style={{backgroundColor: event.color}}
                        >
                            <form
                                className='event-edit-form'
                                onSubmit={handleFormSubmit}
                            >
                                <button className='button--confirm-edit'>
                                    Confirm Edit
                                </button>
                                <button 
                                    type='button'
                                    className='button--delete-event'
                                    onClick={() => deleteEvent(event)}
                                >
                                    Delete Event
                                </button>
                                <button
                                    type='button'
                                    className='button--cancel-edit'
                                    onClick={endEventEdit}
                                >
                                    Cancel Edit
                                </button>
                                <span className='event-edit-form--title-label'>
                                    Title:
                                </span>
                                <input
                                    className='event-edit-form--title'
                                    type='text'
                                    name='title'
                                    value={eventFormData.title}
                                    onChange={handleFormChange}
                                />
                                <span className='event-edit-form--description-label'>
                                    Description:
                                </span>
                                <textarea
                                    className='event-edit-form--description'
                                    name='description'
                                    value={eventFormData.description}
                                    onChange={handleFormChange}
                                />
                                <span className='event-edit-form--start-label'>
                                    Start:
                                </span>
                                <div className='event-edit-form--start'>
                                    <p className='event-edit-form--start-value'>
                                        {processDateString(eventFormData.start)}
                                    </p>
                                    <button 
                                        name='start'
                                        className={
                                            `button--set-start-time--DayPanel 
                                            ${(timeSelectMode.eventStart) 
                                                ? 'active-button' : ''}`}
                                        type='button'
                                        onClick={handleFormTimeButtons}
                                    >
                                        Set Start Time
                                    </button>
                                </div>
                                <span className='event-edit-form--end-label'>
                                    End:
                                </span>
                                <div className='event-edit-form--end'>
                                    <p className='event-edit-form--end-value'>
                                        {processDateString(eventFormData.end)}
                                    </p>
                                    <button 
                                        name='end'
                                        className={
                                            `button--set-end-time--DayPanel 
                                            ${(timeSelectMode.eventEnd) 
                                                ? 'active-button' : ''}`}
                                        type='button'
                                        onClick={handleFormTimeButtons}
                                    >
                                        Set End Time
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