import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { postLogout } from '../../redux/actions'
import { useThemeMode } from '../../context/ThemeContext'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Switch from '@mui/material/Switch'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogActions from '@mui/material/DialogActions'

const Settings = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const authState = useSelector((store) => store.authReducer)
    const { celsius } = useSelector((store) => store.preferencesReducer)
    const { mode, toggleTheme } = useThemeMode()
    const [logoutDialog, setLogoutDialog] = useState(false)

    const storedUser = localStorage.getItem('user')
    const user = authState.user?.email ? authState.user : (storedUser ? JSON.parse(storedUser) : null)
    const isAuth = authState.isAuth || localStorage.getItem('weatherapp') === 'true'

    const handleLogout = () => {
        dispatch(postLogout())
        setLogoutDialog(false)
        navigate('/')
    }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
                Settings
            </Typography>

            <Box sx={{ bgcolor: 'background.paper', borderRadius: 3, overflow: 'hidden', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
                {isAuth && user && (
                    <>
                        <Box sx={{ p: 2.5 }}>
                            <Typography sx={{ fontSize: '0.75rem', color: 'text.secondary', mb: 0.5 }}>
                                Signed in as
                            </Typography>
                            <Typography sx={{ fontWeight: 500 }}>
                                {user.email || user.username}
                            </Typography>
                        </Box>
                        <Divider />
                    </>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2.5 }}>
                    <Box>
                        <Typography sx={{ fontWeight: 500 }}>Temperature Unit</Typography>
                        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                            {celsius ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
                        </Typography>
                    </Box>
                    <Switch
                        checked={celsius}
                        onChange={() => dispatch({ type: 'TOGGLE_TEMP_UNIT' })}
                    />
                </Box>

                <Divider />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2.5 }}>
                    <Box>
                        <Typography sx={{ fontWeight: 500 }}>Dark Mode</Typography>
                        <Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
                            {mode === 'dark' ? 'On' : 'Off'}
                        </Typography>
                    </Box>
                    <Switch
                        checked={mode === 'dark'}
                        onChange={toggleTheme}
                    />
                </Box>
            </Box>

            {isAuth && (
                <Box sx={{ mt: 4 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        color="error"
                        onClick={() => setLogoutDialog(true)}
                        sx={{ py: 1.5, borderRadius: 2 }}
                    >
                        Log out
                    </Button>
                </Box>
            )}

            <Typography sx={{ textAlign: 'center', mt: 4, fontSize: '0.75rem', color: 'text.secondary' }}>
                WeatherApp v1.0.0
            </Typography>

            <Dialog open={logoutDialog} onClose={() => setLogoutDialog(false)}>
                <DialogTitle>Log out?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You'll need to sign in again to access your favorites.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setLogoutDialog(false)}>Cancel</Button>
                    <Button onClick={handleLogout} color="error">Log out</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default Settings