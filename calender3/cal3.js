document.addEventListener('DOMContentLoaded', function () {
    const { Calendar, Draggable } = FullCalendar;
  
    // Setup for the external events section
    const containerEl = document.getElementById('external-events');
    const calendarEl = document.getElementById('calendar');
    const newEventInput = document.getElementById('new-event-title');
    const eventTypeSelect = document.getElementById('event-type'); // Select dropdown for event type
  
    // Initialize the draggable events
    const draggable = new Draggable(containerEl, {
        itemSelector: '.fc-event',
        eventData: function (eventEl) {
            return {
                title: eventEl.dataset.eventTitle,
                color: eventEl.style.backgroundColor,
            };
        },
    });
  
    // Initialize the calendar with drag and drop enabled
    const calendar = new Calendar(calendarEl, {
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        editable: true,
        droppable: true, // Enable event dropping on the calendar
        drop: function (info) {
            // Keep the color of the event when dropped
            const eventClass = info.draggedEl.style.backgroundColor;
            calendar.addEvent({
                title: info.draggedEl.dataset.eventTitle,
                start: info.date,
                color: eventClass,
            });
  
            // Optionally, remove the dragged element from the external events list
            info.draggedEl.parentNode.removeChild(info.draggedEl);
        },
    });
  
    // Render the calendar
    calendar.render();
  
    // Add a new event to the external events list dynamically
    window.addEvent = function () {
        const eventTitle = newEventInput.value.trim();
        const selectedColor = eventTypeSelect.value; // Get selected color for the event
  
        if (eventTitle && selectedColor) {
            // Create a new event div
            const newEventDiv = document.createElement('div');
            newEventDiv.classList.add('fc-event');
            newEventDiv.style.backgroundColor = selectedColor;
            newEventDiv.dataset.eventTitle = eventTitle;
            newEventDiv.textContent = eventTitle;
  
            // Add it to the external events section
            containerEl.appendChild(newEventDiv);
  
            // Reinitialize draggable for the new event
            new Draggable(containerEl, {
                itemSelector: '.fc-event',
                eventData: function (eventEl) {
                    return {
                        title: eventEl.dataset.eventTitle,
                        color: eventEl.style.backgroundColor,
                    };
                },
            });
  
            newEventInput.value = ''; // Clear the input field
        } else {
            alert('Please enter a valid event title and select an event type.');
        }
    };
  });