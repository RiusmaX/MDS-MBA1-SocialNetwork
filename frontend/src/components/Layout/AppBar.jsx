import * as React from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import { styled, alpha } from '@mui/material/styles'
import SwitchButtonTheme from './../../components/Global/Buttons/SwitchButtonTheme'
import {
  MenuItem,
  InputBase,
  Tooltip,
  Button,
  Avatar,
  Container,
  Menu,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar
} from '@mui/material'
import { ReactComponent as Logo } from '../../assets/images/logo.svg'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import jwt_decode from 'jwt-decode'
import { useState, useEffect } from 'react'

const pages = [{
  name: 'Users',
  link: '/users'
}, {
  name: 'Conversations',
  link: '/chats'
}]
const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto'
  }
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}))

function ResponsiveAppBar() {
  const navigate = useNavigate()
  const [anchorElNav, setAnchorElNav] = React.useState(null)
  const [anchorElUser, setAnchorElUser] = React.useState(null)
  const { logout } = useAuth()
  const [theme, setTheme] = useState(
    window.localStorage.getItem('theme') || 'light'
  )
  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
    } else {
      setTheme('light')
    }
  }
  useEffect(() => {
    window.localStorage.setItem('theme', theme)
    document.body.className = theme
  }, [theme])

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = (link) => {
    setAnchorElNav(null)
    navigate(link)
  }

  const handleLogout = () => {
    logout()
  }

  const handleCloseUserMenu = (setting) => {
    // Lors du clique sur le paramètre Profile
    if (setting === 'Profile') {
      const token = window.localStorage.getItem('token')
      const decodedToken = jwt_decode(token)
      const userId = decodedToken.id
      // Redirection sur la page profile de l'utilisateur connecter
      // Modifier lorsque la connexion sera fonctionelle
      navigate('/users/' + userId)
    } else if (setting === 'Logout') {
      handleLogout()
    }
    setAnchorElUser(null)
  }

  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left'
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={() => handleCloseNavMenu(page.link)}>
                  <Typography textAlign='center'>{page.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
            <Link to='/' style={{ display: 'flex' }}>
              <Logo fill='white' stroke='white' />
            </Link>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to='/' style={{ display: 'flex' }}>
              <Logo fill='white' stroke='white' style={{ marginRight: 50 }} />
            </Link>

            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={() => handleCloseNavMenu(page.link)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }} marginRight={5}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder='Rechercher...'
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                  <Typography textAlign='center'>{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <SwitchButtonTheme handleOnClick={toggleTheme} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default ResponsiveAppBar
