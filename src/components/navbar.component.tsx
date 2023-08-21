import { AppBar, Box, Button, Divider, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import MenuIcon from '@mui/icons-material/Menu';
import { HashLink } from 'react-router-hash-link';
import DinSbLogo from './logo';





const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);


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
    <Box sx={{ display: 'grid', gridTemplateColumns: '100%' }}>

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


       <DinSbLogo/>

        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }} >



          {/* <Typography key='Vores bokse'
            component='a'
            href={''}
            onClick={handleCloseNavMenu}
            sx={{ display: { xs: 'none', md: 'flex' }, fontWeight: 600, fontSize: 20, mx: 3, textDecoration: 'none', color: 'common.black' }}>Vores bokse</Typography> */}

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
            <Typography noWrap fontSize={{ xs: 12, md: 18 }} fontWeight={600} >
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

              {/* <MenuItem component={'a'} key='vores Bokse' href='/' onClick={() => {
                handleCloseNavMenu();
              }}>
                <Typography textAlign="center">vores Bokse</Typography>
              </MenuItem> */}

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


        <Typography noWrap fontSize={{ xs: 15,sm:20, md: 40, lg: 60 }} fontWeight={{xs:500,md:900}} sx={{pb:5}} >
          Brug for fed lyd til din næste fest?
        </Typography>

        <Button variant='contained'
          onClick={() => navigate("lej")}
          sx={{ width: 200, borderWidth: 2, borderRadius: 2.5, height: 50, ":hover":{backgroundColor:'#d16200'}}}>
          <Typography noWrap fontSize={{ xs: 16, md: 18 }} fontWeight={600} color='white'>
            Lej en soundboks
          </Typography>
        </Button>

      </Box>


      <Box sx={{
        width: '100%',

        position: 'static',
        backgroundColor: 'black',
        height: 'auto',
        display: 'flex',
        boxShadow: 'none',
        flexDirection: 'row',
        alignItems: 'baseline',

        pt: 15,
        pb: 10,
        
        mb: 0,
        justifyContent: 'space-around',
        px: 10,
        boxSizing: 'border-box',
        flexWrap: 'wrap'

      }} >

        <Box color='common.white' sx={{ display: 'flex', flexDirection: 'column', minWidth: 200, my: 2 }}>
          <Typography fontWeight={700} variant='h4'>Sider</Typography>

          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5, textDecoration: 'none', color: 'white' }} variant='h6' component='a' >Om os</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5, textDecoration: 'none', color: 'white' }} variant='h6' component='a' href='lej'  >Lej soundboks</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5, textDecoration: 'none', color: 'white' }} variant='h6' component='a' href='faq'>FAQs</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5, textDecoration: 'none', color: 'white' }} variant='h6' component='a' >Handelsbetingelser</Typography>

        </Box>

        {/* <Box color='common.white' sx={{ display: 'flex', flexDirection: 'column', minWidth: 300, my: 2 }}>
          <Typography fontWeight={700} variant='h4'>Resourcer</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' >Affiliate Program</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' >Hjælp med Soundboks</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' >Partners</Typography>

        </Box> */}

        <Box color='common.white' sx={{ display: 'flex', flexDirection: 'column', minWidth: 200, my: 2 }}>
          <Typography fontWeight={700} variant='h4'>Kontakt</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' >kontakt@dinsb.dk</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' >+45 00 00 00 00</Typography>
          <Typography fontWeight={300} sx={{ cursor: 'pointer', my: 0.5 }} variant='h6' component='a' >+45 00 00 00 00</Typography>

        </Box>

      </Box>
    </Box >
  )
}

export default Navbar