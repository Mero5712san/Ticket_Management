import { configureStore } from "@reduxjs/toolkit";
import { CreateGoal } from "../slice/CreateGoal";

export const store = configureStore({
    reducer:{
        createGoal: CreateGoal,
    }
})