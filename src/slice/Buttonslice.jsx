import { createSlice } from "@reduxjs/toolkit";

const initialState = 1;

const buttonSlice = createSlice({
    name: 'button',
    initialState,
    reducers: {
        Increment(state,action){
            return state+1
        },
        Decrement(state,action){
            if(state>1)
                return state-1
            return state
        }
    }
})

export const {Increment,Decrement}  = buttonSlice.actions;

export const ButtonSlice =  buttonSlice.reducer;

