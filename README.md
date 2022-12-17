~ Day Planner Notes ~

_______________
General:

Two main panels - calendar view, and day view.

Event panel where one can add or edit events by clicking and dragging on both the calendar and the hours in the day view.
The event panel also gives a brief list of upcoming events.

Optional weather overlay according to both calendar and day views


_______________
Events:

The event list will be an array of objects.
Event object properties: start, end, title, description.
Events will be updated independently in state, saved in local storage, and rendered upon the condition that the date object corresponds with the date saved with the event. 

Events can be all day or have a specific time frame. In the day view, the precise time frame will be displayed according to hour.