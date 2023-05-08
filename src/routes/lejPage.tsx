import { Box, Button, Divider, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { StaticDateRangePicker } from '@mui/x-date-pickers-pro/StaticDateRangePicker';
import { DatePicker } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { createSimpleUserDocumentFromAuth, createUserDocumentFromAuth, PhoneNumberSignIn } from '../utils/firebase/firebase.utils';
import { FirebaseError } from 'firebase/app';

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
  const [error, setError] = useState('')
  const [startDate, setStartDate] = React.useState<Moment | null>(null);
  const [endDate, setEndDate] = React.useState<Moment | null>(null);
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');
  const [chosenDays, setChosenDays] = useState<string[]>([]);
  const [daysDifference, setDaysDifference] = useState(0);
  const [pris, setPris] = useState(0);


  useEffect(() => {
    if (!startDate) return
    if (!endDate) return
    const daysInterval = endDate.diff(startDate, 'days') + 1;

    setDaysDifference(daysInterval);


    const weekendsBetween = weekendCounter(startDate, endDate);


    const daysBetween = daysInterval - weekendsBetween;

    setPris(daysBetween * 199 + weekendsBetween * 399)

    let listToReturn: string[] = [];
    let startingDate = startDate;



    while (endDate.diff(startingDate) >= 0) {
      listToReturn.push(startingDate.format('MMM Do YY'));
      startingDate.add(1, 'days');
    }

    setChosenDays(listToReturn);

  }, [endDate, startDate])



  console.log(chosenDays);




  const submitHandler = async () => {
    setError('');

    setInputPhoneNumber('');
    try {
      const confirmationResult = await PhoneNumberSignIn(inputPhoneNumber);

      // const response = await confirmationResult.confirm(prompt('enter the code'));
      const response = await confirmationResult.confirm('enter the code');
      createSimpleUserDocumentFromAuth(response.user, { bookings: [] });

    } catch (error: any) {
      setError(error.message.substring(error.message.indexOf("(") + 1, error.message.lastIndexOf(")")).replace("-", " ").replace('auth', '').replace('/', '')
      )
    }

  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: 1000, pb: 100 }}>
      <Typography variant='h2' fontWeight={700} my={3}> Lej en Soundboks </Typography>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>

        <Typography variant='h3' fontWeight={600} sx={{ mb: 3 }} >Vælg dato</Typography>


        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'space-between' }} >
          <Typography variant='h4' sx={{ mx: 2 }}>Fra</Typography>
          <DatePicker format='DD / MM / YY' displayWeekNumber shouldDisableDate={(date) => bookedDates.includes(date.format('MMM Do YY'))} label='start dato' formatDensity='spacious' disablePast value={startDate} onChange={(value) => setStartDate(moment(value))} />
          <Typography variant='h4' sx={{ mx: 2 }}>Til</Typography>
          <DatePicker format='DD / MM / YY' displayWeekNumber shouldDisableDate={(date) => bookedDates.includes(date.format('MMM Do YY'))} label='slut dato' formatDensity='spacious' disablePast value={endDate} onChange={(value) => setEndDate(moment(value))} />
        </Box>

        <Typography variant='h5' fontWeight={400} fontStyle='italic' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
          {daysDifference ? daysDifference >= 0 ? (`Lejeperiode : ${daysDifference} ${daysDifference > 1 ? 'dage' : 'dag'}`) : 'Slutdato skal være efter startdato!' : 'Vælg venligst en start og slut dato'}
        </Typography>

        <Typography variant='h3' fontWeight={600} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: 2 }}>
          Pris:
          <Divider />

          {`${pris} kr. `}

        </Typography>
      </Box>

      <TextField error={error.length > 1} id="standard-basic" label="Telefon nummer" value={inputPhoneNumber} helperText={error} onChange={(event) => setInputPhoneNumber(event.target.value)} />
      <Button onClick={submitHandler} id='phone-submit-button' variant='contained' sx={{ mb: 100, my: 3 }}>Submit phone number</Button>
    </Box>
  )
}

export default Lej