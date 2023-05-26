import { Typography, Box } from '@mui/material'
import React from 'react'
import SpeakerIcon from '@mui/icons-material/Speaker';
import wavelogo from '../assets/sound.png';
const DinSbLogo = () => {
    return (
        <Typography
            noWrap
            component='a'
            href='/'
            sx={{
                display: 'flex',
                flexDirection: 'row',

                textDecoration: 'none',
                marginLeft: '3%',

                fontSize: { xs: 25, md: 40 },
                alignItems: 'center'
            }} >
            <SpeakerIcon fontSize='large' color='primary' sx={{ display: { xs: 'none', md: 'flex' } }} />

        

            <Box sx={{ fontWeight: 'bold', color: 'black' }} >DIN</Box>
            <Box sx={{ fontWeight: 'bold', color: '#EE7203' }} > SB </Box>


        </Typography>
    )
}

export default DinSbLogo