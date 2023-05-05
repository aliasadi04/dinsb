import { AppBar, Box, Button, Divider, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import SpeakerIcon from '@mui/icons-material/Speaker';
import { HashLink } from 'react-router-hash-link';


const pages = ['Vores bokse', 'Priser', 'FAQ']


const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };




  return (
    <Box sx={{ overflow: 'clip' }}>

      <AppBar position="static" sx={{

        width: '100%',
        backgroundColor: 'white',
        height: 100,
        display: 'flex',
        marginBottom: 5,
        boxShadow: 'none',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',


      }} >


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

          <Box sx={{ fontWeight: 'bold', color: 'black' }} >din</Box>
          <Box sx={{ fontWeight: 'bold', color: '#EE7203' }} > SB </Box>
        </Typography>

        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }} >



          <Typography key='Vores bokse'
            component='a'
            href={''}
            onClick={handleCloseNavMenu}
            sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 600, fontSize: 20, mx: 3, textDecoration: 'none', color: 'common.black' }}>Vores bokse</Typography>

          <Typography key='Priser'

            component={HashLink}

            to='/#priser'
            onClick={handleCloseNavMenu}
            sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 600, fontSize: 20, mx: 3, color: 'common.black', textDecoration: 'none' }}>

            Priser

          </Typography>

          <Typography key='FAQ'
            component='a'
            href={'FAQ'}
            onClick={handleCloseNavMenu}
            sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 600, fontSize: 20, mx: 3, textDecoration: 'none', color: 'common.black' }}>FAQ</Typography>







          <Button variant='outlined'
            onClick={() => navigate("lej")}
            sx={{ minWidth: { xs: 100, md: 200 }, borderWidth: 2, borderRadius: 2.5, }}>
            <Typography noWrap fontSize={{ xs: 12, md: 18 }} fontWeight={600}>
              Lej en soundboks
            </Typography>
          </Button>
          <Box sx={{ display: { xs: 'flex', md: 'none' }, }}>

            <IconButton
              size="large"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon color='primary' fontSize='inherit' />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
                borderRadius: 1,
              }}
            >

              <MenuItem component={'a'} key='vores Bokse' href='/' onClick={() => {
                handleCloseNavMenu();
              }}>
                <Typography textAlign="center">vores Bokse</Typography>
              </MenuItem>

              <MenuItem component={HashLink} key='Priser' to='/#priser' onClick={() => {
                handleCloseNavMenu();
              }}>
                <Typography textAlign="center">Priser</Typography>
              </MenuItem>

              <MenuItem component={'a'} key='FAQ' href='/faq' onClick={() => {
                handleCloseNavMenu();
              }}>
                <Typography textAlign="center">FAQ</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>


      <Outlet />

      <Box sx={{
        background: 'white',
        display: 'flex',
        position: 'relative',
        margin: 'auto',
        mb: -10,
        width: '70%',
        boxSizing: 'border-box',
        boxShadow: 20,
        height: { xs: 150, md: 300 },
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        py: 5,
        px: 5,
      }} >


        <Typography noWrap fontSize={{ xs: 20, md: 60 }} fontWeight={900} sx={{}} >
          Brug for fed lyd til din næste fest?
        </Typography>

        <Button variant='contained'
          onClick={() => navigate("lej")}
          sx={{ width: 200, borderWidth: 2, borderRadius: 2.5, height: 50 }}>
          <Typography noWrap fontSize={{ xs: 16, md: 18 }} fontWeight={600} color='white'>
            Lej en soundboks
          </Typography>
        </Button>

      </Box>


      <Box sx={{
        width: '100%',

        position: 'static',
        backgroundColor: 'black',
        height: 600,
        display: 'flex',
        boxShadow: 'none',
        flexDirection: 'row',
        alignItems: 'baseline',
        pt: 20,
        mb: 0,
        justifyContent: 'space-around',
        px: 35,
        boxSizing: 'border-box',


      }} >

        <Typography color='common.white' fontWeight={700} variant='h4' sx={{ display: 'flex', flexDirection: 'column' }}>
          Sider
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' >Om os</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' href='lej' >Lej soundboks</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' >FAQs</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' >Handelsbetingelser</Typography>

        </Typography>

        <Typography color='common.white' fontWeight={700} variant='h4' sx={{ display: 'flex', flexDirection: 'column' }}>
          Resourcer
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' >Affiliate Program</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' >Hjælp med Soundboks</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' >Partners</Typography>

        </Typography>

        <Typography color='common.white' fontWeight={700} variant='h4' sx={{ display: 'flex', flexDirection: 'column' }}>
          Kontakt
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' >kontakt@dinsb.dk</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' >Skriv til os</Typography>


        </Typography>

      </Box>
    </Box >
  )
}

export default Navbar