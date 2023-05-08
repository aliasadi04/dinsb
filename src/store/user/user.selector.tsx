import { StoreReducerType } from "../store";
import { UserReducerType } from "./user.reducer";

export const selectCurrentUser=(state:StoreReducerType)=>state.user.currentUser;

export const selectAllUsers=(state:StoreReducerType)=>state.user.allUsers;
