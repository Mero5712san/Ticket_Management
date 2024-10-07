import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    goal:{
        domain_id:null,
        goal_title:null,
        goal_description:null,
        hashtag_id:null,
        start_at:null,
        end_at:null,
        status_id:null,
        goal_created_by:1,
        is_active:true
    },
    goal_users:{
        users:[{
            user_id:1,
            is_owner:true,
            is_assignee:false,
            is_active:true,
            path:'/images/user1.png'
        }]
    },
    goal_phases:{
        phases:[]
    }
};

const CreateGoalInsertion = createSlice({
    name: "GoalCreation",
    initialState: initialState,
    reducers:{
        setGoalName(state,action){
            const data = action.payload;
            state.push(data)
        }
    }
})

export const  {setGoalName} = CreateGoalInsertion.actions
export const  CreateGoal = CreateGoalInsertion.reducer