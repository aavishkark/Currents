import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { formatTemp } from '../../utils/weatherUtils'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Paper from '@mui/material/Paper'
import axios from 'axios'
import { getWeather, getWeatherByCoords } from '../../redux/actions'

const Dashboard = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { celsius } = useSelector((store) => store.preferencesReducer)
    const { currentWeather } = useSelector((store) => store.weatherReducer)
    const [query, setQuery] = useState('')
    const [results, setResults] = useState([])
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    dispatch(getWeatherByCoords(latitude, longitude))
                },
                (error) => {
                    dispatch(getWeather('London'))
                }
            )
        } else {
            dispatch(getWeather('London'))
        }
    }, [dispatch])

    useEffect(() => {
        if (query.length > 2) {
            const timer = setTimeout(() => {
                axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${API_KEY}`)
                    .then(res => setResults(res.data))
                    .catch(() => setResults([]))
            }, 300)
            return () => clearTimeout(timer)
        } else {
            setResults([])
        }
    }, [query, API_KEY])

    const handleCityClick = (city) => {
        navigate(`/city/${city.name}`)
    }

    const getGreeting = () => {
        const hour = new Date().getHours()
        if (hour < 12) return 'Good morning'
        if (hour < 18) return 'Good afternoon'
        return 'Good evening'
    }

    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: 500 }}>
                {getGreeting()}
            </Typography>

            {currentWeather && currentWeather.main && (
                <Box sx={{ mb: 4 }}>
                    <Typography variant="body2" color="text.secondary">
                        Currently in {currentWeather.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                        <Typography sx={{ fontSize: '3rem', fontWeight: 300 }}>
                            {formatTemp(currentWeather.main?.temp, celsius)}°
                        </Typography>
                        <Typography sx={{ fontSize: '1.25rem', textTransform: 'capitalize', mt: -1 }}>
                            {currentWeather.weather?.[0]?.description}
                        </Typography>
                    </Box>
                </Box>
            )}

            <Box sx={{ position: 'relative', mb: 4 }}>
                <TextField
                    fullWidth
                    placeholder="Search for a city..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        )
                    }}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            borderRadius: 2
                        }
                    }}
                />
                {results.length > 0 && (
                    <Paper
                        elevation={3}
                        sx={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            zIndex: 10,
                            mt: 1,
                            borderRadius: 2
                        }}
                    >
                        <List>
                            {results.map((city, index) => (
                                <ListItem
                                    key={`${city.name}-${city.country}-${index}`}
                                    onClick={() => handleCityClick(city)}
                                    sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                                >
                                    <ListItemText
                                        primary={city.name}
                                        secondary={`${city.state ? city.state + ', ' : ''}${city.country}`}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                )}
            </Box>
        </Container>
    )
}

export default Dashboard