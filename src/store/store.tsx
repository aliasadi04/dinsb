import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./user/user.reducer";
import { User } from "../utils/types/user.type";
import { composeWithDevTools } from "@reduxjs/toolkit/dist/devtoolsExtension";

//root reducer
// export const store = createStore(rootReducer,undefined, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export type RootState = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
	user: userReducer,
});

export const store = configureStore<RootState, any>({
	reducer: { user: userReducer },
});
