import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import { setStartAt, setEndAt  } from "../../slice/CreateGoal";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopTimePicker } from '@mui/x-date-pickers/DesktopTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Calendar from './Calendar';  

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "1px solid none",
    boxShadow: 24,
    borderRadius: 3,
    p: 2,
    height: "85%",
    display: 'flex',
    flexDirection: 'column',
    justifyContent:'space-between'
};

function CalendarPopup({ open, setOpen, setStart, setEnd, start, end }) {
    const [selectedRange, setSelectedRange] = React.useState([new Date(), new Date()]);
    // const start = useSelector((s) => s.createGoal.goal.start_at)
    // const end = useSelector((s) => s.createGoal.goal.end_at)

    const [startTime, setStartTime] = React.useState(dayjs());
    const [endTime, setEndTime] = React.useState(dayjs());

    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    console.log(start,end)

    const handleSave = () => {
        const selectedData = {
            startDate: selectedRange[0],
            endDate: selectedRange[1],
            startTime: startTime.format('HH:mm'), 
            endTime: endTime.format('HH:mm'),
        };

        const parsedStartTime = dayjs(startTime, 'HH:mm');
        const parsedEndTime = dayjs(endTime, 'HH:mm'); 

        const start_at =dayjs(selectedData.startDate)
        .set('hour', parsedStartTime.hour())    
        .set('minute', parsedStartTime.minute()) 
        .format('MMMM D, YYYY h:mm A');; 

       const end_at = dayjs(selectedData.endDate)
       .set('hour', parsedEndTime.hour())       
       .set('minute', parsedEndTime.minute())   
       .format('MMMM D, YYYY h:mm A');

        dispatch(setStartAt(start_at))
        dispatch(setEndAt(end_at))

       setStart(start_at)
       setEnd(start_at)

        console.log({ start_at, end_at });  
        handleClose();
    };

    // Disable dates outside of the range defined by `start` and `end`
    const minDate = start ? dayjs(start).toDate() : null;
    const maxDate = end ? dayjs(end).toDate() : null;

    // Validate that the selected time is within the same day and range
    const isStartTimeValid = startTime.isBefore(endTime) || startTime.isSame(endTime);
    const isEndTimeValid = endTime.isAfter(startTime) || endTime.isSame(startTime);

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Set Time Frame
                            </Typography>
                            <CloseIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />
                        </Box>

                        {/* Calendar Component */}
                        <Box m={2}>
                            <Calendar selectedRange={selectedRange} setSelectedRange={setSelectedRange}  minDate={minDate} maxDate={maxDate}  />
                        </Box>

                        {/* Time Pickers */}
                        <Box mb={3} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <DesktopTimePicker
                                value={startTime}
                                onChange={(newValue) => setStartTime(newValue)}
                                sx={{ height: '30px', width: '150px' }}
                                slotProps={{ textField: { InputProps: { disableUnderline: true, sx: { border: 'none' } } } }}
                            />

                            <h4 style={{ marginTop: '20px', fontSize:'18px' }}>to</h4>

                            <DesktopTimePicker
                                value={endTime}
                                onChange={(newValue) => setEndTime(newValue)}
                                sx={{ height: '30px', width: '150px' }}
                                slotProps={{ textField: { InputProps: { disableUnderline: true, sx: { border: 'none' } } } }}
                            />
                        </Box>

                        <Box mt={1} mb={0}>
                            <Button variant="contained" sx={{ width: '100%', backgroundColor: '#186b61' }} onClick={handleSave} disabled={!isStartTimeValid || !isEndTimeValid} >
                                Set Range
                            </Button>
                        </Box>
                    </Box>
                </Modal>
            </LocalizationProvider>
        </div>
    );
}

export default CalendarPopup;
