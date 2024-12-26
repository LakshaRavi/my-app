document.getElementById("studentIcon").addEventListener("click", function () {
    showLoginForm("studentLoginForm");
});
document.getElementById("teacherIcon").addEventListener("click", function () {
    showLoginForm("teacherLoginForm");
});
document.getElementById("clubIcon").addEventListener("click", function () {
    showLoginFormclub("clubLoginForm");
});

// Function to display the login form and hide icons
function showLoginFormclub(formId){
    window.location.href=('../calender4/cal4.html');
}
function showLoginForm(formId) {
    // Hide all forms and icons first
    document.querySelectorAll(".login-form, .signup-form").forEach(function (form) {
        form.style.display = "none";
    });
    document.getElementById("icon-container").style.display = "none"; // Hide icons page

    // Show the login form
    document.getElementById(formId).style.display = "block";
}

// Close the login form and return to the first page (icon selection)
function closeLoginForm() {
    document.querySelectorAll(".login-form").forEach(function (form) {
        form.style.display = "none";
    });
    document.getElementById("icon-container").style.display = "block";
}

// Simulate a Sign-Up submission
function submitSignUp(userType) {
    alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} signed up successfully!`);

    // Redirect to the corresponding login form
    const loginFormId = `${userType}LoginForm`;
    redirectToLogin(loginFormId);
}

// Redirect to the respective login form
function redirectToLogin(loginFormId) {
    // Hide all forms
    document.querySelectorAll(".signup-form, .login-form").forEach(function (form) {
        form.style.display = "none";
    });

    // Display the login form
    document.getElementById(loginFormId).style.display = "block";
}

// Close the sign-up form
function closeSignUpForm() {
    document.querySelectorAll(".signup-form").forEach(function (form) {
        form.style.display = "none";
    });
    document.getElementById("icon-container").style.display = "block";
}

// Login and redirection to the welcome page
function loginUser(userType) {
    alert(`${userType.charAt(0).toUpperCase() + userType.slice(1)} logged in successfully!`);
    document.querySelectorAll(".login-form").forEach(function (form) {
        form.style.display = "none";
    });
    document.getElementById("welcomePage").style.display = "block"; // Show the welcome page
}

// Go back to the main page after successful login
function goBackToHomePage() {
    document.getElementById("welcomePage").style.display = "none";
    document.getElementById("icon-container").style.display = "block"; // Show the icon selection page
}

// Optional: Add Event Listeners for Sign-Up Buttons within Login Forms
document.querySelectorAll(".signup-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
        const userType = this.getAttribute("onclick").match(/showSignUp\('(\w+)'\)/)[1];
        const signUpFormId = `${userType}SignUpForm`;
        showSignUpForm(signUpFormId);
    });
});

// Function to show sign-up forms
function showSignUpForm(formId) {
    // Hide all login and signup forms
    document.querySelectorAll(".signup-form, .login-form").forEach(function (form) {
        form.style.display = "none";
    });

    // Show the specific sign-up form
    document.getElementById(formId).style.display = "block";
}

// Navigate to the Campus Page
function goToCampusPage() {
    window.location.href=('../calender3/cal3.html');
    // document.getElementById("welcomePage").style.display = "none"; // Hide welcome page
    // document.getElementById("campusPage").style.display = "block"; // Show campus page
}

// Navigate to the Class Page
function goToClassPage() {
    window.location.href=('../calender3/cal3.html');
    // document.getElementById("welcomePage").style.display = "none"; // Hide welcome page
    // document.getElementById("classPage").style.display = "block"; // Show class page
}

// Go back to the Welcome Page
function goBackToWelcomePage() {
    document.getElementById("campusPage").style.display = "none"; // Hide campus page
    document.getElementById("classPage").style.display = "none"; // Hide class page
    document.getElementById("welcomePage").style.display = "block"; // Show welcome page
}
let currentDate = new Date();

function renderCalendar() {
    let month = currentDate.getMonth();
    let year = currentDate.getFullYear();
    let firstDay = new Date(year, month, 1).getDay();
    let lastDate = new Date(year, month + 1, 0).getDate();
    
    // Update the header with the month and year
    document.getElementById("calendar-month-year").textContent = `${currentDate.toLocaleString('default', { month: 'long' })} ${year}`;
    
    let calendarBody = document.getElementById("calendar-body");
    calendarBody.innerHTML = "";

    // Create empty cells for previous month's days
    let dayCounter = 1;
    for (let i = 0; i < 6; i++) { // 6 rows for 6 weeks
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");

            if (i === 0 && j < firstDay) {
                cell.classList.add("empty");
            } else if (dayCounter <= lastDate) {
                cell.textContent = dayCounter;
                cell.addEventListener("click", () => alert(`Selected Date: ${dayCounter}/${month + 1}/${year}`));
                dayCounter++;
            } else {
                cell.classList.add("empty");
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

// Change month (forward/backward)
function changeMonth(direction) {
    currentDate.setMonth(currentDate.getMonth() + direction);
    renderCalendar();
}

// Initial render
renderCalendar();

// Draggable Calendar Integration
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