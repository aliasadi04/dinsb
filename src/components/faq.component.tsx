import { Box, Collapse, Typography } from '@mui/material';
import React, { useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const FAQ = ({ q, a }: { q: string, a: string }) => {

    const [open, setOpen] = useState(false);


    const handleChange = () => {
        setOpen((open) => !open)
        console.log(
            'h12'
        );

    }


    return (
        <Box onClick={handleChange} sx={{
      
            mx: 5, borderColor: '#EE7203', borderWidth: 3, borderStyle: 'solid', my: 2, borderRadius: 5, width: '70%', px: 2, 
            cursor:'pointer',
            "&:hover": {
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                transition: 'box-shadow 0.1s ease-in-out',
                

            }, display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2
        }}>
            <Collapse in={open} collapsedSize={40} sx={{width:'100%'}} >

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Typography variant='h4' fontWeight={600}>{q}</Typography>
                    <ArrowBackIosNewIcon fontSize='large' color='primary'sx={{ transform: (open ? 'rotate(270deg)' : 'rotate(90deg)') }} />
                </Box>
                <Typography variant='h5' mt={4} >{a}</Typography>

            </Collapse>
        </Box>
    )
}

export default FAQ