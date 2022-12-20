import React, { useEffect, useState } from 'react'
import './App.css'

const App = () => {
  let search="";
  const [place,setPlace]=useState("Denver");
  const [state,setState]=useState({city:"Weather in Denver",temp:"51°C",icon:"https://openweathermap.org/img/wn/02n.png",description:"Cloudy",humidity:"Humidity: 60%",wind:"Wind speed: 6.2 km/h"})

  const apiKey="f37e299195f1c3e287f23fad0e98a441";

  useEffect(()=>{
  fetch("https://api.openweathermap.org/data/2.5/weather?q="
    + place
    + "&units=metric&appid="
    + apiKey)
    .then((response)=>response.json())
    .then((data)=>{displayWeather(data);})
    .catch((err)=>console.log(err));
  },[place]);

  const displayWeather=(data)=>{
    const {name}=data;
    const {icon,description}=data.weather[0];
    const {temp,humidity}=data.main;
    const {speed}=data.wind;
    setState({city:`Weather in ${name}`,temp:`${temp}°C`,icon:`https://openweathermap.org/img/wn/${icon}.png`,description,humidity:`Humidity: ${humidity}%`,wind:`Wind speed: ${speed} km/h`});
  }

  const handleClick=(e)=>{
    e.preventDefault();
    setPlace(search);
  }

  return (
    <div className="card">
    <div className="search">
        <input type="text" className="search-bar" placeholder="Search" onChange={(e)=>{search=e.target.value}}/>
        <button onClick={(e)=>handleClick(e)}><svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg></button>
    </div>
    <div className="weather">
        <h2 className="city"> {state.city}</h2>
        <h1 className="temp">{state.temp}</h1>
        <div className="flex">
        <img src={state.icon} alt="icn" className="icon"/>
        <div className="description">{state.description}</div>
    </div>
        <div className="humidity">{state.humidity}</div>
        <div className="wind">{state.wind}</div>
    </div>
    </div>
  )
}

export default App