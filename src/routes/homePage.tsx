import { Box, Card, CardContent, Paper, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import BasicCard from "../components/basicCard.component";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import FlexBreak from "../components/flexBreak.component";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import soundbImage from "../assets/soundboks.png";
import homePoster from "../assets/smallposter.png";
import Carousel from "react-material-ui-carousel";
import Shape from "../assets/blob-haikei.svg";

export const dagslejehverdagspris = 499;
export const dagslejeweekendpris = 199;
export const weekendslejepris = 499;

const HvorforVælgeOsArray = [
  <BasicCard
    key={"1"}
    heading="Gratis Online Reservering"
    body="Hos DinSoundboks er booking en leg! Med vores online system kan du reservere en Soundboks ved blot at indtaste dit telefonnummer. Hurtigt, nemt og uden besvær. Planlæg din fest på ingen tid, og få den perfekte lydoplevelse med os!"
  />,
  <BasicCard
    key={"2"}
    heading="Fleksibilitet i Levering og Afhentning"
    body="Vi tilbyder fleksible leverings- og afhentningsmuligheder for vores kunder, så du kan få din soundboks leveret til lige præcis det sted og tidspunkt, der passer dig bedst. Vi sørger også for at afhente udstyret igen, når du er færdig med at bruge det."
  />,
  <BasicCard
    key={"3"}
    heading="Pris og Tilgængelighed"
    body="Vi tilbyder konkurrencedygtige priser og har altid flere soundbokse på lager, så du kan være sikker på, at du altid kan få fat i den udstyr, du har brug for. Vi sørger også for at tilbyde attraktive pakkeløsninger til vores kunder, så du kan spare penge ved at leje flere produkter samtidigt."
  />,
];

const Home = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  // const [top,setTop]=useState(1000);
  const carouselNextIndex = (carouselIndex + 1) % 3;
  const carouselPrevIndex = carouselIndex == 0 ? 2 : (carouselIndex - 1) % 3;
  // console.log(window.innerWidth);

  // useEffect(()=>{
  //     document.addEventListener(,()=>{setTop(window.)});
  //     return()
  // },[])

  return (
    <>
      <Paper
        sx={{
          display: "flex",

          flexFlow: "row wrap",
          height: "100%",
          margin: 0,

          justifyContent: "center",
          border: "0px solid black",
          boxShadow: "none",
        }}
      >
        <Box>
          <Box
            sx={{
              display: { xs: "block", md: "none" },
              maxWidth: "100%",
              height: "auto",
            }}
          >
            <img
              alt="Soundboks poster"
              src={homePoster}
              style={{ width: "100%", height: "100%" }}
            />
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              maxWidth: "100%",

              flexDirection: "row-reverse",
              pl: { sx: 0, lg: 6 },
            }}
          >
            <Box
              sx={{
                display: "grid",
                width: "40%",
                minWidth: 500,

                alignItems: "center",
                justifyContent: "center",
                marginRight: 1,
              }}
            >
              <Typography
                // fontSize={{ xs: 35, md: 80 }}
                fontWeight={700}
                variant="h1"
              >
                Lej En Soundboks For Kun 199kr
              </Typography>
              <Typography
                alignSelf={"start"}
                justifySelf={"start"}
                fontWeight={400}
                variant="h4"
              >
                Vi udlejer soundbokse til din næste fest i hele storkøbenhavn
              </Typography>
            </Box>

            <Box
              sx={{
                transition: "scale ease 0.5s",
                maxHeight: "609px",
                objectFit: "fill",
                width: "auto",
                ":hover": {
                  scale: "105%",
                },
              }}
            >
              <img alt="Soundboks gen 3" src={soundbImage} width={"auto"} />
            </Box>
          </Box>
        </Box>

        <FlexBreak m={100} />

        <Box sx={{position:'relative',width:"100%",display:"flex",flexDirection:"column",alignItems:"center"}}>
          <Box
            key={window.innerWidth}
            sx={{
              objectFit: "none",
              display: "grid",

              position: "absolute",
              overflow: "hidden",
              maxWidth: "100%",
              placeItems: "center",
              justifyContent: "center",
				
              top:'-130px'
            }}
          >
            <img
              src={Shape}
              alt="shape"
              style={{
                width: "1200px",
              }}
            />
          </Box>

          <Typography
            id="hvorfor"
            fontWeight={700}
            fontSize={{ xs: 40, md: 40 }}
            sx={{
              display: "flex",

              width: "100%",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
              color: "common.white",
            }}
          >
            Hvorfor vælge os
          </Typography>

          <Carousel
            sx={{
              width: { xs: "100%", md: "50%", lg: "30%" },
              justifyContent: "start",
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "space-between",
              minHeight: 400,
              zIndex: 2,
              mb: 30,
            }}
            next={(next, active) => {
              setCarouselIndex(next);
            }}
            prev={(prev, active) => {
              setCarouselIndex(prev);
            }}
            autoPlay={false}
            cycleNavigation={true}
            swipe={true}
            animation="slide"
            duration={700}
            index={0}
            fullHeightHover={false}
            PrevIcon={
              <ArrowBackIosIcon fontSize="large" sx={{ color: "#131200" }} />
            }
            NextIcon={
              <ArrowBackIosIcon
                fontSize="large"
                sx={{ color: "#131200", rotate: "180deg" }}
              />
            }
            navButtonsProps={{
              // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
              style: {
                backgroundColor: "transparent",
                borderRadius: 0,
                opacity: 1,
                marginLeft: 4,
                marginRight: 4,
              },
            }}
            navButtonsWrapperProps={{
              // Move the buttons to the bottom. Unsetting top here to override default style.
              style: {
                top: "30%",
              },
            }}
            indicatorIconButtonProps={{
              style: {
                padding: "7px", // 1
                color: "#131200",
                fontSize: "40px",
              },
            }}
            activeIndicatorIconButtonProps={{
              style: {
                // color: '#EE7203', // 2
                color: "white",
              },
            }}
            indicatorContainerProps={{
              style: {
                position: "relative",
                bottom: 3,
                alignItems: "end",
                marginTop: "20px",
              },
            }}
          >
            {HvorforVælgeOsArray}
          </Carousel>
        </Box>
        <FlexBreak />

        <Typography
          variant="h1"
          id="priser"
          fontWeight={600}
          sx={{
            mt: 10,
            transition: "all",
            transitionDuration: "1000",
          }}
        >
          Priser
        </Typography>

        <FlexBreak m={5} />
        <Box
          sx={{
            display: "flex",
            flexFlow: "row wrap",
            alignItems: "center",
            justifyContent: "center",
            transition: "all",
            transitionDuration: "1000",
          }}
        >
          <Card
            sx={{
              boxShadow: 5,
              mb: 5,
              borderRadius: 10,
              width: { xs: "100%", sm: 300 },
              mx: 3,
              height: 550,
              top: 0,
              position: "relative",
              transition: "top ease 0.5s",
              ":hover": { sx: null, md: { top: "-20px" } },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                height: 500,
              }}
            >
              <Typography fontSize={19} color="text.secondary" fontWeight={600}>
                Mandag - Torsdag
              </Typography>
              <Typography variant="h4" fontWeight={600} mb={1}>
                Dagsleje
              </Typography>
              <Typography
                fontSize={17}
                color="text.secondary"
                mb={1}
                fontWeight={600}
              >
                Lej en soundboks en hverdagsaften
              </Typography>

              {["Opladt Batteri", "GPS tracker", "Oplader", "Support"].map(
                (cardDetail) => (
                  <Typography
                    variant="h6"
                    key={cardDetail}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      mb: 2,
                      width: "100%",
                      px: 2,
                      boxSizing: "border-box",
                    }}
                  >
                    <DoneOutlineIcon color="primary" sx={{ mr: 1 }} />
                    {cardDetail}
                  </Typography>
                )
              )}

              <Typography variant="h3" fontWeight={600}>
                199 KR.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              boxShadow: 15,
              mb: 5,
              borderRadius: 10,
              height: 550,
              width: { xs: "100%", sm: 300 },
              mx: 3,
              bgcolor: "#EE7203",
              top: 0,
              position: "relative",
              transition: "top ease 0.5s",
              ":hover": { sx: null, md: { top: "-20px" } },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                height: 500,
              }}
            >
              <Typography fontSize={19} color="common.white" fontWeight={600}>
                Fredag - Søndag
              </Typography>
              <Typography
                variant="h4"
                fontWeight={600}
                color="common.white"
                mb={1}
              >
                Weekendsleje
              </Typography>
              <Typography
                fontSize={17}
                color="common.white"
                mb={1}
                fontWeight={600}
                textAlign="center"
              >
                Lej en soundboks hele weekenden til en rimlig pris!
              </Typography>

              {["Opladt Batteri", "Oplader", "44% billigere!", "Support"].map(
                (cardDetail) => (
                  <Typography
                    variant="h6"
                    color="common.white"
                    key={cardDetail}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      mb: 2,
                      width: "100%",
                      px: 2,
                      boxSizing: "border-box",
                    }}
                  >
                    <DoneOutlineIcon sx={{ mr: 1 }} />
                    {cardDetail}
                  </Typography>
                )
              )}

              <Typography variant="h3" color="common.white" fontWeight={600}>
                399 KR.
              </Typography>
            </CardContent>
          </Card>

          <Card
            sx={{
              boxShadow: 5,
              mb: 5,
              borderRadius: 10,
              height: 550,
              width: { xs: "100%", sm: 300 },
              mx: 3,
              top: 0,
              position: "relative",
              transition: "top ease 0.5s",
              ":hover": { sx: null, md: { top: "-20px" } },
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                height: 500,
              }}
            >
              <Typography fontSize={19} color="text.secondary" fontWeight={600}>
                Fredag - Søndag
              </Typography>
              <Typography variant="h4" fontWeight={600} mb={1}>
                Dagslej
              </Typography>
              <Typography
                fontSize={17}
                color="text.secondary"
                mb={1}
                fontWeight={600}
              >
                Lej en soundboks en weekend dag
              </Typography>

              {["Opladt Batteri", "GPS tracker", "Oplader", "Support"].map(
                (cardDetail) => (
                  <Typography
                    variant="h6"
                    key={cardDetail}
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      mb: 2,
                      width: "100%",
                      px: 2,
                      boxSizing: "border-box",
                    }}
                  >
                    <DoneOutlineIcon color="primary" sx={{ mr: 1 }} />
                    {cardDetail}
                  </Typography>
                )
              )}

              <Typography variant="h3" fontWeight={600}>
                299 KR.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* <Box sx={{
                    
                    position:'relative',
                    width:'2000px',
                    height: '1000px',
                    left:'-300px',
                    right:'-300px',
                    
                    borderRadius:'50%',
                    background: '#EE7203',
                    transform: 'rotate(-160deg)'
                }} /> */}
      </Paper>
      <Outlet />
    </>
  );
};

export default Home;
