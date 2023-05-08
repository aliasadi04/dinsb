import User from "../../utils/types/user.type";
import { StoreReducerType } from "../store";
import { UserReducerType } from "./user.reducer";

export const selectCurrentUser=(state:StoreReducerType):User=>state.user.currentUser;

export const selectAllUsers=(state:StoreReducerType)=>state.user.allUsers;
