let weather = {
  apiKey: "13ba2384f86d6ce49fac450d4b954e46",
  fetchWeather: function (city) {
    fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&lang=pt_br&units=metric&appid=" +
        this.apiKey
    )
      .then((response) => response.json())
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {
    const { name } = data;
    const { icon, description } = data.weather[0];
    const { temp, humidity } = data.main;
    const { speed } = data.wind;
    // console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = name;
    document.querySelector(".icon").src =
      "https://openweathermap.org/img/wn/" + icon + ".png";
    document.querySelector(".temp").innerText = temp + "ºC";
    document.querySelector(".description").innerText = description;
    document.querySelector(".humidity").innerText =
      "umidade: " + humidity + "%";
    document.querySelector(".wind").innerText =
      "Velocidade do vento: " + speed + "km/h";
    document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?Landscape," + name + "')";
    document.querySelector(".weather").classList.remove("loading");
  },
  search: function () {
    this.fetchWeather(document.querySelector(".search-bar").value);
  },
};

document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

document
  .querySelector(".search-bar")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") weather.search();
  });

weather.fetchWeather("Brazil");
