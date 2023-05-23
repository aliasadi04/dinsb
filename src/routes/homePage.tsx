import { Box, Card, CardContent, Paper, Typography } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import BasicCard from '../components/basicCard.component'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import FlexBreak from '../components/flexBreak.component';


export const dagslejehverdagspris = 499;
export const dagslejeweekendpris = 199;
export const weekendslejepris = 499;
const slideUpStyle = {
    top: 0,
    position: 'relative',
    transition: 'top ease 0.5s',
    ":hover": {
        top: '-30px',
    }
}
const Home = () => {
    return (
        <>
            <Paper sx={{
                display: 'flex',

                flexFlow: 'row wrap',
                height: '100%',
                margin: 0,

                justifyContent: 'center',
                border: '0px solid black',
                boxShadow: 'none',
                pb: 40,
            }}>

                <Box sx={{ width: '40%', paddingTop: 15, minWidth: 300, marginLeft: 1, }}>
                    <Typography
                        // fontSize={{ xs: 35, md: 80 }} 
                        fontWeight={700}
                        variant='h1'
                    >Lej En Soundboks For Kun 99kr</Typography>
                    <Typography fontWeight={400} variant='h4' >Vi udlejer soundbokse til din næste fest i hele storkøbenhavn</Typography>
                </Box>

                <Box sx={{ mb: 20, }}>
                    <img alt='Soundboks gen 3' src='https://shoppia.dk/wp-content/uploads/2022/10/SOUNDBOKS-Gen.-3-Traadloes-hoejtaler-med-batteri-1.jpg' />
                </Box>



                <Typography id='hvorfor' fontWeight={700} fontSize={{ xs: 40, md: 40 }} sx={{ width: '100%', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}>Hvorfor vælge os</Typography>
                <Box sx={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'center', width: '100%', alignItems: 'baseline' }}>

                    <BasicCard heading='Gratis Online Reservering' body='Hos DinSoundboks er booking en leg! Med vores online system kan du reservere en Soundboks ved blot at indtaste dit telefonnummer. Hurtigt, nemt og uden besvær. Planlæg din fest på ingen tid, og få den perfekte lydoplevelse med os!' />
                    <BasicCard heading='Fleksibilitet i Levering og Afhentning' body='Vi tilbyder fleksible leverings- og afhentningsmuligheder for vores kunder, så du kan få din soundboks leveret til lige præcis det sted og tidspunkt, der passer dig bedst. Vi sørger også for at afhente udstyret igen, når du er færdig med at bruge det.' />
                    <BasicCard heading='Pris og Tilgængelighed' body='Vi tilbyder konkurrencedygtige priser og har altid flere soundbokse på lager, så du kan være sikker på, at du altid kan få fat i den udstyr, du har brug for. Vi sørger også for at tilbyde attraktive pakkeløsninger til vores kunder, så du kan spare penge ved at leje flere produkter samtidigt.' />

                </Box>


                <Typography variant='h1' id='priser' fontWeight={600} sx={{
                    mt: 10,


                }}>Priser</Typography>

                <FlexBreak m={5} />
                <Box sx={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'center', justifyContent: 'center', }}>
                    <Card sx={{ boxShadow: 5, mb: 5, borderRadius: 10, width: 300, mx: 3, height: 550, ...slideUpStyle }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 500 }}>
                            <Typography fontSize={19} color='text.secondary' fontWeight={600}>Mandag - Torsdag</Typography>
                            <Typography variant='h4' fontWeight={600} mb={1}>Dagsleje</Typography>
                            <Typography fontSize={17} color='text.secondary' mb={1} fontWeight={600}>Lej en soundboks en hverdagsaften</Typography>

                            {['Opladt Batteri', 'GPS tracker', 'Oplader', 'Support'].map((cardDetail) => <Typography variant='h6' key={cardDetail} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', mb: 2, width: '100%', px: 2, boxSizing: 'border-box' }}>
                                <DoneOutlineIcon color='primary' sx={{ mr: 1 }} />{cardDetail}</Typography>)}

                            <Typography variant='h3' fontWeight={600} >99 KR.</Typography>
                        </CardContent>
                    </Card>


                    <Card sx={{ boxShadow: 15, mb: 5, borderRadius: 10, height: 550, width: 300, mx: 3, bgcolor: '#EE7203', ...slideUpStyle }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 500 }}>
                            <Typography fontSize={19} color='common.white' fontWeight={600}>Fredag - Søndag</Typography>
                            <Typography variant='h4' fontWeight={600} color='common.white' mb={1}>Weekendsleje</Typography>
                            <Typography fontSize={17} color='common.white' mb={1} fontWeight={600} textAlign='center'>Lej en soundboks hele weekenden til en rimlig pris!</Typography>

                            {['Opladt Batteri', 'GPS tracker', 'Oplader', 'Support'].map((cardDetail) => <Typography variant='h6' color='common.white' key={cardDetail} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', mb: 2, width: '100%', px: 2, boxSizing: 'border-box' }}>
                                <DoneOutlineIcon sx={{ mr: 1, }} />{cardDetail}</Typography>)}


                            <Typography variant='h3' color='common.white' fontWeight={600} >399 KR.</Typography>
                        </CardContent>
                    </Card>


                    <Card sx={{ boxShadow: 5, mb: 5, borderRadius: 10, height: 550, width: 300, mx: 3, ...slideUpStyle }}>
                        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around', height: 500 }}>
                            <Typography fontSize={19} color='text.secondary' fontWeight={600}>Fredag - Søndag</Typography>
                            <Typography variant='h4' fontWeight={600} mb={1}>Dagslej</Typography>
                            <Typography fontSize={17} color='text.secondary' mb={1} fontWeight={600}>Lej en soundboks en weekend dag</Typography>

                            {['Opladt Batteri', 'GPS tracker', 'Oplader', 'Support'].map((cardDetail) => <Typography variant='h6' key={cardDetail} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', mb: 2, width: '100%', px: 2, boxSizing: 'border-box' }}>
                                <DoneOutlineIcon color='primary' sx={{ mr: 1 }} />{cardDetail}</Typography>)}

                            <Typography variant='h3' fontWeight={600} >299 KR.</Typography>
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

    )
}


export default Home