import React from 'react';
import './css/EventsPanel.css';

export default function EventsPanel(props) {

    const { 
        events, 
        eventFormData, 
        addNewEvent,
        updateEventFormData 
    } = props;

    function handleChange(event) {
        const { name, value } = event.target;
        updateEventFormData(name, value);
    };

    function handleSubmit(event) {
        event.preventDefault();
        addNewEvent();
    };

    console.log(events);
    console.log(eventFormData);

    return (
        <div className='EventsPanel'>
            <form 
                onSubmit={handleSubmit}
            >
                <button className='button--add-event'>
                    Add Event
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
                <div>Start: </div>
                <div>End: </div>
            </form>
        </div>
    );
};