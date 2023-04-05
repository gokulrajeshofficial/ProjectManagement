import { createSlice , PayloadAction } from "@reduxjs/toolkit";

const initialState  = {
    value : 0
}

const counterSlice  = createSlice({
    name : 'counter' ,
    initialState, 
    reducers : {
        incremented(state){
            state.value ++ ;
        },
        decremented(state){
            state.value -- ;
        }
    }
})

export const {incremented} = counterSlice.actions;
export default counterSlice.reducer