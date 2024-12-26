const API_URL = "http://localhost:8080/api";

function assignCoordinators() {
    const studentIds = [1, 2]; // Example student IDs
    fetch(`${API_URL}/assignCoordinators/1`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(studentIds)
    })
    .then(response => response.json())
    .then(data => alert("Coordinators Assigned"))
    .catch(error => console.log("Error assigning coordinators:", error));
}

function checkVenueAvailabilityAndCreateEvent(eventData) {
    const date = eventData.date;
    fetch(`${API_URL}/getAvailableVenues?date=${date}`)
        .then(response => response.json())
        .then(availableVenues => {
            const selectedVenue = document.getElementById("venue-select").value;
            const venueAvailable = availableVenues.some(venue => venue.id == selectedVenue);

            if (venueAvailable) {
                createEvent(eventData);
            } else {
                alert("Venue is not available for the selected date");
            }
        })
        .catch(error => console.log("Error checking venue availability:", error));
}

function createEvent() {
    const eventName = document.getElementById("event-name").value;
    const eventDate = document.getElementById("event-date").value;
    const venueId = document.getElementById("venue-select").value;

    if (eventName && eventDate && venueId) {
        const eventData = {
            eventName: eventName,
            description: "Some description", // You can add a description field
            date: eventDate,
            venue: venueId,
            club: { id: 1 } // Assuming club ID is 1
        };

        checkVenueAvailabilityAndCreateEvent(eventData);
    } else {
        alert("Please fill all event details.");
    }
}

function loadAvailableVenues() {
    fetch(`${API_URL}/getAvailableVenues?date=2024-12-25`) // Example date
        .then(response => response.json())
        .then(venues => {
            const venueSelect = document.getElementById("venue-select");
            venues.forEach(venue => {
                const option = document.createElement("option");
                option.value = venue.id;
                option.text = venue.name;
                venueSelect.appendChild(option);
            });
        })
        .catch(error => console.log("Error fetching venues:", error));
}

loadAvailableVenues();