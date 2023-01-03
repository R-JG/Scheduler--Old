~ Calendar and Day Planner Notes ~


Design solution for multiple events overlapping on the calendar:
The events will only ever take up the same strip of space on each date square.
If there are multiple events in one date, there will be coloured blocks stacked in horizontal series.
-
Alternate:
Strips of events on each calendar row will be skewed indicating the multiple different events.
One will be able to scroll through the strips, changing their z-index.
Maybe the default appearance of the strips could be a slightly spread out card deck look, just showing enough to indicate the events on the day, and mousing over could fan them out.
The fewer columns taken up by a strip (the greater the distance between col start and col end), the higher the z-index of the strip, i.e. longer strips will be more anchored to the bottom of the row.


Idea for solving the problem of need for specification of events by minute: click and hold on the hour brings up a minutes window for the hour. Releasing the click selects the minute.


Aesthetic contrast between the definite, blocky series of squares of the calendar, and the fluid scrollable vertical day view field. Interacting with one affects the other.



features to add:
- event delete and edit
- multiple event rendering on a calendar date 
- the ability to specify event start and end down to the minute; display accordingly
- add date info separating each 24h block in the day panel (sticky positioning?)
- gray out the hour sections in the day panel corresponding to the grayed out dates on the calendar.
- Change event description to note, and add the ability to add multiple distinct notes to a single event. these will render, when the event info is expanded, as different bullet points. in edit mode, all of these things can be added or changed.

possible features:
- jump to current date button
- possible edits to event window: remove the event list. when create event mode is open and the panel expands, dull the background of the app to try to hilight the selectable parts when in selection mode.
- scrolling through day panel changes the selected date to where you are scrolling (idea: since there is auto scrolling based on updates to selection, this will cause a redundant scrolling issue. This can be resolved by creating local state on day panel that gets set if a scroll event that updates selection is triggered, and this local state, via a conditional on the useEffect scrollTo functions, will prevent the auto scroll from running)
- option to display local holidays on the calendar (not in day panel) ?

other work:
- finalize design
- dev notes to the code