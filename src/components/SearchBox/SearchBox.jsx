import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { useState } from 'react';
import { getWeatherInfo } from '../../api/GetWeather.js';
import './SearchBox.css';


export default function SearchBox({getWeather , isError , parseLocationToQuery , isSubmitted}) {
    const [city , setCity] = useState("");

    const handleInputChange = (e) => {
        setCity(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedCity = city.trim();
        isSubmitted(true);

        if (!trimmedCity) return isError(true, city), isSubmitted(false);

        setCity("");
        const address = parseLocationToQuery(trimmedCity);
        const result = await getWeatherInfo({ address });

        if (Object.keys(result).length) {
            getWeather(result);
            isError(false, trimmedCity);
        } else {
            isError(true, trimmedCity);
        }
        isSubmitted(false);
    };

    return (
        <div>
            <h2>Search for weather</h2>
            <form onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="standard" onChange={handleInputChange} value={city}/>
                <Button id="button" type="submit" variant="contained" endIcon={<SendIcon />}>Search</Button>
            </form>
        </div>
    )
}