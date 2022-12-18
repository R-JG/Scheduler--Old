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

The base form of the event panel will be a create event button, and a list of upcoming events.
In create event mode, the panel will render as a form with inputs for title and description.
It will also have buttons for setting the start and end.
When these buttons are clicked, the calendar and day panel will be set to a mode where clicking on a day or hour defines the start or end dates.