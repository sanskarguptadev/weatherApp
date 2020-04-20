import React, { Component } from 'react';
import Input from './Components/locationInput/locationInput';
import Display from './Components/displayWeather/displayWeather';
import Axios from 'axios';
import 'weather-icons/css/weather-icons.css';
import './App.css';

const API_Key = 'fdbc31d16bc0e51a096ffa58cf0ec5e2';

class App extends Component {
  constructor(){
    super();
    this.state = {
      city: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: null,
      temp_min: null,
      description: "",
      type: null,
      error: false
    };
  }
 
  get_WeatherIcon(rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: "wi-thunderstorm", type: 'Thunder'});
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: "wi-sleet", type: 'Rain'});
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: "wi-storm-showers",type: 'Rain'});
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: "wi-snow", type: 'Snow'});
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: "wi-fog", type: 'Fog'});
        break;
      case rangeId === 800:
        this.setState({ icon: "wi-day-sunny", type: 'Sunny'});
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: "wi-day-fog",type: 'Cloud'});
        break;
      default:
        this.setState({ icon: "wi-day-fog", type: 'Cloud' });
    }
  }

  calCelsius(temp) {
    let cell = Math.floor(temp - 273.15);
    return cell;
  }
  getWeather = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    if(!city){
      this.setState({
        error: true,
      });
      return;
    }
    Axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`).then(
      (response) => {
        this.setState({
          city: response.data.name,
          main: response.data.weather[0].main,
          celsius: this.calCelsius(response.data.main.temp),
          temp_max: this.calCelsius(response.data.main.temp_max),
          temp_min: this.calCelsius(response.data.main.temp_min),
          description: response.data.weather[0].description,
          image: this.state.image,
          error: false
        })
        this.get_WeatherIcon(response.data.weather[0].id);
      }
    ).catch(
      error => {
        this.setState({
          error: true,
        })
      }
    );
  }

  render(){
    
    return (
      <div className={`App ${this.state.type}`}>
        <h1>Weather App</h1>
        <Input loadweather={this.getWeather} error={this.state.error}/>
        {
          this.state.city === undefined ? 
          null :
          <div>
            <Display  
            cityname={this.state.city}
            weatherIcon={this.state.icon}
            temp_celsius={this.state.celsius}
            temp_max={this.state.temp_max}
            temp_min={this.state.temp_min}
            description={this.state.description}
            />
          </div>
        }
        
      </div>
    );
  }
}

export default App;
