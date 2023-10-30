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
        image: 'https://i.ibb.co/P5Mnr6y/weather.png'
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
                        imagePath = "https://i.ibb.co/1914V32/cloud.png"
                    }
                    else if (res.data.weather[0].main == "Clear") {
                        imagePath = "https://i.ibb.co/hLKqp27/clear.png"
                    }
                    else if (res.data.weather[0].main == "Rain") {
                        imagePath = "https://i.ibb.co/r5pZMMY/rain.png"
                    }
                    else if (res.data.weather[0].main == "Drizzle") {
                        imagePath = "https://i.ibb.co/FzGLh6K/drizzle.png"
                    }
                    else if (res.data.weather[0].main == "Mist") {
                        imagePath = "https://i.ibb.co/wd9wcTG/mist.png"
                    }
                    else {
                        imagePath = "https://i.ibb.co/P5Mnr6y/weather.png"
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
            <div className="bg-[rgb(116,152,225)] w-full h-full lg:h-[100vh] py-6">
                <div className="weather p-0 md:p-8 mx-auto py-4 ">
                    <div className="search  m-4 lg:m-0">
                        <input className='py-3 px-5' onChange={e => setName(e.target.value)} type="text" placeholder="Enter City" />
                        <button className='bg-white px-4 py-4'><img onClick={handleClick} src="https://i.ibb.co/M5Nc6rn/search.png" alt="" /></button>
                    </div>
                    <div className="winfo">
                        <div className="error">
                            {error}
                        </div>
                        <img className='mx-auto' src={data.image} alt="" />
                        <h1>{Math.round(data.celcius)}°C</h1>
                        {/* <h1>{data.celcius}°C</h1> */}
                        <h2>{data.name}</h2>

                        <div className="details">
                            <div className="col">

                                <img src="https://i.ibb.co/Fg4DzXv/humidity.png" alt="" />
                                <div>
                                    <p>{Math.round(data.humidity)}%</p>
                                    <p>Humidity</p>
                                </div>
                            </div>
                            <div className="col">
                                <img src="https://i.ibb.co/xMtRRLk/wind.png" alt="" />
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