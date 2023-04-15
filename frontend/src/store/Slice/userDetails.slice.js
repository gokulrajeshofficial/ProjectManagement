import { createSlice  } from "@reduxjs/toolkit";

const initialState  = {   
    fname : "",
    lname : "" ,
    email : "" ,
    phone : "" ,
    userId : "",
    company : "",
    accessToken : ""
}

const userDetailsSlice  = createSlice({
    name : 'userDetails' ,
    initialState, 
    reducers : {
        setDetails: (state, action) => {
            console.log(action.payload)
    const { _id, fname ,lname , email ,phone , company , accessToken } = action.payload;

      state.userId = _id !== undefined ? _id : state.userId;
      state.fname = fname !== undefined ? fname : state.fname;
      state.lname = lname !== undefined ? lname : state.lname;
      state.email = email !== undefined ? email : state.email;
      state.company = company !== undefined ? company : state.company;
      state.phone = phone !== undefined ? phone : state.phone;
      state.accessToken = accessToken !== undefined ? accessToken : state.accessToken;
        }
    }
})

export const {setDetails} = userDetailsSlice.actions;
export default userDetailsSlice.reducer;

export const userDetails = (state)=>state.persistedReducer.userReducer

