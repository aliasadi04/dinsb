import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../store/user/user.selector'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const RecieptPage = () => {

    const currentUser = useSelector(selectCurrentUser);
    console.log(currentUser);

    return (
        <Box sx={{ px: 4, }}>
            <Typography
                variant='h2'
                fontWeight={600} mx={4}>
                Tak fordi du valgte os!</Typography>

            {currentUser.bookings &&
                <table>
                    <th>
                        <td>Dage</td>
                        <td>Antal dage</td>
                        <td>Pris</td>
                    </th>
                    {currentUser.bookings.map(booking => <tr>
                        <td>{booking.chosenDays}</td>
                    </tr>)}
                </table>
            }
            <Typography>

            </Typography>

        </Box>
    )
}

export default RecieptPage