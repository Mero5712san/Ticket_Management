import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import "../../Styles/GoalPageThree.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Increment, Decrement } from "../../slice/Buttonslice";
import axios from "axios";

const GoalPageThree = ({setopencondition}) => {
  const [selectedOption, setSelectedOption] = useState(""); // State to track selected option
  const dispatch = useDispatch();
  const goals = useSelector((s)=>s.createGoal)

  // Handle radio button change
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleIncrement = async () => {
    if(selectedOption==="no"){
        console.log(goals);
        try{
            const response = await axios.post('http://localhost:8081/goal/create', goals, {
                headers: {
                  'Content-Type': 'application/json',
                },
              })
            if(response.status===201){
                console.log("Goal Created successfully",response);
                alert("Goal Created")
                setopencondition(false)
            }
        }
        catch(error){
            alert("error while creating goal")
            setopencondition(false)
        }
    }
    else{
    dispatch(Increment());
    }
  };

  const handleDecrement = async () => {
    dispatch(Decrement());
  };

  console.log(selectedOption);

  return (
    <div className="pagethree">
      <div className="uppercontainer">
        <div className="heading">Project Configuration</div>
        <div className="default">
          Do you wish to break your project into phases?
        </div>
        <div className="option">
          {/* Yes Option */}
          <div
            className={selectedOption == "yes" ? "elementselected" : "element"}
          >
            <input
              type="radio"
              id="yes"
              name="phase"
              value="yes"
              checked={selectedOption === "yes"}
              onChange={handleOptionChange}
            />
            <label htmlFor="yes">Yes, I do</label>
          </div>

          {/* No Option */}
          <div
            className={selectedOption == "no" ? "elementselected" : "element"}
          >
            <input
              type="radio"
              id="no"
              name="phase"
              value="no"
              checked={selectedOption === "no"}
              onChange={handleOptionChange}
            />
            <label htmlFor="no">No, skip for now</label>
          </div>
        </div>
        <hr style={{ marginTop: "1rem" }} />
      </div>
      <div className="lowercontent">
        <Button next={handleIncrement} back={handleDecrement}/>
      </div>
    </div>
  );
};

export default GoalPageThree;
