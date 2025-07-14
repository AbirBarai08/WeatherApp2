import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState , useEffect } from 'react';
import { getWeatherInfo , convertToISTTime } from '../../api/GetWeather.js';
import { weatherImages } from '../../assets/images'; // Adjust the path as necessary
import './InfoBox.css';

export default function InfoBox({ getWeather , parseLocationToQuery , onRenderCity , info , submitted}) {
    const [btnClicked , setBtnClicked] = useState(false);

    useEffect(() => {
        async function getKolkataWeather() {
            const address = parseLocationToQuery(onRenderCity);
            const result = await getWeatherInfo({address});
            getWeather(result);
        }
        getKolkataWeather()
    }, [getWeather , parseLocationToQuery , onRenderCity]);

    useEffect(() => {
        if(submitted) {
            setBtnClicked(false);
        }
    }, [submitted]);

    return (
        <>
            <div className="info-box">
                <h2>Weather Information</h2>
                <Card sx={{ maxWidth: 345 }}>
                    <CardMedia
                        component="img"
                        alt="some image"
                        height="140"
                        image= {
                            info.temp >= 25 && info.temp < 30 ? weatherImages.MOONSOON_IMAGE :
                            info.temp >= 30 ? weatherImages.SUMMER_IMAGE :
                            info.temp >= 20 && info.temp < 25 ? weatherImages.SPRING_IMAGE :
                            weatherImages.WINTER_IMAGE
                        }
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" align="center">
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <span>{info.city}</span>
                                <img src={`https://openweathermap.org/img/wn/${info.icon}@2x.png`} alt="icon" className='image-icon'/>
                            </Box>
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }} component={"span"}>
                        <p>Temperature = {info.temp}&deg;C</p>
                        <p>Humidity = {info.humidity}</p>
                        <p>Feels Like = {info.feels_like}&deg;C</p>
                        <p>Min Temp = {info.temp_min}&deg;C</p>
                        <p>Max Temp = {info.temp_max}&deg;C</p>
                        <p>Pressure = {info.pressure}</p>
                        <p>Weather = {info.weather}</p>
                        {
                            btnClicked && (
                                <>
                                    <p>Wind Speed = {info.extraInfo.wind} m/s</p>
                                    <p>Condition = {info.extraInfo.condition}</p>
                                    <p>Sunrise = {convertToISTTime(info.extraInfo.sunrise)}</p>
                                    <p>Sunset = {convertToISTTime(info.extraInfo.sunset)}</p>
                                </>
                            )
                        }
                        </Typography>
                    </CardContent>
                    {
                        !btnClicked && (
                            <CardActions>
                                <Button size="small" onClick={() => setBtnClicked(true)}>Learn More</Button>
                            </CardActions>
                        )
                    }
                </Card>
            </div>
        </>
    )
}