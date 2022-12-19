import React from 'react';
import './css/EventPanel.css';

export default function EventPanel(props) {

    const { 
        events, 
        eventFormData, 
        timeSelectMode,
        setTimeSelectMode,
        setEventFormData,
        addNewEvent,
        updateEventFormValue 
    } = props;

    function handleChange(event) {
        const { name, value } = event.target;
        updateEventFormValue(name, value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        addNewEvent();
        setEventFormData(
            {start: '', end: '', title: '', description: ''}
        );
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

    console.log(events);
    console.log(eventFormData);

    return (
        <div className='EventPanel'>
            <form 
                className='event-form'
                onSubmit={handleSubmit}
            >
                <button className='button--add-event'>
                    Add Event
                </button>
                <label htmlFor='event-form--title'>
                    Title:
                </label>
                <input 
                    id='event-form--title'
                    type='text' 
                    name='title'
                    value={eventFormData.title}
                    onChange={handleChange}
                />
                <label htmlFor='event-form--description'>
                    Description:
                </label>
                <textarea 
                    id='event-form--description'
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
                        className='button--set-start-time'
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
                        className='button--set-end-time'
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