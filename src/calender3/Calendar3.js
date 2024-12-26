import React, { useEffect } from "react";
import "./calender3/cal3.css"; // Import CSS
import "./calender3/cal3.js"; // Import JS

const Calendar3 = () => {
  useEffect(() => {
    // Initialize JS if necessary
  }, []);

  return (
    <div className="calender3-container">
      <div id="calender3">
        <h2>Calendar 3</h2>
        <div dangerouslySetInnerHTML={{ __html: require("./calender3/cal3.html") }} />
      </div>
    </div>
  );
};

export default Calendar3;
