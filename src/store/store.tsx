import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.reducer";
import User from "../utils/types/user.type";

//root reducer
// export const store = createStore(rootReducer,undefined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export interface StoreReducerType {

	user: {
		currentUser: User,
		allUsers: User[],
	}

}

export const rootReducer = combineReducers({

	user: userReducer,


});
export const store = configureStore({ reducer: rootReducer },);
