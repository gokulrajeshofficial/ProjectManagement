import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    setDetails: (state, action) => {
      console.log(action.payload);
      const { _id, fname, lname, email, phone, company, accessToken } = action.payload;

      state = {
        userId: _id !== undefined ? _id : state.userId,
        fname: fname !== undefined ? fname : state.fname,
        lname: lname !== undefined ? lname : state.lname,
        email: email !== undefined ? email : state.email,
        company: company !== undefined ? company : state.company,
        phone: phone !== undefined ? phone : state.phone,
        accessToken: accessToken !== undefined ? accessToken : state.accessToken,
      };
      return state;
    },
    unSetDetails: (state, action) => {
      state = null
      return state;
    }
  }
});

export const { setDetails, unSetDetails } = userDetailsSlice.actions;

export default userDetailsSlice.reducer;

export const userDetails = (state) => state.persistedReducer.userReducer;


