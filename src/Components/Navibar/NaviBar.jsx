import React, { useState } from 'react';
import '../../Styles/NaviBar.css'
import GoalCreationComponent from '../SideBox/SideBox';
import user from '../../assets/user.svg'
import notify from '../../assets/notify.svg'
import profile from '../../assets/profile.png'
import { BsPersonAdd } from "react-icons/bs";
import { IoMdNotificationsOutline } from "react-icons/io";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';



const NaviBar = () => {
    const [sidecondition, setsidecondition] = useState(false)
    const [selectedValue, setSelectedValue] = useState('new');
    // console.log(sidecondition)
    const handleChange = (e) => {
        const value = e.target.value;
        setSelectedValue(value);

        if (value === "goal") {
            setsidecondition(true);
            setSelectedValue("new")
        } else {
            setsidecondition(false);
        }
    };

    return (
        <>
            <div className='NaviBarContainer'>
                <div className="heading">
                    Goals
                </div>
                <div className="opts">
                    <div>
                        {/* <select
                            name="action"
                            id=""
                            value={selectedValue}
                            onChange={(e) => {
                                const value = e.target.value;
                                setSelectedValue(value);

                                if (value === "goal") {
                                    setsidecondition(true);
                                    setSelectedValue("new")
                                } else {
                                    setsidecondition(false);
                                }
                            }}
                        >
                            <option value="new">Add New</option>
                            <option value="goal">Add goal</option>
                            <option value="task">Add task</option>
                        </select> */}
                        <FormControl sx={{ m: 0, minWidth: 120, height: 40 }}>
                            <Select
                                value={selectedValue}
                                onChange={handleChange}
                                displayEmpty
                                inputProps={{ 'aria-label': 'Without label' }}
                                sx={{ height: '100%' }}
                            >
                                <MenuItem value="new">
                                    Add New
                                </MenuItem>
                                <MenuItem value="goal">Add goal</MenuItem>
                                <MenuItem value="task">Add task</MenuItem>
                            </Select>
                        </FormControl>

                    </div>
                    <div className='icons'>
                        <li><BsPersonAdd size={24} /></li>
                        <li><IoMdNotificationsOutline size={24} /> </li>
                        <li className='profile'><img src={profile} alt="profile" /> </li>

                    </div>
                </div>
            </div>
            <div className="sidebox">
                <GoalCreationComponent opencondition={sidecondition} setopencondition={setsidecondition} />
            </div>
        </>
    );
}

export default NaviBar;
