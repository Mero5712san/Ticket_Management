import React, { useEffect, useState } from "react";
import "../../Styles/GoalPageTwo.css";
import TagIcon from "@mui/icons-material/Tag";
import Select from "react-select";
import axios from "axios";
import dayjs from 'dayjs';
import { TextField, Typography } from "@mui/material";
import Button from "../../Components/Button/Button";
import { useSelector } from "react-redux";
import CalendarPopup from "../../Components/CalendarPopup/CalendarPopup";
import CenterBox from "../../Components/SideBox/CenterBox";
import { useDispatch } from "react-redux";
import { Increment, Decrement } from "../../slice/Buttonslice";
import { addGoaltitles } from "../../slice/CreateGoal";
import { setEndAt, setStartAt } from "../../slice/CreateGoal";

const GoalPageTwo = () => {
  const [hashtagData, setHashtagData] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [hashtagOptions, setHashtagOptions] = useState([]);
  const [hashtag_id, setHashtag_id] = useState(null);
  const [loading, setLoading] = useState(false);
  const [calenderOpen, setCalenderOpen] = useState(false)
  const [userOpen, setUserOpen] = useState(false)
  const [startAt, setStartAt] = useState(null)
  const [endAt, setEndAt] = useState(null)
  const start = useSelector((s) => s.createGoal.goal.start_at)
  const end = useSelector((s) => s.createGoal.goal.end_at)
  const GoalUsers = useSelector((s) => s.createGoal.goal_users.users); // Correctly access goal_users from Redux store
  console.log("goalusers", GoalUsers);
  const  dispatch = useDispatch();

  // New states for title and description
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchHashtagData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/master/hashtags");
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

  // Disable dates outside of the range defined by `start` and `end`
  const minDate = start ? dayjs(start).toDate() : null;
  const maxDate = end ? dayjs(end).toDate() : null;

  const customStyles = {
    control: (base, state) => ({
      ...base,
      fontFamily: "sans-serif",
      backgroundColor: "white",
      marginRight: "20px",
      marginLeft: "0px",
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
      color: "black", // Change the text color here
    }),
    placeholder: (base) => ({
      ...base,
      fontSize: "13px", // Set the desired placeholder font size
      color: "gray", // Optional: change the placeholder color
    }),
  };

  const customComponents = {
    IndicatorSeparator: () => null,
    DropdownIndicator: () => null, // Hides the arrow indicator
  };

  // Handler for adding a new hashtag
  const addNewHashtag = async (input) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8081/master/hashtags",
        { name: input, is_active: true, created_by: 1 }
      );
      if (response.status === 201) {
        // Extract new hashtag data from response
        const newHashtag = response.data.hashtag;

        // Create a new option from the hashtag data
        const newOption = {
          value: newHashtag.id,
          label: newHashtag.name,
        };

        // Update state with the new hashtag
        setHashtagOptions((prevOptions) => [...prevOptions, newOption]);
        setHashtagData((prevData) => [...prevData, newHashtag]);
        setHashtag_id(newOption.value);
        setInputValue(newOption.label);
        console.log(newOption.value);
      }
    } catch (error) {
      console.log("Error adding new hashtag", error);
    } finally {
      setLoading(false);
    }
  };

  const filterOptions = (input = "", options = []) => {
    const filtered = options.filter((option) =>
      option?.label?.toLowerCase().includes(input?.toLowerCase() || "")
    );
    if (
      input &&
      !options.some(
        (option) => option.label?.toLowerCase() === input?.toLowerCase()
      )
    ) {
      filtered.push({ label: `${input}`, value: "add-new" });
    }
    return filtered;
  };

  const handleCalenderClick = () => {
    setCalenderOpen(!calenderOpen);
  };

  const handleIncrement = async () => {
    dispatch(Increment());
    dispatch(addGoaltitles({title,description,hashtag_id,startAt,endAt}))
  };

  const handleDecrement = async () => {
    dispatch(Decrement());
  };

  

  return (
    <div className="GoalP2MainDiv">
      <div className="goalTopDiv">
        <div className="GoalTitleDiv">
          <div>
            <textarea
              className="TextArea"
              placeholder="Test"
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>
          </div>
          <div className="hashDiv">
            <div
              style={{ padding: "5px", paddingRight: "0px", paddingTop: "7px" }}
            >
              <TagIcon sx={{ height: "20px", color: "gray" }} />
            </div>
            <div>
              <Select
                isSearchable={true}
                styles={customStyles}
                className="hashtagField"
                options={filterOptions(inputValue, hashtagOptions)}
                placeholder="TEST"
                inputValue={inputValue}
                onInputChange={(newValue) => setInputValue(newValue)}
                components={customComponents}
                onChange={(selectedOption) => {
                  if (selectedOption.value === "add-new") {
                    addNewHashtag(inputValue);
                    setInputValue(inputValue);
                    setHashtag_id(selectedOption.value);
                    console.log(selectedOption.value);
                  } else {
                    setInputValue(inputValue);
                    setHashtag_id(selectedOption.value);
                    console.log(selectedOption.value);
                  }
                }}
                isLoading={loading}
              />
            </div>
          </div>
        </div>
        <div className="GoalPageOneOptionDiv">
          <div className="GoaliconDiv">
            <img src="./images/document.png" alt="" height={18} />
          </div>
          <div>
            <TextField
              placeholder="Add Description"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    border: "none", // Removes the border
                  },
                  "&:hover fieldset": {
                    border: "none", // Removes the border on hover
                  },
                  "&.Mui-focused fieldset": {
                    border: "none", // Removes the border on focus
                  },
                },
              }}
              onChange={(e) => setDescription(e.target.value)} // Update description on change
            />
          </div>
        </div>
        <CalendarPopup open={calenderOpen} setOpen={setCalenderOpen}  setStart={setStartAt} setEnd={setEndAt} start={minDate} end={maxDate} />
        <div className="GoalPageOneOptionDiv" style={{gap:"0.8rem"}} onClick={handleCalenderClick}>
          <div className="GoaliconDiv">
            <img src="./images/calendar.png" alt="" height={18} />
          </div>
          <div>
            {(startAt && endAt) ? <Typography>{startAt} - {endAt}</Typography>
                        : <Typography sx={{ cursor:'pointer'}}>Set Time Frame</Typography>
            }
          </div>
        </div>
        <CenterBox opencondition={userOpen} setopencondition={setUserOpen} />
        <div className="GoalPageOneOptionDiv" style={{gap:"0.8rem"}} onClick={()=>setUserOpen(true)} >

          <div className="GoaliconDiv">
            <img src="./images/add-user.png" alt="" height={18} />
          </div>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {GoalUsers.map((user) => (
              <div key={user.user_id}>
                <img src={user.path} alt="" height={30} />
              </div>
            ))}
            <div>
              <img src="./images/story.png" alt="" height={30} />
            </div>
          </div>
        </div>
      </div>
      <div className="GoalP2BtnDiv">
        <Button next={handleIncrement} back={handleDecrement}/>
      </div>
    </div>
  );
};

export default GoalPageTwo;
