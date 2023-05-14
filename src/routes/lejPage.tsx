import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Fade, Slide, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { DatePicker } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { auth, createSimpleUserDocumentFromAuth, createUserDocumentFromAuth, formatErrorMessage, PhoneNumberSignIn } from '../utils/firebase/firebase.utils';
import { FirebaseError } from 'firebase/app';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../store/user/user.selector';
import User from '../utils/types/user.type';
import { ConfirmationResult, RecaptchaVerifier, signInWithPhoneNumber, signOut } from 'firebase/auth';
import { signOutUser } from '../utils/firebase/firebase.utils';
import validator from "validator";
import { LoadingButton } from '@mui/lab';



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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [startDate, setStartDate] = React.useState<Moment | null>(null);
  const [endDate, setEndDate] = React.useState<Moment | null>(null);

  const [dateInput, setDateInput] = useState<{ startDate: Moment | null, endDate: Moment | null }>({ startDate: null, endDate: null })
  const [inputPhoneNumber, setInputPhoneNumber] = useState('');
  const [chosenDays, setChosenDays] = useState<string[]>([]);
  const [daysDifference, setDaysDifference] = useState(0);
  const [pris, setPris] = useState(0);
  const [confirmationObject, setConfirmationObject] = useState<ConfirmationResult | null>(null);
  const [openPhoneDialog, setOpenPhoneDialog] = React.useState(false);
  const [input, setInput] = useState('');
  // const [verifier, setVerifier] = useState<RecaptchaVerifier>(null);

  const handleOpenPhoneDialog = () => {
    setOpenPhoneDialog(true);
  };

  const handleClosePhoneDialog = () => {
    setOpenPhoneDialog(false);
  };

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


  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response: any) => {
            submitHandler();
          },
          "expired-callback": () => { },
        },
        auth
      );
    }
  }


  const submitHandler = async () => {
    setError('');
    onCaptchVerify();
    setLoading(true);

    var phoneNumber: string = inputPhoneNumber;


    if (inputPhoneNumber.length > 8) {
      phoneNumber = '+' + inputPhoneNumber;
    } else {
      phoneNumber = '+45' + inputPhoneNumber;
    }


    if (validator.isMobilePhone(phoneNumber, 'da-DK')) {
      setInputPhoneNumber('');
      const appVerifier = window.recaptchaVerifier;
      PhoneNumberSignIn(phoneNumber, appVerifier).then((res) => { setConfirmationObject(res); handleOpenPhoneDialog(); })

    } else {

      setError('Ugyldigt telefonnummer');
    }



    // .then((confirmationResult) => {

    //   const code = prompt('enter the code');
    //   confirmationResult.confirm(code ? code : 'dsajlfk')
    //     .then((response) => {
    //       console.log(response);
    //       createSimpleUserDocumentFromAuth(response.user, { bookings: [] })
    //         .then(res => console.log(res))
    //         .catch((error) => console.log(error))
    //     }).then((error) => {
    //       console.log(error); alert('Forkerte kode');
    //     })
    // }

    // ).catch((error) => {
    //   console.log(error);
    //   if (error.message) {
    //     setError(formatErrorMessage(error))
    //   } else {
    //     console.log(error);
    //   }
    // })


    setLoading(false);

  }

  const dialogSubmitHandler = async () => {
    if (confirmationObject) {
      handleClosePhoneDialog();
      try {
        const response = await confirmationObject.confirm(input);
        console.log(response);
        createSimpleUserDocumentFromAuth(response.user, { bookings: [] })
          .then(res => console.log(res))
          .catch((error) => console.log(error))

      } catch (error) {
        setError('Forkerte kode!')
        setLoading(false);
      }


    }
    setInput('');

    // createSimpleUserDocumentFromAuth(response.user, { bookings: [] });
  }

  return (
    <Box sx={{ display: 'flex', flexFlow: 'row wrap', alignItems: 'flex-start', minHeight: 1000, pb: 100, ml: 1, justifyContent: 'space-around', px: { s: 0, md: 25 } }}>


      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '40%', transition: 'right 2s', minWidth: '460px' }}>
        <Typography variant='h2' fontWeight={700} my={3}>Lej en soundboks </Typography>

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

        <Typography variant='h4' fontWeight={600} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', my: 2 }}>
          Pris:


          {`    ${pris} kr. `}

        </Typography>
      </Box>



      {
        // startDate && endDate &&

        // <Fade in={startDate ? endDate ? true : false : false}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', }}>
          <Typography variant='h4' >Skriv din telefonnummer for at fortsætte</Typography>
          <TextField type='number' error={error.length > 0}
            // autoComplete='off'
            helperText={error} id="standard-basic" label="Telefon nummer" value={inputPhoneNumber} onChange={(event) => setInputPhoneNumber(event.target.value)} />
          <LoadingButton loading={loading} onClick={submitHandler} id='phone-submit-button' variant='contained' sx={{ mb: 100, my: 3 }}>{loading ? 'Loading...' : 'Lej nu!'}</LoadingButton>
        </Box>
        // </Fade>
      }

      <Button onClick={() => signOutUser()} id='phone-submit-button' variant='contained' sx={{ mb: 100, my: 3 }}>Log out</Button>


      <Dialog open={openPhoneDialog} onClose={handleClosePhoneDialog}>
        <DialogTitle>Bekræft sms-kode</DialogTitle>
        <DialogContent>

          <DialogContentText>
            Skriv koden modtaget på SMS for at gå videre med lej af soundboks.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="SMS kode"
            type="number"
            fullWidth
            variant="standard"
            value={input}
            autoComplete='off'
            onChange={(e) => setInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePhoneDialog}>Gå tilbage</Button>
          <Button onClick={dialogSubmitHandler}>Bekræft</Button>
        </DialogActions>
      </Dialog>
      <div id="recaptcha-container"></div>
    </Box>


  )
}

export default Lej

