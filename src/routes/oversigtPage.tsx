import {
	Box,
	Button,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/user/user.selector";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const tableHeaderStyles = {
	borderRight: "3px solid  white",
	fontWeight: 700,
	justifyContent: "center",
	fontSize: { xs: 15, md: 20 },
	color: "white",
	textAlign: "center",
};

const tableCellStyle = {
	border: "3px solid  white",
	color: "white",
	fontSize: { xs: 15, md: 20 },
	textAlign: "center",
};

const OversigtPage = () => {
	const currentUser = useSelector(selectCurrentUser);
	const navigate=useNavigate();
	

	return (
		<Box
			sx={{
				px: 4,
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			
			<Typography
				variant="h2"
				fontWeight={600}
				mx={4}
				my={4}
				textAlign={"center"}
			>
				Tak fordi du valgte os!
			</Typography>

			<Typography textAlign={"center"} mb={3} fontSize={{xs:20,md:25}}>
				Soundboksen kan hentes ved Triumfvej 62B fra kl.9 til kl.22 dagen
				lejeperioden starter fra. Beløbet modtages via mobilepay inden aflevering af Soundboksen.
			</Typography>
			<Typography variant="h3" mb={1}>
				Reserverationer
			</Typography>
			{currentUser && currentUser.bookings && (
				<>
					<TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
						<Table
							sx={{ overflow: "scroll", bgcolor: "rgba(238, 114, 3,0.8)" }}
						>
							<TableHead>
								<TableRow sx={{ border: "3px solid  white" }}>
									<TableCell sx={tableHeaderStyles}>Id</TableCell>
									<TableCell sx={tableHeaderStyles}>Antal dage</TableCell>
									<TableCell sx={tableHeaderStyles}>Pris</TableCell>
									<TableCell sx={tableHeaderStyles}>Dage</TableCell>
								</TableRow>
							</TableHead>

							<TableBody>
								{currentUser.bookings.map((booking, index) => (
									<TableRow>
										<TableCell sx={tableCellStyle}>{index + 1}</TableCell>
										<TableCell sx={tableCellStyle}>
											{booking.daysInterval}
										</TableCell>
										<TableCell sx={tableCellStyle}>{booking.pris}</TableCell>
										<TableCell sx={tableCellStyle}>
											{booking.chosenDays
												.map((date) =>
													moment(date, "MMM Do YY").format("DD/MM")
												)
												.join("-")}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				</>
			)}
			<Typography textAlign={"center"} fontStyle={"italic"} my={3} fontSize={{xs:15,md:23}}>
				Passer prisen ikke? Vil du have levering? Kontakt os på +45 23 43 84 33,
				så kan vi hjælpe dig hen ad vejen!
			</Typography>
		</Box>
	);
};

export default OversigtPage;
