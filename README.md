~ Day Planner Notes ~

_______________
General:

Four main views - calendar, day view, event creation, and full event list.

The calendar is self explanatory.

The day view displays the current day and the events in the day along with all event information.

Event creation panel where one can add or edit events by clicking and dragging on both the calendar and the hours in the day view.

Full event list across the bottom that can be optionally opened, and where one can edit events and click a button to change the calendar view and selected date to the event.
Events are listed in temporal order by start time.
The list could have a highlighted line indicating where the current date is among the list.
The list could be vertically thin with events listed in a single row, and scrolling moves the list from side to side. This makes visual sense according to the theme of temporal series.

The event creation panel and event list will be collapsed by default, giving more room for the two main panels: calendar and day.


Optional weather overlay according to both calendar and day views


_______________
Events:

Events on the calendar will be independent components, visually as a thin strip over the relevant days, where clicking on them brings the information about the event into view in the selection panel.

Events can be all day or have a specific time frame. In the day view, the precise time frame will be displayed according to hour.

The base form of the event panel will be a create event button, and a list of upcoming events.
In create event mode, the panel will render as a form with inputs for title and description.
It will also have buttons for setting the start and end.
When these buttons are clicked, the calendar and day panel will be set to a mode where clicking on a day or hour defines the start or end dates.


Design solution for multiple events overlapping on the calendar:
The events will only ever take up the same strip of space on each date square.
If there are multiple events in one date, there will be coloured blocks stacked in horizontal series.
-
Alternate:
Strips of events on each calendar row will be skewed indicating the multiple different events.
One will be able to scroll through the strips, changing their z-index.
Maybe the default appearance of the strips could be a slightly spread out card deck look, just showing enough to indicate the events on the day, and mousing over could fan them out.
The fewer columns taken up by a strip (the greater the distance between col start and col end), the higher the z-index of the strip, i.e. longer strips will be more anchored to the bottom of the row.

_______________
Day view:

Idea for solving the problem of need for specification of events by minute: click and hold on the hour brings up a minutes window for the hour. Releasing the click selects the minute.


Design idea for the day view ->
The list is scrollable and boundless, i.e. one can scroll up or down at the very least for the whole time frame rendered in the calendar window.
Scrolling to a new day changes the selected day to it(?)
Selecting a day on the calendar scrolls the day view to the beginning of the selected day (animation)
Aesthetic contrast between the definite, blocky series of squares of the calendar, and the fluid scrollable vertical day view field. Interacting with one affects the other.



Other features to add:
- multiple event rendering on a calendar date 
- event delete and edit
- make the create event window collapsable, and remove the event list
- jump to current date button