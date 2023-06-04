import { PayloadAction } from "@reduxjs/toolkit";
import { USER_REDUCER_ACTION_TYPES } from "./user.types";
import User from "../../utils/types/user.type";

const INITIAL_STATE = {
	currentUser: {},
	allUsers: [],
};

export interface UserReducerType {
	currentUser: User,
	allUsers: User[],
}

export const userReducer = (state: UserReducerType, action: PayloadAction<any>): UserReducerType => {
	const { type, payload } = action;

	switch (type) {
		case USER_REDUCER_ACTION_TYPES.SET_CURRENT_USER:

			return { ...state, currentUser: payload };

		case USER_REDUCER_ACTION_TYPES.SET_USERS:
			return { ...state, allUsers: [...payload] }
		default:
			return state;
	}
};