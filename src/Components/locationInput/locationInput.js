import React, { Component } from 'react';
import './locationInput.css';

class Weather extends Component {
    render(){
        return(
            <div>
            <form onSubmit={this.props.loadweather}>
              <div>{this.props.error ? 'Invalid City' : ""}</div>
              <div>
                <div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    name="city"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <button className='btn'>Get Weather</button>
                </div>
              </div>
            </form>
          </div>
        )
    }
}

export default Weather;