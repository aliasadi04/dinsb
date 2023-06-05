import { AnyAction } from "@reduxjs/toolkit";
import { USER_REDUCER_ACTION_TYPES } from "./user.types";
import { User } from "../../utils/types/user.type";

export interface UserReducerType {
	currentUser: User | null;
	allUsers: User[];
}
const INITIAL_STATE: UserReducerType = {
	currentUser: null,
	allUsers: [],
};

export const userReducer = (
	state = INITIAL_STATE,
	action: AnyAction
): UserReducerType => {
	const { type, payload } = action;

	switch (type) {
		case USER_REDUCER_ACTION_TYPES.SET_CURRENT_USER:
			return { ...state, currentUser: payload };

		case USER_REDUCER_ACTION_TYPES.SET_USERS:
			return { ...state, allUsers: [...payload] };
		default:
			return state;
	}
};
