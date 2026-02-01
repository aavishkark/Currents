import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, getFavorites, removeFavorite } from '../../redux/actions'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import FavoriteIcon from '@mui/icons-material/Favorite'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import axios from 'axios'
import WeatherDetails from '../../components/WeatherDetails/WeatherDetails'
import Forecast from '../../components/Forecast/Forecast'
import { formatTemp } from '../../utils/weatherUtils'

const City = () => {
    const { name } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { favorites } = useSelector((store) => store.favoritesReducer)
    const { celsius } = useSelector((store) => store.preferencesReducer)
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(true)
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

    const isFavorite = favorites?.some(fav => fav.cityName?.toLowerCase() === name?.toLowerCase())

    useEffect(() => {
        dispatch(getFavorites())
    }, [dispatch])

    useEffect(() => {
        if (name) {
            setLoading(true)
            axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&units=metric`)
                .then(res => {
                    setWeather(res.data)
                    setLoading(false)
                })
                .catch(() => setLoading(false))
        }
    }, [name, API_KEY])

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            const fav = favorites.find(f => f.cityName?.toLowerCase() === name?.toLowerCase())
            if (fav) dispatch(removeFavorite(fav._id))
        } else {
            dispatch(addFavorite({ cityName: name, country: weather?.sys?.country || '' }))
        }
    }

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
                <CircularProgress size={24} />
            </Box>
        )
    }

    if (!weather) {
        return (
            <Container maxWidth="sm" sx={{ py: 4 }}>
                <Typography>City not found</Typography>
            </Container>
        )
    }

    const iconCode = weather.weather?.[0]?.icon

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Container maxWidth="sm" sx={{ py: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <IconButton onClick={() => navigate(-1)} sx={{ ml: -1 }}>
                        <ArrowBackIcon />
                    </IconButton>
                    <IconButton onClick={handleFavoriteToggle} sx={{ color: isFavorite ? 'error.main' : 'inherit' }}>
                        {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                </Box>

                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography variant="h4" sx={{ fontWeight: 500, mb: 0.5 }}>
                        {weather.name}
                    </Typography>
                    <Typography sx={{ opacity: 0.8, fontSize: '0.9rem' }}>
                        {weather.sys?.country}
                    </Typography>
                </Box>

                <Box sx={{ textAlign: 'center', mb: 4 }}>
                    {iconCode && (
                        <img
                            src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
                            alt=""
                            style={{ width: 120, height: 120, marginBottom: -16 }}
                        />
                    )}
                    <Typography sx={{ fontSize: '5rem', fontWeight: 200, lineHeight: 1 }}>
                        {formatTemp(weather.main?.temp, celsius)}°
                    </Typography>
                    <Typography sx={{ fontSize: '1.1rem', opacity: 0.9, textTransform: 'capitalize', mt: 1 }}>
                        {weather.weather?.[0]?.description}
                    </Typography>
                    <Typography sx={{ fontSize: '0.9rem', opacity: 0.7, mt: 0.5 }}>
                        Feels like {formatTemp(weather.main?.feels_like, celsius)}°
                    </Typography>
                </Box>

                <WeatherDetails weather={weather} />
                <Forecast city={name} />
            </Container>
        </Box>
    )
}

export default City