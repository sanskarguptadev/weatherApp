import React, { Component } from 'react';
import './displayWeather.css';

class Weather extends Component {
    render(){
        console.log(this.props);
        return(
            <div>
                <h1>{this.props.cityname}</h1>
                <div className=''>
                    <i className={`wi ${this.props.weatherIcon} `} />
                </div>
                <h1>{this.props.temp_celsius}&deg;<sup>c</sup> </h1>
                <h3>
                    <span>Min {this.props.temp_min}&deg;<sup>c</sup></span>
                    <span> Max {this.props.temp_max}&deg;<sup>c</sup></span>
                </h3>
                <h4>
                    {this.props.description}
                </h4>
            </div>
        )
    }
}


export default Weather;