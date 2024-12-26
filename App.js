import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Calendar2 from './calender2/Calendar2';
import Calendar3 from './calender3/Calendar3';
import Calendar4 from './calender4/Calendar4';
import Home from './Home';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/calender2" element={<Calendar2 />} />
        <Route path="/calender3" element={<Calendar3 />} />
        <Route path="/calender4" element={<Calendar4 />} />
        <Route path="/" element={<Home />} /> {/* Replace with your home component */}
      </Routes>
    </Router>
  );
}

export default App;

