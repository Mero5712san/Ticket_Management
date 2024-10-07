import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 0, 
      left: 'calc(50% - 1px)', 
      right: 'calc(50% - 1px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      '& .MuiStepConnector-line': {
        borderColor: '#00BFA5', 
        borderWidth: 1,
        borderStyle: 'dotted', 
        height: '40px',        
        margin: '0 0 5px 3px', 
        width: '1px',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      '& .MuiStepConnector-line': {
        borderColor: '#00BFA5', 
        borderWidth: 1,
        borderStyle: 'dotted', 
        height: '40px',         
        margin: '0 0 5px 3px',  
        width: '1px',
      },
    },
    [`& .MuiStepConnector-line`]: {
      borderColor: '#e0e0e0', 
      borderWidth: 1,         
      borderStyle: 'dotted',  
      height: '40px',         
      margin: '0 0px 5px 3px',  
      width: '1px',  
      borderRadius:'0.1px', 
    },
  }));
  

const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-iconContainer': {
    '& .MuiStepIcon-root': {
      color: 'grey', 
      fontColor:'grey',
      border:'1px solid #e0e0e0',
      borderRadius:'50%',
      '&.Mui-active': {
        color: '#00BFA5',
        border:'1px solid #00BFA5',
      },
      '&.Mui-completed': {
        color: '#00BFA5',
        border:'1px solid #00BFA5', 
      },
      fontSize: '2rem', 
    },
  },
  '& .MuiStepLabel-label': {
    color: '#9e9e9e', 
    '&.Mui-active': {
      color: '#00BFA5', 
    },
    '&.Mui-completed': {
      color: '#00BFA5', 
    },
    fontSize: '1rem',
  },
}));

export default function StepperComponent() {
  const [stepvalue , setStepValue] = useState(0)
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={stepvalue}
        orientation="vertical"
        connector={<CustomConnector />} 
      >
        {steps.map((label) => (
          <Step key={label}>
            <CustomStepLabel></CustomStepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
