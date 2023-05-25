import { Box, Collapse, Typography } from '@mui/material';
import React, { useState } from 'react'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
const FAQ = ({ q, a }: { q: string, a: string }) => {

    const [open, setOpen] = useState(false);


    const handleChange = () => {
        setOpen((open) => !open)
       
    }


    return (
        <Box onClick={handleChange} sx={{

            mx: 5, borderColor: '#EE7203', borderWidth: 3, borderStyle: 'solid', my: 2, borderRadius: 5, width: '70%', px: 2,
            cursor: 'pointer',
            boxShadow:0,
            transition:'box-shadow 0.2s ease-in-out',
            "&:hover": {
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                transition: 'box-shadow 0.2s ease-in-out',


            }, display: 'flex', flexDirection: 'column', alignItems: 'center', py: 2
        }}>
            <Collapse in={open} collapsedSize={40} sx={{ width: '100%' }} easing='easing-in-out' timeout={400} >

                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }} >
                    <Typography
                        fontSize={{ xs: 15, md: 25 }}
                        // variant='h5' 

                        fontWeight={600} sx={{ pb: 3 }}>{q}</Typography>
                    <ArrowBackIosNewIcon fontSize='large' color='primary' sx={{ transform: (open ? 'rotate(90deg)' : 'rotate(-90deg)'),transition:'transform 0.4s ease-in-out' }} />
                </Box>
                <Typography variant='h5' mt={4} >{a}</Typography>

            </Collapse>
        </Box>
    )
}

export default FAQ