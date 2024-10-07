import { configureStore } from "@reduxjs/toolkit";
import { CreateGoal } from "../slice/CreateGoal";
import { ButtonSlice } from "../slice/Buttonslice";

export const store = configureStore({
    reducer:{
        createGoal: CreateGoal,
        buttonState: ButtonSlice
    }
})