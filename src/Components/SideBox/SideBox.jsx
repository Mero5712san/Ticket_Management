import React from 'react'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import close from '../../assets/close.svg'
import '../../Styles/SideBox.css'
import StepperComponent from '../Stepper/Stepper';
import GoalPageThree from '../../Pages/GoalPages/GoalPageThree';
import GoalPageTwo from '../../Pages/GoalPages/GoalPageTwo';
import GoalpageOne from '../../Pages/GoalPages/GoalPageOne';
const style = {
    position: "absolute",
    top: "50%",
    left: "80%",  // Adjusted to center the modal
    transform: "translate(-50%, -50%)",
    width: "85%", // Adjusted width for larger screens
    maxWidth: "45vw", // Maximum width for smaller screens
    height: "100vh",
    bgcolor: "white",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
    // p: 4,
    // borderRadius: "10px",
    // overflowY: "auto",
};

const GoalCreationComponent = ({ opencondition, setopencondition }) => {
    console.log(opencondition);
    return (
        <div >
            <Modal open={opencondition} onClose={opencondition}>
                <Box sx={style}>
                    <div className='SideBox'>
                        <div className='close'>
                            {/* Close button with onClick to close the modal */}
                            <li onClick={() => setopencondition(false)} style={{ cursor: 'pointer' }}>
                                <img src={close} alt="close" />
                            </li>
                        </div>
                        {/* Add your modal content here */}
                        <div className="slider">
                            <span className='slidercomponent'><StepperComponent /> </span>
                            <hr color='#d0d0d0' width='0.5rem'/>
                        </div>
                        <div>
                            <GoalPageTwo/>
                            {/* content of the page will be here */}
                            {/* <GoalpageOne /> */}
                            <GoalPageThree />
                        </div>

                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default GoalCreationComponent;
