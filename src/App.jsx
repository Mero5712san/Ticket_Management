import React, { useState } from 'react';
import MainRouter from './Router/MainRouter';
import CalendarPopup from './Components/CalendarPopup/CalendarPopup';
import Button from '@mui/material/Button';
import './App.css'
import { Container } from '@mui/material';


const App = () => {
  const [open, setOpen] = useState(true)
  const handleClick = () => {
    setOpen(!open)
  }
  return (
    
    <MainRouter />
    //   <Container className='app'>
    //   <Button variant="contained" onClick={handleClick}>Open</Button>
    //   {open && 
    //   <CalendarPopup open={open} setOpen={setOpen} /> }
    // </Container>
  );
}

export default App;
