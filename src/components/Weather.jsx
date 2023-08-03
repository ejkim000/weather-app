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

    async function weatherData(e) {
        e.preventDefault();

        if (form.city === '') {
            alert('Enter City');
        } else {
            try {
                const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${form.city},${form.country}&appid=${APIKEY}`);

                if (!res.ok) {
                    const message = `An error has occured: ${res.status}`;
                    throw new Error(message);
                } else {
                    const data = await res.json();

                    setWeather({
                        data: data
                    });
                }

                

            } catch (error) {
                console.log(error);
            }
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
            </div>


            {
                weather.data != undefined ? (
                    <div>
                        <DisplayWeather data={weather.data} />
                    </div>
                ) : null
            }

        </div>
    )
}

export default Weather;