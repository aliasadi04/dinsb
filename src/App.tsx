import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import Home from "./routes/homePage";
import FAQPage from "./routes/faqPage";
import { ThemeProvider } from "@emotion/react";
import {
	PaletteMode,
	createTheme,
	responsiveFontSizes,
	useMediaQuery,
} from "@mui/material";
import LejPage from "./routes/lejPage";
import {
	createSimpleUserDocumentFromAuth,
	getUserByUid,
	getUsers,
	onAuthStateChangedListener,
} from "./utils/firebase/firebase.utils";
import { User } from "./utils/types/user.type";
import { useDispatch } from "react-redux";
import RecieptPage from "./routes/recieptPage";
import OversigtPage from "./routes/oversigtPage";
import { setAllUsers, setCurrentUser } from "./store/user/user.slice";

// white
//#FFF8F0
// black
//131200

//secondary
// 414770

let theme = createTheme({
	palette: {
		common: {
			black: "#131200",
			white: "#FFF8F0",
		},
		primary: {
			main: "#EE7203",
		},
		text: {
			primary: "#140a00",
		},
	},
	typography: {
		fontFamily: "Source Sans Pro",
	},
});

theme = responsiveFontSizes(theme);

interface FirebaseUser extends User {
	uid: "string";
}

function App() {
	const dispatch = useDispatch();

	
	const setAllUsersFromFirebase = async () => {
		const allUsersFromFirebase = await getUsers();

		dispatch(setAllUsers(allUsersFromFirebase));
	};

	useEffect(() => {
		const unsubscribeFromUsersListener = onAuthStateChangedListener(
			(user: FirebaseUser) => {
				setAllUsersFromFirebase();
				// if (user) {
				// 	setCurrentUserFromFirebase(user);
				// } else {
				// 	dispatch(setCurrentUser({}));
				// }
			}
		);
		return unsubscribeFromUsersListener;
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Routes>
				<Route path="/" element={<Navbar />}>
					<Route index element={<Home />} />

					<Route path="/lej" element={<LejPage />} />
					<Route path="/faq" element={<FAQPage />} />
					<Route path="/reciept" element={<RecieptPage />} />
					<Route path="/oversigt" element={<OversigtPage />} />
				</Route>
			</Routes>
		</ThemeProvider>
	);
}

export default App;
