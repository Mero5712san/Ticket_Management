import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import { useDispatch } from "react-redux";
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

function CalendarPopup({ open, setOpen, setStart, setEnd }) {
    const [selectedRange, setSelectedRange] = React.useState([new Date(), new Date()]);
    const [startTime, setStartTime] = React.useState(dayjs('2022-04-17T15:30'));
    const [endTime, setEndTime] = React.useState(dayjs('2022-04-17T15:30'));

    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();

    const handleSave = () => {
        const selectedData = {
            startDate: selectedRange[0],
            endDate: selectedRange[1],
            startTime: startTime.format('HH:mm'), 
            endTime: endTime.format('HH:mm'),
        };
        const start_at = dayjs(selectedRange[0])
        .set('hour', startTime.hour())
        .set('minute', startTime.minute())
        .toISOString(); 

       const end_at = dayjs(selectedRange[1])
        .set('hour', endTime.hour())
        .set('minute', endTime.minute())
        .toISOString();

        dispatch(setStartAt(start_at))
        dispatch(setEndAt(end_at))
       const start=dayjs(selectedData.startDate)
       .set('hour', dayjs(selectedData.startTime, 'HH:mm').hour())     
       .set('minute', dayjs(selectedData.startTime, 'HH:mm').minute()) 
       .format('MMMM D, YYYY h:mm A');

       const end =  dayjs(selectedData.endDate)
       .set('hour', dayjs(selectedData.endTime, 'HH:mm').hour())      
       .set('minute', dayjs(selectedData.endTime, 'HH:mm').minute())   
       .format('MMMM D, YYYY h:mm A');

       setStart(start)
       setEnd(end)

        console.log(start, end);  
        handleClose();
    };

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
                            <Calendar selectedRange={selectedRange} setSelectedRange={setSelectedRange} />
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
                            <Button variant="contained" sx={{ width: '100%', backgroundColor: '#186b61' }} onClick={handleSave}>
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
