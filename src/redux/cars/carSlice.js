import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data_car : []
}

const carSlice = createSlice({
    name : "car/getcars",
    initialState,
    reducers:{
     getCars(state,action){
            state.data_car = action.payload
        }
    }
})

export const {getCars} = carSlice.actions;
export default carSlice.reducer