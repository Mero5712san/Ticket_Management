import React from 'react'
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import UserSelect from '../Userselect/UserSelect';
import close from '../../assets/close.svg'
import '../../Styles/CenterBox.css'

const style = {
    position: "absolute",
    top: "45%",
    left: "50%",  // Adjusted to center the modal
    transform: "translate(-50%, -50%)",
    width: "85%", // Adjusted width for larger screens
    maxWidth: "40vw", // Maximum width for smaller screens
    height: "90vh",
    bgcolor: "white",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
    borderRadius: '0.5rem',
    // p: 4,
    // borderRadius: "10px",
    // overflowY: "auto",
};

const CenterBox = ({ opencondition, setopencondition }) => {
    console.log(opencondition);
    return (
        <div >
            <Modal open={opencondition} onClose={() => setopencondition(false)}>
                <Box sx={style}>
                    <div className='centerbox'>
                        <div className='close'>
                        <li onClick={() => setopencondition(false)} style={{ cursor: 'pointer' }}>
                            <img src={close} alt="close" />
                        </li>
                        </div>
                        <div className='innercomponent'>
                            <UserSelect />
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default CenterBox;
