import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { styled } from '@mui/material/styles';

const steps = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];

// Custom styles for the Stepper connector line
const CustomConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
      top: 0, // Adjust position to start in the center of the step
      left: 'calc(50% - 1px)', // Center the line
      right: 'calc(50% - 1px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
      '& .MuiStepConnector-line': {
        borderColor: '#00BFA5', // Teal for active steps
        borderWidth: 1,
        borderStyle: 'dotted', // Dotted line for active steps
        height: '40px',         // Set a specific height for the connector
        margin: '0 0 5px 3px',  // Optional margin to space out the steps
        width: '1px',
      },
    },
    [`&.${stepConnectorClasses.completed}`]: {
      '& .MuiStepConnector-line': {
        borderColor: '#00BFA5', // Teal for completed steps
        borderWidth: 1,
        borderStyle: 'dotted', // Dotted line for completed steps
        height: '40px',         // Set a specific height for the connector
        margin: '0 0 5px 3px',  // Optional margin to space out the steps
        width: '1px',
      },
    },
    [`& .MuiStepConnector-line`]: {
      borderColor: '#e0e0e0', // Grey for non-active steps
      borderWidth: 1,         // Line thickness
      borderStyle: 'dotted',  // Dotted line for non-active steps
      height: '40px',         // Set a specific height for the connector
      margin: '0 0px 5px 3px',  // Optional margin to space out the steps
      width: '1px',  
      borderRadius:'0.1px', 
        // Width of the line to ensure it's a line, not a box
    },
  }));
  

// Custom styles for the Step Label and Icon
const CustomStepLabel = styled(StepLabel)(({ theme }) => ({
  '& .MuiStepLabel-iconContainer': {
    '& .MuiStepIcon-root': {
      color: 'grey', 
      fontColor:'grey',
      border:'1px solid #e0e0e0',
      borderRadius:'50%',// Grey color for inactive steps
      '&.Mui-active': {
        color: '#00BFA5',
        border:'1px solid #00BFA5', // Active step icon color (teal)
      },
      '&.Mui-completed': {
        color: '#00BFA5',
        border:'1px solid #00BFA5', // Completed step icon color (teal)
      },
      fontSize: '2rem', // Increased icon size
    },
  },
  '& .MuiStepLabel-label': {
    color: '#9e9e9e', // Inactive label color (light grey)
    '&.Mui-active': {
      color: '#00BFA5', // Active label color (teal)
    },
    '&.Mui-completed': {
      color: '#00BFA5', // Completed label color (teal)
    },
    fontSize: '1rem',
  },
}));

export default function StepperComponent() {
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={1}
        orientation="vertical"
        connector={<CustomConnector />} // Use the custom connector for centering
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
