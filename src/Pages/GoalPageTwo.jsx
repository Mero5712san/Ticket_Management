import React, { useEffect, useState } from "react";
import "../Styles/GoalPageTwo.css";
import TagIcon from '@mui/icons-material/Tag';
import Select from "react-select";
import axios from "axios";
import { TextField, Typography } from "@mui/material";

const GoalPageTwo = () => {
  const [hashtagData, setHashtagData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [hashtagOptions, setHashtagOptions] = useState([]);

  const fetchHashtagData = async () => {
    try {
      const response = await axios.get('http://localhost:8081/master/hashtags');
      if (response.status === 200) {
        setHashtagData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error fetching in hashtag data", error);
    }
  };

 // Update options whenever hashtagData changes
  useEffect(() => {
    const options = hashtagData.map((hashtag) => ({
      value: hashtag.id,
      label: hashtag.name,
    }));
    setHashtagOptions(options);
  }, [hashtagData]);

  useEffect(() => {
    fetchHashtagData();
  }, []);

  const customStyles = {
    control: (base, state) => ({
      ...base,
      fontFamily: "sans-serif",
      backgroundColor: "white",
      marginRight: "20px",
      color: "white",
      borderRadius: "20px",
      border: "none",
      boxShadow: state.isFocused ? "none" : base.boxShadow, // Remove the box shadow
      borderColor: state.isFocused ? "transparent" : base.borderColor, // Remove the blue border
      "&:hover": {
        borderColor: state.isFocused ? "transparent" : base.borderColor,
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "white", // Change the text color here
    }),
  };

   // for removing the default seperator in select component
  const customComponents = {
    IndicatorSeparator: () => null,
  };

  return (
    <div>
      <div className="goalTopDiv">
        <div className="GoalTitleDiv">
          <div>
            <textarea
              className="TextArea"
              placeholder="Test"
            ></textarea>
          </div>
          <div className="hashDiv">
            <div style={{padding:"5px",paddingRight:"0px"}}><TagIcon sx={{height:"20px",color:"gray"}}/></div>
            <div>
            <Select
              isSearchable={true}
              styles={customStyles}
              className="hashtagField"
              options={hashtagOptions}
              placeholder="TEST"
              components={customComponents}
            />
            </div>
          </div>
        </div>
        <div className="GoalPageOneOptionDiv">
            <div className="GoaliconDiv"><img src="./images/document.png" alt="" height={18}/></div>
            <div><TextField placeholder="Add Description" size="small"/></div>
        </div>
        <div className="GoalPageOneOptionDiv">
            <div className="GoaliconDiv"><img src="./images/calendar.png" alt="" height={18}/></div>
            <div><Typography>Set Time Frame</Typography></div>
        </div>
        <div className="GoalPageOneOptionDiv">
            <div className="GoaliconDiv"><img src="./images/add-user.png" alt="" height={18}/></div>
            <div></div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default GoalPageTwo;
