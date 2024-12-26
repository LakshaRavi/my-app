import React, { useEffect } from "react";
import "./calender4/cal4.css"; // Import CSS
import "./calender4/cal4.js"; // Import JS

const Calendar4 = () => {
  useEffect(() => {
    // Initialize JS if necessary
  }, []);

  return (
    <div className="calender4-container">
      <div id="calender4">
        <h2>Calendar 4</h2>
        <div dangerouslySetInnerHTML={{ __html: require("./calender4/cal4.html") }} />
      </div>
    </div>
  );
};

export default Calendar4;
