const searchBar = document.querySelector('.searchBar')
const forecastItems = document.querySelector('.forecast-container')

let display_weather = function(value){
           
    document.querySelector('.main_tag_container').style.display = "none"
    document.querySelector("#loading").style.display = "flex"
    document.querySelector('#loading').innerHTML = "Loading..."

    fetch(`https://weatherapi-com.p.rapidapi.com/forecast.json?q=${value}&days=3`,{
        method:'GET',
        headers: {
            'X-RapidAPI-Key': 'af24bbdd68mshc6045d80593d0d2p150673jsnf8acb67b2c00',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    })
    .then(res=>res.json())
    .then(data => {
       
       
       document.querySelector('.main_tag_container').style.display = "flex"
       document.querySelector('#error').style.display = "none"
       document.querySelector('#loading').style.display = "none"
       document.querySelector('.cloud').innerText = data.current.condition.text;
       document.querySelector('.image').src = `https:${data.current.condition.icon}`
       document.querySelector('.location').innerText  = data.location.name
       document.querySelector('.location-time').innerText  = "Date : " + data.location.localtime

 
       let temp = document.querySelector(".temp");
      temp.innerHTML= data.current.temp_c  +"<sup>o</sup>" + "c" ;
    
      let hum = document.querySelector(".humidity");
      hum.innerHTML="Humidity: "+ data.current.humidity + "%";
    
      let speed = document.querySelector(".speed");
      speed.innerHTML="WindSpeed: " +data.current.wind_kph + "km/h";

      let arr = ''
      data.forecast.forecastday.map((items)=>{
          arr +=
           ` <div class="forecast">
                 <div>${items.date}</div>
                 <div><img src=${ "https:" + items.day.condition.icon} /></div>
                 <div>${items.day.condition.text}</div>
                 <div>AvgTemp:${items.day.avgtemp_c} <sup>0</sup>c</div>
             </div>`
      })

      forecastItems.innerHTML = arr
     

    })
    .catch((err)=>{
        console.log("vvghvghvhgvhggvvhg")
        document.querySelector('.main_tag_container').style.display = "none"
        document.querySelector('#error').style.display = "flex"
        document.querySelector('#error').innerHTML = "No matching location found."
    })
    
    } 
display_weather("kadapa")
searchBar.addEventListener('submit' , (e)=>{
        e.preventDefault()    
        let value = document.querySelector('.search').value  
        display_weather(value)
})