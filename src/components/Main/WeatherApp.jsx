import { useState , useCallback } from 'react';
import SearchBox from '../SearchBox/SearchBox.jsx';
import InfoBox from '../InfoBox/InfoBox.jsx';
import Error from '../Error/Error.jsx';

export default function WeatherApp() {
    const [info , setInfo] = useState({});
    const [error , setError] = useState({error : false , city : ""});
    const [submitted , setSubmitted] = useState(false);

    const isSubmitted = (value) => {
        setSubmitted(value);
    }

    const parseLocationToQuery = useCallback((city) => {
        const location = city.split(",").join(" ");
        const queryString = encodeURIComponent(location);
        return queryString;
    }, []);

    const getWeather = useCallback((result) => {
        setInfo(result);
    }, []);

    const isError = (error , city) => {
        setError({error , city});
    }

    return (
        <>
            <Error error={error}></Error>
            <SearchBox getWeather={getWeather} isError={isError} parseLocationToQuery={parseLocationToQuery} isSubmitted={isSubmitted}/>
            <InfoBox info={info} getWeather={getWeather} parseLocationToQuery={parseLocationToQuery} submitted={submitted} onRenderCity={"Kolkata , India"}/>
        </>
    ) 
}