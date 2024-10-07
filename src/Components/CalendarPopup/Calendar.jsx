import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; 
import './MyCalendar.css'; 
import { Box } from '@mui/material';

const MyCalendar = ({ selectedRange, setSelectedRange }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 50; i <= currentYear + 50; i++) {
      years.push(i);
    }
    return years;
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month' && selectedRange.length === 2) {
      const [start, end] = selectedRange;
      if (date >= start && date <= end) {
        if (date.getTime() === start.getTime()) {
          return 'range-start'; // Custom class for start of the range
        }
        if (date.getTime() === end.getTime()) {
          return 'range-end'; // Custom class for end of the range
        }
        return 'range'; // Custom class for dates between the start and end
      }
    }
    return null;
  };

  return (
    <div>
      <Calendar
        selectRange={true} // Enable date range selection
        onChange={setSelectedRange} // Update selected range
        value={selectedRange} // Current selected range value
        view="month"
        activeStartDate={currentDate} // Controls the current active month
        onActiveStartDateChange={({ activeStartDate }) => setCurrentDate(activeStartDate)}
        nextLabel={null} // Disable next button if not required
        prevLabel={null} // Disable previous button if not required
        navigationLabel={({ date }) => (
          <div className="calendar-dropdowns">
            {/* Month Dropdown */}
            <select
              value={date.getMonth()}
              onChange={(e) =>
                setCurrentDate(new Date(currentDate.getFullYear(), e.target.value))
              }
            >
              {[
                'January', 'February', 'March', 'April', 'May', 'June', 'July',
                'August', 'September', 'October', 'November', 'December',
              ].map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>

            {/* Year Dropdown */}
            <select
              value={date.getFullYear()}
              onChange={(e) =>
                setCurrentDate(new Date(e.target.value, currentDate.getMonth()))
              }
              style={{ marginRight: '10px' }}
            >
              {getYears().map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        )}
        tileClassName={tileClassName} 
      />

      {selectedRange.length === 2 && (
        <Box mt={2} sx={{display:'flex', justifyContent:'space-between', alignItems:'center',width:'100%', fontSize:'18px'}} >
          <Box>{selectedRange[0].toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric',
          })} </Box>
         <Box> {selectedRange[1].toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric',
          })}</Box>
        </Box>
      )}
    </div>
  );
};

export default MyCalendar;
