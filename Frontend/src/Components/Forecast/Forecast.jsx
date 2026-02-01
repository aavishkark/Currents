import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { formatTemp } from '../../utils/weatherUtils'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'
import './Forecast.css'

const Forecast = ({ city }) => {
    const [forecast, setForecast] = useState([])
    const { celsius } = useSelector((store) => store.preferencesReducer)
    const [loading, setLoading] = useState(true)
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

    useEffect(() => {
        if (city) {
            setLoading(true)
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
                .then(res => {
                    const dailyData = res.data.list.filter((reading) => reading.dt_txt.includes("12:00:00"))
                    setForecast(dailyData)
                    setLoading(false)
                })
                .catch(() => setLoading(false))
        }
    }, [city, API_KEY])

    const getDayName = (dateStr) => {
        return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short' })
    }

    if (loading) {
        return (
            <Box className="forecast-loading">
                <CircularProgress size={24} />
            </Box>
        )
    }

    return (
        <Box className="forecast-container">
            <Typography variant="h6" className="forecast-title">5-Day Forecast</Typography>
            <Box className="forecast-list">
                {forecast.map((item) => (
                    <Box key={item.dt} className="forecast-item">
                        <Typography className="forecast-day">{getDayName(item.dt_txt)}</Typography>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                            alt="weather icon"
                            className="forecast-icon"
                        />
                        <Typography className="forecast-temp">{formatTemp(item.main.temp, celsius)}°</Typography>
                        <Typography className="forecast-desc">{item.weather[0].main}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

export default Forecast
