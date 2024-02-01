import React, { useRef, useState } from 'react';
import "./Wether.css";
import search_icon from "../Assets/search.png";
import clear from "../Assets/clear.png";
import humidity from "../Assets/humidity.png";
import wind from "../Assets/wind.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import rain from "../Assets/rain.png";
import snow from "../Assets/snow.png";

const Weather = () => {
     let[wicon,setWicon] =useState(clear); 
     let[city,setCity]=useState("");
     let inputRef=useRef();

    let apikey="6e5a230039f9ddd3b8780f89bc74952e";    
 
    const search=()=>{   
        if(city ===""){
            return 0;
         }      

         let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${apikey}`;

         fetch(url)
         .then(response=>response.json())
         .then(data=>{
          const temperature=document.getElementsByClassName("temperature");
          const city=document.getElementsByClassName("weather-city");
          const humidity=document.getElementsByClassName("humid-percentage");
          const wind=document.getElementsByClassName("wind-speed");

          temperature[0].innerHTML=Math.floor(data.main.temp)+" °c";
          city[0].innerHTML=data.name;
          humidity[0].innerHTML=data.main.humidity+" %";
          wind[0].innerHTML=Math.floor(data.wind.speed)+" km/h";
           if(data.weather[0].icon ==="01d" || data.weather[0].icon ==="01n"){
               setWicon(clear);
               }else if(data.weather[0].icon ==="02d" || data.weather[0].icon ==="02n"){
                setWicon(cloud);
               }
               else if(data.weather[0].icon ==="03d" || data.weather[0].icon ==="03n"){
                setWicon(drizzle);
               }else if(data.weather[0].icon ==="04d" || data.weather[0].icon ==="04n"){
                setWicon(drizzle);
               }else if(data.weather[0].icon ==="09d" || data.weather[0].icon ==="09n"){
                setWicon(rain);
               }else if(data.weather[0].icon ==="10d" || data.weather[0].icon ==="10n"){
                setWicon(rain);
               }else if(data.weather[0].icon ==="13d" || data.weather[0].icon ==="13n"){
                setWicon(snow);
               }else{
                setWicon(clear);
               }                
               
            }); 
        
          city=inputRef.current.focus();
    }
     
  return (
   
    <div className='container'>
        <div className='top-bar'>
            <input text="text" ref={inputRef} className="city-input" value={city} onChange={event=>setCity(event.target.value)} placeholder="Enter city Name"/>
                <div className='search_icon' onClick={()=>{search()}}>
                     <img src={search_icon} alt=""/>
                </div>
        </div>      
        
     <div className='weather-image'>
            <img src={wicon} alt=""/>
    </div> 
         {city === "" ? "" : <div className='temperature'></div> }
      
        <div className='weather-city'>{city}</div>

      {city === "" ? "":
     <div className='data-container'>
         <div className='weather-conditions'>
             <img src={humidity} alt="" className='icon'/>
         <div className='data'>
             <div className='humid-percentage'>%</div>
             <div className='text'>Humidity</div>
         </div>
         </div>
         <div className='weather-conditions'>
             <img src={wind} alt="" className='icon'/>
         <div className='data'>
             <div className='wind-speed'>km/h</div>
             <div className='text'>Wind Speed</div>
         </div>
         </div>                          
        </div>} 
        
          
    </div>
   

  )
}

export default Weather;
