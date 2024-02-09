import React, { Component } from "react";
import "../App.css";

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      weather: {},
      inputCity: "chandrapura"
    };
  }

  async componentDidMount() {
    let url =
      `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputCity}&appid=9e1e42daf726d50e41f92b8b384399e8`;
    let data = await fetch(url);

    let parsedData = await data.json();
    console.log(parsedData);

    this.setState({
      weather: parsedData,
    });
  }

  handleSearchBtn = ()=>{
    console.log("btn clicked");
    console.log(this.state.inputCity);
    this.componentDidMount();
  }
  handleSearchBar = (event)=>{
    this.setState({inputCity: event.target.value})
    console.log(this.state.inputCity)
  }

  render() {
    const { name, wind, clouds, visibility, main } = this.state.weather;
    return (
      // <div>
      //   <h1>City: {name}</h1>
      //   <p>Wind Speed: {wind && wind.speed}</p>
      //   <p>Clouds: { clouds&&clouds.all}</p>
      // </div>
      <>
        <div className="container">
          <div className="search-items flex">
            <input type="text" placeholder="City" value={this.inputCity} onChange={this.handleSearchBar}/>
            <i class="bi bi-search icon" onClick={this.handleSearchBtn}> </i>
          </div>
          <div className="image">
            <img
              src="https://cdn2.iconfinder.com/data/icons/weather-flat-14/64/weather02-512.png"
              alt="weather-img"
            />
          </div>
          <div className="results">
            <div className="top">
              <div className="temp">{main && Math.round(main.temp-273)}° C</div>
              <div className="city">{name}</div>
            </div>
            <div className="bottom flex gap">
              <div className="humidity flex align-center">
                <i class="bi bi-water big-icon"></i>
                {main && main.humidity}% <br />
                Humidity
              </div>
              <div className="winds flex align-center">
                <i class="bi bi-wind big-icon"></i>
                {wind && Math.round(wind.speed)} Km/h <br />
                Winds
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
