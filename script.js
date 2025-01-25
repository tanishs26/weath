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
  console.log(key);
  async function getWeather() {
    const response = await fetch(key, { mode: "cors" });
    const dataFetched = await response.json();
    console.log(dataFetched);
    if (dataFetched.cod == "404") {
      alert("City not found");
    } else {
      weather_card.style.display = "block";
      details_card.style.display = "flex";
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
  }

  getWeather();
});
