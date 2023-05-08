import { createAction } from "../../utils/reducer/reducer.utils";
import User from "../../utils/types/user.type";
import { USER_REDUCER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user:User) => {
 return(createAction(USER_REDUCER_ACTION_TYPES.SET_CURRENT_USER, user))};

export const setAllUsers= (users:User)=> createAction(USER_REDUCER_ACTION_TYPES.SET_USERS,users);