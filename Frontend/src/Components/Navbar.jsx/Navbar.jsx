import React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { postLogout } from '../../redux/actions'

const Navbar = () => {
    const [drawerOpen, setDrawerOpen] = React.useState(false)
    const auth = JSON.parse(localStorage.getItem('weatherapp'))
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleLogout = () => {
        setDrawerOpen(false)
        dispatch(postLogout())
        navigate('/')
    }

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return
        }
        setDrawerOpen(open)
    }

    const menuItems = [
        { text: 'Home', path: '/', show: true },
        { text: 'Favorites', path: '/favorites', show: true },
        { text: 'Settings', path: '/settings', show: auth },
        { text: 'Login', path: '/login', show: !auth },
    ]

    const drawerList = () => (
        <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {menuItems.filter(item => item.show).map((item) => (
                    <ListItem key={item.text} disablePadding>
                        <ListItemButton component={RouterLink} to={item.path}>
                            <ListItemText primary={item.text} />
                        </ListItemButton>
                    </ListItem>
                ))}
                {auth && (
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </ListItem>
                )}
            </List>
        </Box>
    )

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ backgroundColor: '#1a365d' }}>
                <Toolbar>
                    <Typography
                        variant="h6"
                        component={RouterLink}
                        to="/"
                        sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}
                    >
                        WeatherApp
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Button color="inherit" component={RouterLink} to="/">Home</Button>
                        <Button color="inherit" component={RouterLink} to="/favorites">Favorites</Button>
                        {auth && <Button color="inherit" component={RouterLink} to="/settings">Settings</Button>}
                        {auth && <Button color="inherit" onClick={handleLogout}>Logout</Button>}
                        {!auth && <Button color="inherit" component={RouterLink} to="/login">Login</Button>}
                    </Box>
                    <IconButton
                        size="large"
                        edge="end"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { xs: 'flex', md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawerList()}
            </Drawer>
        </Box>
    )
}

export default Navbar
