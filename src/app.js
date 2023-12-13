//function to receive a timestamp
function formatDate(timestamp){
    //calculate the date
    let date=new Date(timestamp);
    let hours=date.getHours();
    if(hours<10){
        hours=`0${hours}`;
    }
    let minutes=date.getMinutes();
    if(minutes<10){
        minutes=`0${minutes}`;
    }
    let days=["Sunday","Monday","Tuesday","Wednesday","Thu"]
    let day=days[date.getDay()];
    return `${day} ${hours} : ${minutes}`;
}

//Defining a function that I want axios to call when I get the response back from the api
function displayTemperature(response){

    
    let temperatureElement=document.querySelector("#temperature");
    let CityElement=document.querySelector("#city");
    let DescriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let feelslikeElement=document.querySelector("#feelslike");
    let windElement=document.querySelector("#wind");
    let dateElement=document.querySelector("#date");

    
    temperatureElement.innerHTML=Math.round(response.data.main.temp);
    CityElement.innerHTML=response.data.name;
    DescriptionElement.innerHTML=response.data.weather[0].description;
    humidityElement.innerHTML=response.data.main.humidity;
    feelslikeElement.innerHTML=Math.round(response.data.main.feels_like);
    windElement.innerHTML=Math.round(response.data.wind.speed);
    dateElement.innerHTML=formatDate(response.data.dt*1000);


}
// Loading default city (London) on page load
searchCity("London");


function searchCity(city) {
    let apiKey = "ef536c135f931c48635e435d71067995";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl)
        .then(response => {
            displayTemperature(response);
        })
        .catch(error => {
            if (error.response.status === 404) {
                alert("City not found");
            } else {
                alert("An error occurred. Please try again later.");
            }
        });
}


function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector(".search-form-input");
    let city = searchInput.value.trim(); // Trim any leading/trailing spaces

    if (city !== "") {
        searchCity(city);
    } else {
        alert("Please enter a city");
    }
}




let searchFormElement =document.querySelector(".search-form"); 
searchFormElement.addEventListener("submit", handleSearchSubmit);

   