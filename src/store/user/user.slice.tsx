import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../utils/types/user.type";

export interface UserReducerType {
    currentUser: User | null;
    allUsers: User[];
}
const INITIAL_STATE: UserReducerType = {
    currentUser: null,
    allUsers: [],
};

const userSlice=createSlice({
    name: 'user',

    initialState: INITIAL_STATE,
    reducers: {
        setCurrentUser(state, action) {
            state.currentUser=action.payload;
        },
        setAllUsers(state,action){
            state.allUsers=action.payload;
        }
    }

})

export const userReducer=userSlice.reducer;
export const {setCurrentUser,setAllUsers}=userSlice.actions;