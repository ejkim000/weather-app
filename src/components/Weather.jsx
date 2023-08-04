import { useState } from 'react';
import './weather.css';
import DisplayWeather from './DisplayWeather';

function Weather() {

    const APIKEY = import.meta.env.VITE_API_KEY;

    const [form, setform] = useState({
        city: '',
        country: ''
    });

    const [weather, setWeather] = useState({});
    const [err, setErr] = useState();

    async function weatherData(e) {

        e.preventDefault();

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${APIKEY}`;


        // fetch(url)
        //     .then(response => {
        //         if (response.ok) {
        //             return response.json()
        //         } else if (response.status === 404) {
        //             return Promise.reject('error 404')
        //         } else {
        //             return Promise.reject('some other error: ' + response.status)
        //         }
        //     })
        //     .then(data => console.log('data is', data))
        //     .catch(error => console.log('error is', error));

        if (form.city === '') {
            setErr('Enter City Name.');
        } else {

            await fetch(url)
                .then((res) => res.json())
                .then((data) => {

                    if (data.cod === 200) {
                        setWeather({data: data});
                        setErr('');
                    } else {
                        const err_msg = `An error has occured: ${data.cod} - ${data.message}`;
                        setErr(err_msg);
                        throw new Error(err_msg);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        if (name === 'city') {
            setform({ ...form, city: value });
        }

        if (name === 'country') {
            setform({ ...form, country: value });
        }
    }

    return (
        <div className='weather'>
            <div className='header'>
                <span className='title'>Weather App</span>
                <br />
                <form>
                    <input type='text' name='city' placeholder='city' onChange={handleChange} /> &nbsp; &nbsp;
                    <input type='text' name='country' placeholder='country' onChange={handleChange} />
                    <button className='getweather' onClick={weatherData}>Submit</button>
                </form>
                <div className='error'>{err}</div>
            </div>

            {
                weather.data ? (
                    <div>
                        <DisplayWeather data={weather.data} />
                    </div>
                ) : null
            }

        </div>
    )
}

export default Weather;