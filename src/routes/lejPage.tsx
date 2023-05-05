import { Box, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { DatePicker } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';

const bookedDates = ['May 7th 23'];
const weekendCounter = (start: Moment, end: Moment): number => {
  let weekdayCounter = 0;
  while (start <= end) {
    if (start.format('ddd') === 'Sat' || start.format('ddd') === 'Sun' || start.format('ddd') === 'Fri') {
      weekdayCounter++; //add 1 to your counter if its not a weekend day
    }
    start = moment(start, 'YYYY-MM-DD').add(1, 'days');
  }
  return weekdayCounter;
}


const Lej = () => {

  const [startDate, setStartDate] = React.useState<Moment | null>(null);
  const [endDate, setEndDate] = React.useState<Moment | null>(null);

  const daysDifference = endDate?.diff(startDate, 'days');

  const weekendsBetween = startDate && endDate && weekendCounter(startDate, endDate);



  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 1000, }}>
      <Typography variant='h2' fontWeight={700} my={3}> Lej en Soundboks </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

        <Typography variant='h3' fontWeight={600} sx={{ mb: 3 }} >Vælg dato</Typography>


        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between' }} >
          <Typography variant='h4' sx={{ mx: 2 }}>Fra</Typography>
          <DatePicker displayWeekNumber shouldDisableDate={(date) => bookedDates.includes(date.format('MMM Do YY'))} label='start dato' formatDensity='spacious' disablePast value={startDate} onChange={(value) => setStartDate(moment(value))} />
          <Typography variant='h4' sx={{ mx: 2 }}>Til</Typography>
          <DatePicker displayWeekNumber shouldDisableDate={(date) => bookedDates.includes(date.format('MMM Do YY'))} label='slut dato' formatDensity='spacious' disablePast value={endDate} onChange={(value) => setEndDate(moment(value))} />
        </Box>

        <Typography variant='h5' fontWeight={400} fontStyle='italic' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
          {daysDifference && daysDifference < 100 ? daysDifference > 0 ? (`Lejeperiode : ${daysDifference} ${daysDifference === 1 ? 'dag' : 'dage'}`) : 'Slutdato skal være efter startdato!' : 'Vælg venligst en start og slut dato'}
        </Typography>

        <Typography variant='h3' fontWeight={600} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
          Pris:
          <Divider />

          {startDate && endDate && daysDifference && weekendsBetween && `${(daysDifference - weekendsBetween) * 99 + weekendsBetween * 299} kr. `}

        </Typography>
      </Box>

    </Box>
  )
}

export default Lej