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
import { Booking } from "../utils/types/user.type";
import { signOutUser } from "../utils/firebase/firebase.utils";

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

const RecieptPage = () => {
  const currentUser = useSelector(selectCurrentUser);

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
        fontSize={40}
        fontWeight={600}
        mx={2}
        my={4}
        textAlign={"center"}
      >
        Tak fordi du valgte os!
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: 10,
				  border: "5px #131200 dashed",
		  p:2,
        }}
      >
        <Typography fontSize={25} mb={1} textAlign={"center"}>
          Du har reserveret soundboksen følgende dage
        </Typography>
        <Typography fontSize={20} fontWeight={900}>
          {currentUser.booking.chosenDays.join(", ")}
			  </Typography>

			  <Typography fontSize={20} mb={1} textAlign={"center"}>
          til en samlet pris på
        </Typography>
        <Typography fontSize={20} fontWeight={900}>
          {currentUser.booking.pris} kr.
			  </Typography>
			  
      </Box>
      {/* {currentUser && currentUser.booking && (
				<>
					<TableContainer component={Paper} sx={{ maxWidth: 1000 }}>
						<Table
							sx={{ overflow: "scroll", bgcolor: "rgba(238, 114, 3,0.8)" ,}}
						>
							<TableHead>
								<TableRow sx={{ border: "3px solid  white" }}>
									<TableCell sx={{...tableHeaderStyles,}}>Id</TableCell>
									<TableCell sx={{...tableHeaderStyles,}}>Antal dage</TableCell>
									<TableCell sx={{...tableHeaderStyles,}}>Pris</TableCell>
									<TableCell sx={{...tableHeaderStyles,}}>Dage</TableCell>
								</TableRow>
							</TableHead>

							<TableBody key={currentUser.createdAt}>
								{currentUser.booking.map((booking:Booking, index) => (
									<TableRow key={booking.chosenDays.join("")}>
										<TableCell sx={{...tableCellStyle,width:'1fr'}}>{index + 1}</TableCell>
										<TableCell sx={{...tableCellStyle,width:'2fr'}}>
											{booking.daysInterval}
										</TableCell>
										<TableCell sx={{...tableCellStyle,width:'2fr'}}>{booking.pris} kr.</TableCell>
										<TableCell sx={{...tableCellStyle,width:'2fr'}}>
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
			)} */}
    
      <Typography
        textAlign={"center"}
        fontStyle={"italic"}
        my={3}
        fontSize={{ xs: 15, md: 23 }}
      >
        Passer prisen ikke? Vil du have levering? Kontakt os på +45 23 43 84 33,
        så kan vi hjælpe dig hen ad vejen!
      </Typography>
      <Button onClick={() => signOutUser()}>logout</Button>
    </Box>
  );
};

export default RecieptPage;
