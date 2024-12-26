import React, { useEffect } from "react";
import "./calender2/cal2.css"; // Import CSS
import "./calender2/cal2.js"; // Import JS

const Calendar2 = () => {
  useEffect(() => {
    // Any JS initialization for calendar2 can go here
  }, []);

  return (
    <div className="calender2-container">
      <div id="calender2">
        {/* You can use the calendar2's HTML content here */}
        <h2>Calendar 2</h2>
        {/* Optionally, if you want to insert the HTML, use dangerouslySetInnerHTML */}
        <div dangerouslySetInnerHTML={{ __html: require("./calender2/cal2.html") }} />
      </div>
    </div>
  );
};

export default Calendar2;
