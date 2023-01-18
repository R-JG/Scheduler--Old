import React from 'react';
import './css/EventCreationPanel.css';

export default function EventCreationPanel(props) {

    const { 
        events, 
        eventFormData, 
        timeSelectMode,
        setTimeSelectMode,
        setCreateEventMode,
        clearEventFormData,
        addNewEvent,
        updateEventFormValue 
    } = props;

    function closeCreateEvent() {
        clearEventFormData();
        setTimeSelectMode(
            {eventStart: false, eventEnd: false}
        );
        setCreateEventMode(false);
    };

    function handleFormChange(event) {
        const { name, value } = event.target;
        updateEventFormValue(name, value);
    };

    function handleFormSubmit(event) {
        event.preventDefault();
        if (
            (eventFormData.start === '') 
            || (eventFormData.end === '')
            || (eventFormData.title === '')
        ) return;
        addNewEvent();
        closeCreateEvent();
    };

    function handleSetTimeButtons(event) {
        if (event.target.name === 'start')
        setTimeSelectMode((prevState) => ({
            eventStart: !prevState.eventStart,
            eventEnd: false
        }));
        if (event.target.name === 'end')
        setTimeSelectMode((prevState) => ({
            eventEnd: !prevState.eventEnd,
            eventStart: false
        }));
    };

    function createDateTextElement(dateObject) {
        const timeString = dateObject.toLocaleTimeString();
        const processedTimeString = (
            timeString.substring(0, (timeString.length - 6)) 
            + timeString.substring((timeString.length - 3), timeString.length)
        );
        return (
            <div className='date-text'>
                <div>{dateObject.toDateString() + ', '}</div>
                <div>{processedTimeString}</div>
            </div>
        );
    };

    return (
        <div className='EventCreationPanel'>
            <form 
                className='event-creation-form'
                onSubmit={handleFormSubmit}
            >
                <button className='button--add-event'>
                    Add Event
                </button>
                <button 
                    type='button'
                    className='button--cancel-event-creation'
                    onClick={closeCreateEvent}>
                    ✕
                </button>
                <label 
                    className='event-creation-title-label'
                    htmlFor='event-creation-form--title'>
                    Title:
                </label>
                <input 
                    id='event-creation-form--title'
                    type='text' 
                    name='title'
                    value={eventFormData.title}
                    onChange={handleFormChange}
                />
                <label 
                    className='event-creation-description-label'
                    htmlFor='event-creation-form--description'>
                    Description:
                </label>
                <textarea 
                    id='event-creation-form--description'
                    name='description'
                    value={eventFormData.description} 
                    onChange={handleFormChange}
                />
                <p className='event-creation-start-label'>
                    Start: 
                </p>
                <div className='event-creation-form--start'>
                    {(typeof eventFormData.start === 'object') 
                    && createDateTextElement(eventFormData.start)}
                    <button 
                        name='start'
                        className={
                            `button--set-start-time--EventCreationPanel 
                            ${(timeSelectMode.eventStart) 
                                ? 'active-button' : ''}`}
                        type='button'
                        onClick={handleSetTimeButtons}
                    >
                        Set Start Time
                    </button>
                </div>
                <p className='event-creation-end-label'>
                    End: 
                </p>
                <div className='event-creation-form--end'>
                    {(typeof eventFormData.end === 'object') 
                    && createDateTextElement(eventFormData.end)}
                    <button 
                        name='end'
                        className={
                            `button--set-end-time--EventCreationPanel 
                            ${(timeSelectMode.eventEnd) 
                                ? 'active-button' : ''}`}
                        type='button'
                        onClick={handleSetTimeButtons}
                    >
                        Set End Time
                    </button>
                </div>                
            </form>
        </div>
    );
};