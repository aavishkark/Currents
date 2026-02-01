import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import L from 'leaflet'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Paper from '@mui/material/Paper'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import CloudIcon from '@mui/icons-material/Cloud'
import AirIcon from '@mui/icons-material/Air'
import CompressIcon from '@mui/icons-material/Compress'
import 'leaflet/dist/leaflet.css'
import './maps.css'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
    iconRetinaUrl: markerIcon2x,
    iconUrl: markerIcon,
    shadowUrl: markerShadow,
})

const WeatherLayer = ({ layer, apiKey }) => {
    const map = useMap()

    useEffect(() => {
        if (!layer) return

        const tileLayer = L.tileLayer(
            `https://tile.openweathermap.org/map/${layer}/{z}/{x}/{y}.png?appid=${apiKey}`,
            {
                opacity: 0.75,
                attribution: 'OpenWeatherMap',
                maxZoom: 18,
                tileSize: 256
            }
        )

        tileLayer.addTo(map)

        return () => {
            map.removeLayer(tileLayer)
        }
    }, [layer, apiKey, map])

    return null
}

const MapUpdater = ({ center, zoom }) => {
    const map = useMap()

    useEffect(() => {
        if (center) {
            map.setView(center, zoom)
        }
    }, [center, zoom, map])

    return null
}

const Maps = () => {
    const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY
    const { currentWeather } = useSelector((store) => store.weatherReducer)
    const [searchParams] = useSearchParams()
    const [layer, setLayer] = useState('temp_new')
    const [center, setCenter] = useState([20.5937, 78.9629])
    const [zoom, setZoom] = useState(5)
    const [markerPosition, setMarkerPosition] = useState(null)
    const [markerName, setMarkerName] = useState('')

    useEffect(() => {
        const lat = searchParams.get('lat')
        const lon = searchParams.get('lon')
        const city = searchParams.get('city')

        if (lat && lon) {
            const position = [parseFloat(lat), parseFloat(lon)]
            setCenter(position)
            setMarkerPosition(position)
            setMarkerName(city || 'Selected Location')
            setZoom(18)
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCenter([position.coords.latitude, position.coords.longitude])
                    setZoom(18)
                },
                () => {
                    if (currentWeather?.coord) {
                        setCenter([currentWeather.coord.lat, currentWeather.coord.lon])
                        setZoom(12)
                    }
                }
            )
        } else if (currentWeather?.coord) {
            setCenter([currentWeather.coord.lat, currentWeather.coord.lon])
            setZoom(18)
        }
    }, [searchParams, currentWeather])

    const handleLayerChange = (event, newLayer) => {
        if (newLayer !== null) {
            setLayer(newLayer)
        }
    }

    const layers = [
        { value: 'temp_new', label: 'Temperature', icon: ThermostatIcon },
        { value: 'precipitation_new', label: 'Precipitation', icon: WaterDropIcon },
        { value: 'clouds_new', label: 'Clouds', icon: CloudIcon },
        { value: 'wind_new', label: 'Wind', icon: AirIcon },
        { value: 'pressure_new', label: 'Pressure', icon: CompressIcon }
    ]

    return (
        <Container maxWidth="xl" sx={{ pt: 12, pb: 4 }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h4" sx={{
                    fontWeight: 700,
                    mb: 1,
                    background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    '[data-theme="dark"] &': {
                        background: 'linear-gradient(135deg, #cbd5e1 0%, #94a3b8 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }
                }}>
                    Weather Maps
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                    Explore real-time weather layers
                </Typography>

                <Paper elevation={0} sx={{
                    p: 2.5,
                    display: 'inline-block',
                    background: 'linear-gradient(145deg, rgba(30,41,59,0.98) 0%, rgba(15,23,42,0.98) 100%)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: 4,
                    border: '1px solid rgba(100,116,139,0.3)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    '[data-theme="dark"] &': {
                        background: 'linear-gradient(145deg, rgba(15,23,42,0.98) 0%, rgba(0,0,0,0.98) 100%)',
                        border: '1px solid rgba(71,85,105,0.4)',
                    }
                }}>
                    <Typography variant="overline" sx={{
                        display: 'block',
                        mb: 1.5,
                        color: '#94a3b8',
                        fontWeight: 600,
                        letterSpacing: 1.5,
                        fontSize: '0.7rem'
                    }}>
                        Weather Layers
                    </Typography>
                    <ToggleButtonGroup
                        value={layer}
                        exclusive
                        onChange={handleLayerChange}
                        sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: 1.5,
                            '& .MuiToggleButton-root': {
                                textTransform: 'none',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                borderRadius: 3,
                                px: 2.5,
                                py: 1,
                                color: '#cbd5e1',
                                borderColor: '#475569',
                                transition: 'all 0.2s ease',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.75,
                                '&.Mui-selected': {
                                    background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
                                    color: 'white',
                                    borderColor: '#0ea5e9',
                                    boxShadow: '0 4px 12px rgba(14,165,233,0.4)',
                                    transform: 'translateY(-2px)',
                                    '&:hover': {
                                        background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
                                    }
                                },
                                '&:hover': {
                                    backgroundColor: '#334155',
                                    borderColor: '#64748b',
                                    transform: 'translateY(-1px)',
                                }
                            }
                        }}
                    >
                        {layers.map((l) => {
                            const Icon = l.icon
                            return (
                                <ToggleButton key={l.value} value={l.value}>
                                    <Icon sx={{ fontSize: 18 }} />
                                    {l.label}
                                </ToggleButton>
                            )
                        })}
                    </ToggleButtonGroup>
                </Paper>
            </Box>

            <Paper elevation={3} sx={{
                height: 'calc(100vh - 300px)',
                minHeight: 500,
                overflow: 'hidden',
                borderRadius: 4,
                background: '#0f172a',
                border: '1px solid #1e293b'
            }}>
                <MapContainer
                    center={center}
                    zoom={zoom}
                    style={{ height: '100%', width: '100%' }}
                    className="weather-map"
                >
                    <TileLayer
                        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    />
                    <WeatherLayer layer={layer} apiKey={API_KEY} />
                    <MapUpdater center={center} zoom={zoom} />
                    {markerPosition && (
                        <Marker position={markerPosition}>
                            <Popup>
                                <strong>{markerName}</strong>
                            </Popup>
                        </Marker>
                    )}
                </MapContainer>
            </Paper>
        </Container>
    )
}

export default Maps
