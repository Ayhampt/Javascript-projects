document.addEventListener("DOMContentLoaded", () => {
  require("dotenv").config();
  const City = document.getElementById("city");
  const getweatherbtn = document.getElementById("get-Weather-btn");
  const Weathercondition = document.getElementById("Weather-data");
  const cityname = document.getElementById("city-name");
  const Temperature = document.getElementById("Temperature");
  const windspeed = document.getElementById("wind-speed");
  const humidity = document.getElementById("humidity");
  const description = document.getElementById("description");
  const errormessage = document.getElementById("error-message");
  const errormessagecityNotFound = document.getElementById(
    "error-message-cityNotFound"
  );
  const feelslike = document.getElementById("FeelsLike");

  const API_KEY = ""; //environment variable
  hideErrorMessages();

  getweatherbtn.addEventListener("click", async () => {
    const cityvalue = City.value.trim();
    if (!cityvalue) return;

    //it may throw an error
    //server/database is always in another continent

    try {
      const weatherlist = await fetchWeatherData(cityvalue);
      DisplayWeatherData(weatherlist);
    } catch (error) {
      if (error.message === "City not found") {
        showCityError();
      } else {
        showError();
      }
    }
  });

  async function fetchWeatherData(cityvalue) {
    //gets the data
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    console.log(typeof response);
    console.log("RESPONSE", response);
    //hide the error messages

    //if the response is not okay

    if (!response.ok) {
      console.error("Error fetching data");

      showCityError();
      throw new Error("City not found");
    }

    const data = await response.json();

    return data;
  }

  function DisplayWeatherData(data) {
    //display the data
    console.log(data);
    const { name, main, weather, wind } = data;
    cityname.textContent = name;
    Temperature.textContent = main.temp;
    description.textContent = weather[0].description;
    windspeed.textContent = wind.speed;
    humidity.textContent = main.humidity;
    feelslike.textContent = main.feels_like;
    //unlock the hidden for city
    Weathercondition.classList.remove("hidden");
    errormessage.classList.add("hidden");
    errormessagecityNotFound.classList.add("hidden");
  }
  function showError() {
    Weathercondition.classList.add("hidden");
    errormessage.classList.remove("hidden");
    errormessagecityNotFound.classList.add("hidden");
  }
  function showCityError() {
    errormessagecityNotFound.classList.remove("hidden");
    Weathercondition.classList.add("hidden");
    errormessage.classList.add("hidden");
  }
  function hideErrorMessages() {
    errormessage.classList.add("hidden");
    errormessagecityNotFound.classList.add("hidden");
    Weathercondition.classList.add("hidden");
  }
});
