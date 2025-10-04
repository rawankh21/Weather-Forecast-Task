"use strict";
async function getWeather(city) {
  try {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=60621b807d6448fa97d163933252909&q=${city}&days=3`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    const data = await response.json();
    console.log("API Data:", data);
    display(data);
  } catch (error) {
    console.error("Fetch error:", error);
    alert("Could not fetch weather data. Try again!");
  }
}
document.querySelector(".search-box button").addEventListener("click", function() {
  var city = document.querySelector(".search-box input").value; 
  getWeather(city); 
});

document.querySelector(".search-box input").addEventListener("input", function() {
  var city = this.value.trim();
  if (city.length > 0) { 
    getWeather(city);
  }
});


function display(data) {
  
  const forecast = data.forecast.forecastday;

  // ----- Day 1 -----
  const day1 = forecast[0];
  document.getElementById("day1").innerHTML = `
    <div class="card-header">
      <span>${new Date(day1.date).toLocaleDateString('en-US', { weekday: 'long' })}</span>
      <span>${day1.date}</span>
    </div>
    <div class="card-body">
      <h5>${data.location.name}</h5>
      <h2>${day1.day.avgtemp_c}°C <img src="https:${day1.day.condition.icon}" alt=""></h2>
      <p class="condition">${day1.day.condition.text}</p>
      <div class="details">
        <span><i class="fa-solid fa-umbrella"></i> ${day1.day.avghumidity}%</span>
        <span><i class="fa-solid fa-wind"></i> ${day1.day.maxwind_kph} km/h</span>
        <span><i class="fa-solid fa-compass"></i> ${data.current.wind_dir}</span>
      </div>
    </div>
  `;
// ----- Day 2 -----
const day2 = forecast[1];
document.getElementById("day2").innerHTML = `
  <div class="card-header">
    <span >${new Date(day2.date).toLocaleDateString('en-US', { weekday: 'long' })}</span>
    
  </div>
  <div class="card-body">
    <img src="https:${day2.day.condition.icon}" alt="">
    <h5 class="temp">${day2.day.avgtemp_c}°C</h5>
    <p class="condition">${day2.day.condition.text}</p>
    <div class="details">
      <span> ${day2.day.avghumidity}%</span>
    </div>
  </div>
`;

// ----- Day 3 -----
const day3 = forecast[2];
document.getElementById("day3").innerHTML = `
  <div class="card-header">
    <span>${new Date(day3.date).toLocaleDateString('en-US', { weekday: 'long' })}</span>

  </div>
  <div class="card-body">
    <img src="https:${day3.day.condition.icon}" alt="">
    <h5 class="temp">${day3.day.avgtemp_c}°C</h5>
    <p class="condition">${day3.day.condition.text}</p>
    <div class="details">
      <span > ${day3.day.avghumidity}%</span>
    </div>
  </div>
`;
}