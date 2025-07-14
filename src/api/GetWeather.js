const GEOCODE_URL = import.meta.env.VITE_GEOCODE_URL;
const GEOCODE_API_KEY = import.meta.env.VITE_GEOCODE_API_KEY;
const API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

const getWeatherInfo = async ({address}) => {
    const response = await fetch(`${GEOCODE_URL}?text=${address}&apiKey=${GEOCODE_API_KEY}`);
    const data = await response.json();
    if(data.features.length !== 0) {
        const lat = data.features[0].geometry.coordinates[1];
        const lon = data.features[0].geometry.coordinates[0];
        const weatherResponse = await fetch(`${API_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`);
        const weatherData = await weatherResponse.json();
        let result = {
            city : weatherData.name,
            temp : weatherData.main.temp,
            temp_min : weatherData.main.temp_min,
            temp_max : weatherData.main.temp_max,
            feels_like : weatherData.main.feels_like,
            humidity : weatherData.main.humidity,
            pressure : weatherData.main.pressure,
            weather : weatherData.weather[0].description,
            icon : weatherData.weather[0].icon,
            extraInfo : {
                wind : weatherData.wind.speed,
                condition : weatherData.weather[0].main,
                sunrise : weatherData.sys.sunrise,
                sunset : weatherData.sys.sunset
            }
        }
        return result;
    }
    return {};
}

const convertToISTTime = (unixTimeStamp) => {
    const date = new Date(unixTimeStamp * 1000);
    const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
    }
    return date.toLocaleTimeString('en-IN' , options);
}

export { getWeatherInfo , convertToISTTime };