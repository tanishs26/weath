const temp = document.querySelector("#temp");
const locat = document.querySelector("#location");
const time = document.querySelector("#time");
const date = document.querySelector("#date");
const min = document.querySelector("#min");
const max = document.querySelector("#max");
const statu = document.querySelector("#status");
const btn = document.querySelector(".search-btn");
const inp = document.querySelector("#primary-searchbar");
const weather_card = document.querySelector(".weather-card");
const weather_img = document.querySelector("#weath-type-img");
const details_card = document.querySelector(".details-card");
const future_data = document.querySelector("#future-data");
const footer = document.querySelector("footer");

const key = "";
inp.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    btn.click();
  }
});
btn.addEventListener("click", () => {
  let city = inp.value;
  console.log(city);
  let key = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&units=metric&appid=0c70a0e673fe8c4736f464237623d86c`;
  let key2 = `http://api.weatherapi.com/v1/forecast.json?key=339dbc574c14425aa47141635252701&q=${encodeURIComponent(
    city
  )}&days=5&aqi=no`;
  console.log(key);
  async function getWeather() {
    const response = await fetch(key, { mode: "cors" });
    const response2 = await fetch(key2);
    const dataFetched = await response.json();
    const dataFetched2 = await response2.json();
    console.log(dataFetched);
    console.log(dataFetched2);
    if (dataFetched.cod == "404" || inp.value == "") {
      alert("City not found");
    } else {
      weather_card.style.display = "block";
      details_card.style.display = "flex";
      future_data.style.display = "block";
      document.body.appendChild(footer);
    }

    temp.innerHTML = `${dataFetched.main.temp}°c`;
    locat.innerHTML = `${dataFetched.name}`;
    min.innerHTML = `${dataFetched.main.temp_min} `;
    max.innerHTML = ` ${dataFetched.main.temp_max}`;
    statu.innerHTML = `• ${dataFetched.weather[0].main}`;
    const timeStamp = dataFetched.dt;
    const newDate = new Date((timeStamp + dataFetched.timezone) * 1000);
    console.log(newDate);
    const day = newDate.getUTCDate();
    const month = newDate.getUTCMonth() + 1;
    const year = newDate.getUTCFullYear();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[newDate.getUTCDay()];
    date.innerHTML = ` ${dayOfWeek} ${month}/${day}/${year}`;
    const minutes = newDate.getUTCMinutes();
    const hours = newDate.getUTCHours();
    time.innerHTML = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

    //Today's Details Section:
    const feel = document.querySelector("#feel");
    const humidity = document.querySelector("#humidity");
    const speed = document.querySelector("#speed");
    const pressure = document.querySelector("#air-pressure");

    feel.innerHTML = `${dataFetched.main.feels_like}°c`;
    humidity.innerHTML = `${dataFetched.main.humidity}%`;
    speed.innerHTML = `${dataFetched.wind.speed}Km/h`;
    pressure.innerHTML = `${dataFetched.main.pressure}hPa`;
    //Image Section
    if (hours >= 19 || hours < 6) {
      weather_card.style.backgroundImage = "url(Background/night.png)";
      if (dataFetched.weather[0].main == "Rain") {
        weather_img.src = "icons/RainNight.svg";
      }
      if (dataFetched.weather[0].main == "Clear") {
        weather_img.src = "icons/clearNight.svg";
      }
      if (
        dataFetched.weather[0].main == "Clouds" ||
        dataFetched.weather[0].main == "Haze"
      ) {
        weather_img.src = "icons/cloudsNight.svg";
      }
      if (dataFetched.weather[0].main == "Snow") {
        weather_img.src = "icons/snow.svg";
      }
      if (dataFetched.weather[0].main == "Thunderstorm") {
        weather_img.src = "icons/stormNight.svg";
      }
    } else {
      weather_card.style.backgroundImage = "url(Background/clouds.png)";
      if (dataFetched.weather[0].main == "Rain") {
        weather_img.src = "icons/Rain.svg";
      }
      if (dataFetched.weather[0].main == "Clear") {
        weather_img.src = "icons/clear.svg";
      }
      if (
        dataFetched.weather[0].main == "Clouds" ||
        dataFetched.weather[0].main == "Haze"
      ) {
        weather_img.src = "icons/clouds.svg";
      }
      if (dataFetched.weather[0].main == "Snow") {
        weather_img.src = "icons/snow.svg";
      }
      if (dataFetched.weather[0].main == "Thunderstorm") {
        weather_img.src = "icons/storm.svg";
      }
    }
    const forecastData = dataFetched2.forecast.forecastday.map((day) => ({
      day: new Date(day.date).toLocaleDateString("en-US", { weekday: "long" }), // Convert date to weekday
      icon: `https:${day.day.condition.icon}`,
      description: day.day.condition.text,
      min: `${day.day.mintemp_c}°C`,
      max: `${day.day.maxtemp_c}°C`,
    }));
    const futureContainers = document.querySelectorAll(".fut-container");

    futureContainers.forEach((container, index) => {
      if (forecastData[index]) {
        const { day, icon, description, min, max } = forecastData[index];

        // Update container elements
        container.querySelector(".day").innerHTML = day; // Update day name
        container.querySelector("img").src = icon; // Update icon
        container.querySelector("img").alt = description; // Update alt text
        container.querySelector(".fut-description").textContent = description; // Update description
        container.querySelector(".fut-min-max").textContent = `${max} / ${min}`; // Update temperatures
      }
    });
  }

  getWeather();
});
