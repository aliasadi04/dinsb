import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Divider,
	Fade,
	Slide,
	TextField,
	Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import moment, { Moment } from "moment";
import {
	auth,
	createSimpleUserDocumentFromAuth,
	createUserDocumentFromAuth,
	formatErrorMessage,
	getBookedDates,
	PhoneNumberSignIn,
	updateDocumentInfo,
} from "../utils/firebase/firebase.utils";
import { FirebaseError } from "firebase/app";
import { useSelector } from "react-redux";
import { selectAllUsers, selectCurrentUser } from "../store/user/user.selector";
import { User } from "../utils/types/user.type";
import {
	ConfirmationResult,
	RecaptchaVerifier,
	signInWithPhoneNumber,
	signOut,
} from "firebase/auth";
import { signOutUser } from "../utils/firebase/firebase.utils";
import validator from "validator";
import { LoadingButton } from "@mui/lab";
import { HashLink } from "react-router-hash-link";
import { useNavigate } from "react-router-dom";
import "./lejPage.css";
import { weekendslejepris } from "./homePage";
// const client = require('twilio')(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

const arraysOverlap = (array1: string[], array2: string[]): boolean => {
	return array1.some((item) => array2.includes(item));
};

const weekendCounter = (startInput: Moment, endInput: Moment): number => {
	let weekdayCounter = 0;
	let start = startInput.clone();
	let end = endInput.clone();
	while (start <= end) {
		if (
			start.format("ddd") === "Sat" ||
			start.format("ddd") === "Sun" ||
			start.format("ddd") === "Fri"
		) {
			weekdayCounter++; //add 1 to your counter if its not a weekend day
		}
		start = moment(start, "YYYY-MM-DD").add(1, "days");
	}
	return weekdayCounter;
};

const Lej = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const recaptchaWrapperRef = useRef(null);
	const [dateData, setDateData] = useState<{
		startDate: Moment | null;
		endDate: Moment | null;
		daysInterval?: number;
		pris?: number;
		weekendsBetween?: number;
		chosenDays: string[];
	}>({
		pris: 0,
		chosenDays: [],
		startDate: null,
		endDate: null,
		daysInterval: 0,
	});
	const {
		pris,
		chosenDays,
		startDate,
		endDate,
		daysInterval,
		weekendsBetween,
	} = dateData;
	const [inputPhoneNumber, setInputPhoneNumber] = useState("");
	const [captchaState, setCaptchaState] = useState<RecaptchaVerifier | null>(
		null
	);
	const [confirmationObject, setConfirmationObject] =
		useState<ConfirmationResult | null>(null);

	const [openPhoneDialog, setOpenPhoneDialog] = React.useState(false);
	const [input, setInput] = useState("");
	// const [verifier, setVerifier] = useState<RecaptchaVerifier>(null);
	const currentUser = useSelector(selectCurrentUser);
	const allUsers = useSelector(selectAllUsers);

	const bookedDates = allUsers.reduce((acc, user) => {
			acc.push(...user.booking.chosenDays);
		
		return acc;
	}, []);

	const handleOpenPhoneDialog = () => {
		setOpenPhoneDialog(true);
	};

	const handleClosePhoneDialog = (reason: string) => {
		if (reason == "escapeKeyDown") return;
		if (reason == "backdropClick") return;
		setOpenPhoneDialog(false);
	};
	const onCaptchaVerify = () => {
		if (!window.recaptchaVerifier) {
			return new RecaptchaVerifier(
				"recaptcha-container",
				{
					size: "invisible",
					callback: (response: any) => {
						window.recaptchaVerifier.clear();
					},
					"expired-callback": () => {
						window.recaptchaVerifier.clear();
						onCaptchaVerify();
					},
				},
				auth
			);
		} else {
			return window.recaptchaVerifier;
		}
	};
	useEffect(() => {
		setCaptchaState(onCaptchaVerify());
	}, []);

	// const testClick = () => {
	//   client.messages
	//     .create({
	//       from: process.env.TWILIO_PHONE_NUMBER,
	//       to: '+4525677575',
	//       body: 'Testt'
	//     }).then((res) => { console.log(res); }
	//     )
	//     .catch(err => {
	//       console.log(err);

	//     });
	// }

	const submitHandler = async () => {
		setError("");

		const appVerifier = captchaState;
		setLoading(true);

		var phoneNumber: string = inputPhoneNumber;

		if (inputPhoneNumber.length > 8) {
			phoneNumber = "+" + inputPhoneNumber;
		} else {
			phoneNumber = "+45" + inputPhoneNumber;
		}

		if (validator.isMobilePhone(phoneNumber, "da-DK")) {
			setInputPhoneNumber("");
			if (appVerifier == null) return;
			PhoneNumberSignIn(phoneNumber, appVerifier)
				.then((res) => {
					setConfirmationObject(res);
					handleOpenPhoneDialog();
				})
				.catch((error) => {
					setError(formatErrorMessage(error));
					console.log(error);

					setLoading(false);
				});
		} else {
			setError("Ugyldigt telefonnummer");
			setLoading(false);
		}
	};

	const dialogSubmitHandler = async () => {
		setError("");
		setLoading(true);
		if (confirmationObject) {
			handleClosePhoneDialog("button");

			confirmationObject
				.confirm(input)
				.then((response) => {
				
					if (currentUser) {
						getBookedDates()
							.then((allBookedDates) => {
								
								
								if (!arraysOverlap(allBookedDates, chosenDays)) {
									updateDocumentInfo(
										"users",
										{
											booking: { pris, daysInterval, chosenDays }
										},
										response.user.uid
									).then((res) => navigate("../reciept"));
								} else {
									setError("De valgte datoer er ikke længere tilgængelige! ");
									setLoading(false);
								}
							})
							.catch((error) => {
								setError(formatErrorMessage(error));
								console.log(error);
								setLoading(false);
							});
					} else {
						console.log("BIG ERROR");
					}
				})
				.catch((error) => {
					setError("Forkerte kode!");
					console.log(error);

					setLoading(false);
				});

			setInput("");
		}
	};

	const onChangeDate = ({
		name,
		date,
	}: {
		name: "startDate" | "endDate";
		date: moment.Moment;
	}) => {
		const newDates = {
			...dateData,
			[name]: date,
		};
		const { startDate, endDate } = newDates;

		if (startDate && endDate) {
			const daysDifference = endDate.diff(startDate, "days") + 1;

			const weekendsBetween = weekendCounter(startDate, endDate);

			const daysBetween = daysDifference - weekendsBetween;

			const pris = daysBetween * 199 + weekendsBetween * 299;

			let chosenDays: string[] = [];
			let startingDate = startDate.clone();

			while (endDate.diff(startingDate) >= 0) {
				chosenDays.push(startingDate.format("MMM Do YY"));
				startingDate.add(1, "days");
			}

			setDateData({
				...newDates,
				pris: pris,
				daysInterval: daysDifference,
				chosenDays: chosenDays,
				weekendsBetween: weekendsBetween,
			});
		} else {
			setDateData({
				...newDates,
			});
		}
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexFlow: "row wrap",
				alignItems: "flex-start",
				minHeight: 1000,
				pb: 100,
				ml: 1,
				justifyContent: "center",
				px: { s: 0, md: 10 },
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					maxWidth: { xs: "70%", md: "40%" },
					transition: "right 2s",
					minWidth: "400px",
					textAlign: "center",
				}}
			>
				<Typography variant="h2" fontWeight={600} my={3}>
					Reserver en tid gratis og betal først ved afhentning!{" "}
				</Typography>
				{/* <Typography variant='h4' fontWeight={400} fontStyle='italic' my={3}>Skal afhentes ved Triumvej 62B, Bagsværd tidligst kl. 9 på startdagen </Typography> */}
				<Typography variant="h4" fontWeight={600} sx={{ mb: 3 }}>
					Vælg Udlejningsperiode
				</Typography>

				<Box
					sx={{
						display: "flex",
						flexDirection: { xs: "column", md: "row" },
						alignItems: "center",
						justifyContent: "space-between",
					}}
				>
					<Typography variant="h4" sx={{ mx: 2 }}>
						Fra
					</Typography>
					<DatePicker
						format="DD / MM / YY"
						displayWeekNumber
						shouldDisableDate={(date) =>
							bookedDates.includes(date.format("MMM Do YY"))
						}
						label="start dato"
						formatDensity="spacious"
						disablePast
						value={startDate}
						onChange={(value) =>
							onChangeDate({ name: "startDate", date: moment(value) })
						}
					/>
					<Typography variant="h4" sx={{ mx: 2 }}>
						Til
					</Typography>
					<DatePicker
						format="DD / MM / YY"
						displayWeekNumber
						shouldDisableDate={(date) =>
							bookedDates.includes(date.format("MMM Do YY"))
						}
						label="slut dato"
						formatDensity="spacious"
						disablePast
						value={endDate}
						onChange={(value) =>
							onChangeDate({ name: "endDate", date: moment(value) })
						}
					/>
				</Box>

				<Typography
					variant="h5"
					fontWeight={400}
					fontStyle="italic"
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						mt: 5,
					}}
				>
					{daysInterval !== 0
						? daysInterval > 0
							? `Lejeperiode : ${daysInterval} ${
									daysInterval > 1 ? "dage" : "dag"
							  }`
							: "slut dato kan ikke være før start dato!"
						: "Vælg venligst en start og en slut dato"}
				</Typography>

				<Typography
					variant="h4"
					fontWeight={600}
					sx={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						my: 2,
					}}
				>
					Pris:
					{`    ${pris} kr. `}
				</Typography>

				{pris > 0 && (
					<HashLink to="/#priser">Hvordan beregnes prisen?</HashLink>
				)}
				{weekendsBetween > 0 && (
					<Typography
						mt={2}
						color={"green"}
						fontStyle={"italic"}
						fontSize={{ xs: 15, md: 20 }}
					>
						Hvis du vil leje soundboksen for hele weekenden for kun 399 kr.
						bedes du at kontakte os direkte
					</Typography>
				)}
			</Box>

			{startDate && endDate && (
				<Fade in={startDate ? (endDate ? true : false) : false} style={{}}>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Typography variant="h4" mb={5}>
							Skriv din telefonnummer for at fortsætte
						</Typography>
						<TextField
							type="number"
							error={error.length > 0}
							// autoComplete='off'
							helperText={error}
							id="standard-basic"
							label="Telefon nummer"
							value={inputPhoneNumber}
							onChange={(event) => setInputPhoneNumber(event.target.value)}
						/>
						<LoadingButton
							loading={loading}
							onClick={submitHandler}
							id="phone-submit-button"
							variant="contained"
							sx={{ mb: 100, my: 3 }}
						>
							{loading ? "Loading..." : "Lej nu!"}
						</LoadingButton>
					</Box>
				</Fade>
			)}

			{/* <Button onClick={testClick} id='phone-submit-button' variant='contained' sx={{ mb: 100, my: 3 }}>Test</Button> */}

			<Dialog
				open={openPhoneDialog}
				onClose={(e, reason) => handleClosePhoneDialog(reason)}
			>
				<DialogTitle>Bekræft sms-kode</DialogTitle>
				<DialogContent sx={{ borderRadius: 10 }}>
					<DialogContentText>
						Skriv koden modtaget på SMS for at gå videre med lej af soundboks.
					</DialogContentText>
					<TextField
						autoFocus
						margin="dense"
						id="name"
						label="SMS kode"
						inputMode="numeric"
						type="number"
						fullWidth
						variant="standard"
						value={input}
						autoComplete="off"
						onChange={(e) => setInput(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={() => handleClosePhoneDialog("button")}>
						Annuler
					</Button>
					<Button onClick={dialogSubmitHandler}>Bekræft</Button>
				</DialogActions>
			</Dialog>
			{/* <Button onClick={testClick} >send message</Button> */}
			<div id="recaptcha-container" ref={recaptchaWrapperRef}></div>
		</Box>
	);
};

export default Lej;
