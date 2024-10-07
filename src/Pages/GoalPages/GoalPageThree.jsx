import React, { useState } from 'react';
import Button from '../../Components/Button/Button';
import '../../Styles/GoalPageThree.css';

const GoalPageThree = () => {
    const [selectedOption, setSelectedOption] = useState(''); // State to track selected option

    // Handle radio button change
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };
     
    console.log(selectedOption);
    
    return (
        <div className="pagethree">
            <div className="uppercontainer">
                <div className="heading">
                    Project Configuration
                </div>
                <div className="default">
                    Do you wish to break your project into phases?
                </div>
                <div className="option">
                    {/* Yes Option */}
                    <div className={selectedOption == 'yes' ? "elementselected" : 'element' }>
                        <input
                            type="radio"
                            id="yes"
                            name="phase"
                            value="yes"
                            checked={selectedOption === 'yes'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="yes">Yes, I do</label>
                    </div>

                    {/* No Option */}
                    <div className={selectedOption == 'no' ? "elementselected" : 'element' }>
                        <input
                            type="radio"
                            id="no"
                            name="phase"
                            value="no"
                            checked={selectedOption === 'no'}
                            onChange={handleOptionChange}
                        />
                        <label htmlFor="no">No, skip for now</label>
                    </div>
                </div>
            </div>
            <div className="lowercontent">
                <Button />
            </div>
        </div>
    );
};

export default GoalPageThree;
