export const formatTemp = (temp, isCelsius = true) => {
    if (temp === undefined || temp === null) return '—'
    if (isCelsius) return Math.round(temp)
    return Math.round((temp * 9 / 5) + 32)
}

export const isDaytime = (dt, sunrise, sunset) => {
    if (!dt || !sunrise || !sunset) return true
    return dt >= sunrise && dt < sunset
}

export const getMoonPhase = (date) => {
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()

    if (month < 3) {
        year--
        month += 12
    }

    const c = 365.25 * year
    const e = 30.6 * month
    const jd = c + e + day - 694039.09
    const phase = jd / 29.53058867
    const phaseInt = Math.floor(phase)
    const phaseFraction = phase - phaseInt
    const phaseIndex = Math.floor(phaseFraction * 8) % 8

    const moons = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘']
    return moons[phaseIndex] || '🌕'
}

export const calculateAQI = (pm25) => {
    if (!pm25 || pm25 < 0) return null

    const breakpoints = [
        { cLow: 0.0, cHigh: 12.0, iLow: 0, iHigh: 50 },
        { cLow: 12.1, cHigh: 35.4, iLow: 51, iHigh: 100 },
        { cLow: 35.5, cHigh: 55.4, iLow: 101, iHigh: 150 },
        { cLow: 55.5, cHigh: 150.4, iLow: 151, iHigh: 200 },
        { cLow: 150.5, cHigh: 250.4, iLow: 201, iHigh: 300 },
        { cLow: 250.5, cHigh: 350.4, iLow: 301, iHigh: 400 },
        { cLow: 350.5, cHigh: 500.4, iLow: 401, iHigh: 500 }
    ]

    let bp = breakpoints.find(b => pm25 >= b.cLow && pm25 <= b.cHigh)
    if (!bp) bp = breakpoints[breakpoints.length - 1]

    const aqi = ((bp.iHigh - bp.iLow) / (bp.cHigh - bp.cLow)) * (pm25 - bp.cLow) + bp.iLow
    return Math.round(aqi)
}
