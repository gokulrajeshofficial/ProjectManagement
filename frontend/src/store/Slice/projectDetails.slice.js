import { createSlice } from "@reduxjs/toolkit";

const initialState = null

const projectSlice = createSlice({
    name : "selectedProject" , 
    initialState,
    reducers : {
         setProject(state, action) {
      state =  action.payload;
      return state
    },
    unsetProject(state , action ) {
      state = null
      return state
    }
    }

})

export const {setProject , unsetProject} = projectSlice.actions
export default projectSlice.reducer

export const projectDetailsSlice = (state) => state.persistedReducer.projectReducer;