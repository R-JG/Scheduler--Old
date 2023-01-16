import React, { useEffect, useRef } from 'react';
import DayPanelEvent from './DayPanelEvent';
import './css/DayPanel.css';

export default function DayPanel(props) {

    const { 
        calendarDates,
        currentDate,
        selection,
        eventFormData,
        events,
        editEventMode,
        timeSelectMode,
        setTimeSelectMode,
        stageEventEdit,
        endEventEdit,
        editEvent,
        deleteEvent,
        updateEventFormValue,
        updateEventFormTimes,
        updateSelection
    } = props;

    const dayPanelRef = useRef(null);

    useEffect(() => {
        scrollToDate(currentDate);
    }, []);

    useEffect(() => {
        if ((selection.type === 'date') 
        && (editEventMode === false)) {
            scrollToDate(selection.value);
        };
        if (selection.type === 'event') {
            scrollToEvent(selection.value);
        };
    }, [selection]);

    function getCalendarDateIndex(dateObject) {
        return calendarDates.findIndex((date) => (
            date.toDateString() === dateObject.toDateString()
        ));
    };

    function scrollToDate(dateObject) {
        const dateIndex = getCalendarDateIndex(dateObject);
        dayPanelRef.current.children[2].children[dateIndex].scrollIntoView(
            {behavior: 'smooth', block: 'start'}
        );
    };

    function scrollToEvent(eventObject) {
        if (typeof eventObject !== 'object') return;
        const eventIndex = events.findIndex((eventItem) => (
            eventItem.id === eventObject.id
        ));
        dayPanelRef.current.children[0].children[eventIndex].scrollIntoView(
            {behavior: 'smooth', block: 'start'}
        );
    };

    function delegateClickForHourSelection(e) {
        if (!timeSelectMode.eventStart 
            && !timeSelectMode.eventEnd) return;
        if (!(e.target.classList.contains('hour'))) return;
        const idArray = e.target.id.split(' ');
        let hourValue = idArray.pop();
        const dateValue = idArray.join(' ');
        const nextDate = new Date(dateValue)
        nextDate.setHours(hourValue);
        updateEventFormTimes(nextDate);
    };

    function convertHourFormat(hour) {
        if (hour === 0) return '12:00 AM';
        if (hour === 12) return '12:00 PM';
        if (hour > 12) return `${hour - 12}:00 PM`;
        return `${hour}:00 AM`;
    };

    function renderAsSubsidiaryMonth(date) {
        return (date.getMonth() !== calendarDates[10].getMonth())
            ? 'subsidiary-month'
            : '';
    };

    function renderFormSelectionMarker() {
        if ((typeof eventFormData.start != 'object') 
        && (typeof eventFormData.end != 'object')) return;
        let eventStart;
        let eventEnd;
        (typeof eventFormData.start === 'object') 
        ? (eventStart = eventFormData.start) 
        : (eventStart = eventFormData.end);
        (typeof eventFormData.end === 'object') 
        ? (eventEnd = eventFormData.end) 
        : (eventEnd = eventFormData.start);
        const { 
            gridRowStart, 
            gridRowEnd 
        } = determineGridRowCoordinates(eventStart, eventEnd);
        const gridItemStyle = {
            gridRow: `${gridRowStart} / ${gridRowEnd}`,
        };
        return (
            <div 
                className='form-selection-marker--day-panel'
                style={gridItemStyle}>
            </div>
        );
    };

    function updateFormMinutes(e) {
        const value = Number(e.target.value);
        if ((typeof value !== 'number') 
        || ((value > 59) || (value < 0))) return;
        if (timeSelectMode.eventStart) {
            const startDate = eventFormData.start;
            startDate.setMinutes(value);
            updateEventFormTimes(startDate);
        };
        if (timeSelectMode.eventEnd) {
            const endDate = eventFormData.end;
            endDate.setMinutes(value);
            updateEventFormTimes(endDate);
        };
    };

    const renderMinuteSelectionBox = (hourId) => {
        if ((timeSelectMode.eventStart 
        && (typeof eventFormData.start === 'object')) 
        && ((eventFormData.start.toDateString() + ' ' + 
        eventFormData.start.getHours()) === hourId)) {
            const startMinutes = eventFormData.start.getMinutes();
            return createMinuteSelectionBox(startMinutes);
        };
        if ((timeSelectMode.eventEnd 
        && (typeof eventFormData.end === 'object')) 
        && ((eventFormData.end.toDateString() + ' ' + 
        eventFormData.end.getHours()) === hourId)) {
            const endMinutes = eventFormData.end.getMinutes();
            return createMinuteSelectionBox(endMinutes);
        };
    };

    const createMinuteSelectionBox = (currentMinutes) => (
        <div className='minute-selection-box'>
            <input 
                className='minute-input'
                type='number' 
                min='0' 
                max='59'
                defaultValue={currentMinutes}
                onChange={updateFormMinutes}/>
            <span>min</span>
        </div>
    );

    const createHoursOfDayArray = (date) => Array.from(
        {length: 24}, 
        (value, index) => {
            const id = `${date.toDateString()} ${index}`
            return (
            <div 
                key={id} 
                className='hour'
                id={id}>
                <div className='hour-text'>
                    {convertHourFormat(index)}
                </div>
                {renderMinuteSelectionBox(id)}
            </div>
        );}
    );

    const dailyHourBlockElements = calendarDates.map(
        (date) => (
            <div 
                key={date.toDateString()}
                className={
                    `full-day-hour-block 
                     ${renderAsSubsidiaryMonth(date)}`}
            >
                <div className='date-separator'>
                    {date.toDateString()}
                </div>
                {createHoursOfDayArray(date)}
            </div>
        )
    );

    function determineGridRowCoordinates(eventStartDate, eventEndDate) {
        let startDateIndex = getCalendarDateIndex(eventStartDate);
        let endDateIndex = getCalendarDateIndex(eventEndDate);
        if (startDateIndex === -1) startDateIndex = 0;
        if (endDateIndex === -1) endDateIndex = 41;
        const gridRowStart = (startDateIndex * 24) + (eventStartDate.getHours() + 1);
        const gridRowEnd = (endDateIndex * 24) + (eventEndDate.getHours() + 2);
        return {gridRowStart, gridRowEnd};
    };

    // Factory function that returns an array of event components with properties for grid row to position
    // them vertically according to their start and end time, and for grid column to position them
    // horizontally, stacked from the left according to whether or not the event would overlap with another.
    //
    // Grid column end is defined conditionally with regards to whether the current event in the loop is selected
    // in which case extra spaces are taken up to expand the selected item.
    const createEventComponentsArray = () => {
        let eventOverlapRecord = [];
        const elementArray = events.reduce((accumulator, currentEvent) => {
            if ((currentEvent.end.valueOf() <= calendarDates[0].valueOf()) 
            || (currentEvent.start.valueOf() >= (calendarDates[41].valueOf() + 86400000))) {
                return accumulator;
            };
            const { 
                gridRowStart, 
                gridRowEnd 
            } = determineGridRowCoordinates(currentEvent.start, currentEvent.end);
            let gridColumnStart;
            let gridColumnEnd;
            let columnEndDistance;
            if (((selection.type === 'event') 
            && (selection.value.id === currentEvent.id)) 
            || (editEventMode && (eventFormData.id === currentEvent.id))) {
                columnEndDistance = 9;
            } else {
                columnEndDistance = 1;
            };
            for (let i = 2; i <= (events.length + 9); i++) {
                const possibleColStart = i;
                const possibleColEnd = i + columnEndDistance;
                const isOverlapping = eventOverlapRecord.some((recordedEvent) => {
                    return (
                        ((recordedEvent.gridColumnStart < possibleColEnd) 
                        && (recordedEvent.gridColumnEnd > possibleColStart))
                        && ((recordedEvent.gridRowStart < gridRowEnd) 
                        && (recordedEvent.gridRowEnd > gridRowStart))
                    );
                });
                if (!isOverlapping) {
                    gridColumnStart = possibleColStart;
                    gridColumnEnd = possibleColEnd;
                    break;
                };
            };
            eventOverlapRecord.push({
                gridRowStart,
                gridRowEnd,
                gridColumnStart,
                gridColumnEnd
            });
            const gridItemStyle = {
                gridRow: `${gridRowStart} / ${gridRowEnd}`,
                gridColumn: `${gridColumnStart} / ${gridColumnEnd}`,
                backgroundColor: `hsl(${currentEvent.color})`
            };
            accumulator.push(
                <DayPanelEvent 
                    key={'DayPanel' + currentEvent.id}
                    event={currentEvent}
                    gridItemStyle={gridItemStyle}
                    selection={selection}
                    eventFormData={eventFormData}
                    editEventMode={editEventMode}
                    timeSelectMode={timeSelectMode}
                    setTimeSelectMode={setTimeSelectMode}
                    stageEventEdit={stageEventEdit}
                    endEventEdit={endEventEdit}
                    editEvent={editEvent}
                    deleteEvent={deleteEvent}
                    updateEventFormValue={updateEventFormValue}
                    updateSelection={updateSelection}
                />
            );
            return accumulator;
        }, []);
        return elementArray;
    };

    return (
        <div 
            ref={dayPanelRef} 
            className='DayPanel'
            onClick={delegateClickForHourSelection}>
            <div className='events-container--day-panel'>
                {createEventComponentsArray()}
            </div>
            <div className='form-selection-container--day-panel'>
                {(timeSelectMode.eventStart || timeSelectMode.eventEnd) 
                && renderFormSelectionMarker()}
            </div>
            <div className='hour-blocks-container'>
                {dailyHourBlockElements}
            </div>
        </div>
    );
};