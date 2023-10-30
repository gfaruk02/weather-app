import { useState } from 'react';
import './style.css'
// import { useEffect } from 'react';
import axios from 'axios';

const Home = () => {
    const [data, setdata] = useState({
        celcius: 10,
        name: 'London',
        humidity: 10,
        speed: 2,
        image: '../public/imgs/weather.png'
    })
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    // useEffect(()=>{
    //     const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=germany&appid=c649c9d3917c328347c6bb242992a171&&units=metric';
    //     axios.get(apiUrl)
    //     .then(res=>{
    //         setdata({...data, celcius: res.data.main.temp, name: res.data.name, humidity:res.data.main.humidity, speed:res.data.wind.speed})
    //     })
    //     .catch(err=>console.log(err))

    // },[])
    const handleClick = () => {
        if (name !== "") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=c649c9d3917c328347c6bb242992a171&&units=metric`;
            axios.get(apiUrl)
                .then(res => {
                    let imagePath = '';
                    if (res.data.weather[0].main == "Clouds") {
                        imagePath = "../public/imgs/cloud.png"
                    }
                    else if (res.data.weather[0].main == "Clear") {
                        imagePath = "../public/imgs/clear.png"
                    }
                    else if (res.data.weather[0].main == "Rain") {
                        imagePath = "../public/imgs/rain.png"
                    }
                    else if (res.data.weather[0].main == "Drizzle") {
                        imagePath = "../public/imgs/drizzle.png"
                    }
                    else if (res.data.weather[0].main == "Mist") {
                        imagePath = "../public/imgs/mist.png"
                    }
                    else {
                        imagePath = "../public/imgs/weather.png"
                    }
                    setdata({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagePath });
                    setError('');
                })
                .catch(err => {
                    if (err.response.status == 404) {
                        setError("Invalid City Name");
                    }
                    else {
                        setError('');
                    }

                })
        }
    }
    return (
        <div>
            <div className="container">
                <div className="weather">
                    <div className="search">
                        <input onChange={e => setName(e.target.value)} type="text" placeholder="Enter City" />
                        <button><img onClick={handleClick} src="../public/imgs/search.png" alt="" /></button>
                    </div>
                    <div className="winfo">
                        <div className="error">
                            {error}
                        </div>
                        <img src={data.image} alt="" />
                        <h1>{Math.round(data.celcius)}°C</h1>
                        {/* <h1>{data.celcius}°C</h1> */}
                        <h2>{data.name}</h2>

                        <div className="details">
                            <div className="col">

                                <img src="../public/imgs/humidity.png" alt="" />
                                <div>
                                    <p>{Math.round(data.humidity)}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                            <div className="col">
                                <img src="../public/imgs/wind.png" alt="" />
                                <div>
                                    <p>{Math.round(data.speed)} Km/p</p>
                                    <p>Wind</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;