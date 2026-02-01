export const formatTemp = (temp, isCelsius = true) => {
    if (temp === undefined || temp === null) return '—'
    if (isCelsius) return Math.round(temp)
    return Math.round((temp * 9 / 5) + 32)
}
