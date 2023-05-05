import { Button, Card, CardActions, CardContent, Paper, Typography } from '@mui/material'
import React from 'react'
import { useIsOverflow } from '../utils/hooks/isOverFlow.hook';

interface Props {
    heading?: string,
    body?: string,
    sx?: object
}
const BasicCard = ({ heading = 'Card Heading', body = dummyText, sx = {} }: Props) => {

   
    return (
        <Card sx={{
            maxWidth: '60%',
            width: 300,
            borderRadius: 2,
            boxShadow: 4,
            ...sx,
            my:2,
            mx:2,
            
            
        }}>
            <CardContent>

                <Typography variant="h5" component="div" fontWeight={600} sx={{ mb: 1, }}>
                    {heading}
                </Typography>

                <Typography variant="body1" fontWeight={400} fontSize={18} >
                    {body}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default BasicCard




const dummyText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';