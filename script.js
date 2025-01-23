const temp = document.querySelector("#temp");
const locat = document.querySelector("#location");
const time = document.querySelector("#time");
const date = document.querySelector("#date");
const min = document.querySelector("#min");
const max = document.querySelector("#max");
const statu = document.querySelector("#status");
const btn = document.querySelector(".search-btn");
const inp = document.querySelector("#primary-searchbar");
const key = "";
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
    temp.innerHTML = `${dataFetched.main.temp}°c`;
    locat.innerHTML = `${dataFetched.name}`;
    min.innerHTML = `${dataFetched.main.temp_min} `;
    max.innerHTML = ` ${dataFetched.main.temp_max}`;
    statu.innerHTML = `• ${dataFetched.weather[0].main}`;
    const timeStamp = dataFetched.dt;
    const newDate = new Date(timeStamp * 1000);
    console.log(newDate);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayOfWeek = daysOfWeek[newDate.getDay()];
    date.innerHTML = ` ${dayOfWeek} ${month}/${day}/${year}`;
    const minutes = newDate.getMinutes();
    const hours = newDate.getHours();
    time.innerHTML = `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;

    //Today's Details Section:
    const feel = document.querySelector("#feel");
    const humidity = document.querySelector("#humidity");
    const speed = document.querySelector("#speed");
    const pressure = document.querySelector("#air-pressure");

    feel.innerHTML=`${dataFetched.main.feels_like}°c`;
    humidity.innerHTML=`${dataFetched.main.humidity}%`;
    speed.innerHTML=`${dataFetched.wind.speed}Km/h`;
    pressure.innerHTML=`${dataFetched.main.pressure}hPa`
  }
  getWeather();
});
