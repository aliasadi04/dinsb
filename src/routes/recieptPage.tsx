import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../store/user/user.selector'

const RecieptPage = () => {

    const currentUser=useSelector(selectCurrentUser);

    return (
        <Box sx={{ px: 4, }}>
            <Typography
                variant='h2'
                fontWeight={600} >
                Tak fordi du valgte os!</Typography>


        </Box>
    )
}

export default RecieptPage