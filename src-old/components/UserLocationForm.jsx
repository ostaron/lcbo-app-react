import React from 'react';

import ontarioCities from '../data/ontariocities';

export default class UserLocationForm extends React.Component {
    constructor(props) {
        super(props);

        this.updateuserAddress = this
            .updateuserAddress
            .bind(this);
        this.updateuserCity = this
            .updateuserCity
            .bind(this);
        this.handleLocationFormSubmit = this
            .handleLocationFormSubmit
            .bind(this);
        this.state = {
            userAddress: '',
            userCity: 'Toronto'
        }
    }

    renderCities(cities) {
        return cities.map((city, index) => {
            return (
                <option key={index} value={city}>{city}</option>
            )
        })
    }

    updateuserAddress(event) {
        this.setState({userAddress: event.target.value})
    }

    updateuserCity(event) {
        this.setState({userCity: event.target.value})
    }

    handleLocationFormSubmit(event) {
        event.preventDefault();
        this
            .props
            .updateuserLocation(this.state.userAddress, this.state.userCity);
        this.setState({userAddress: '', userCity: ''})
    }

    render() {
        return (
            <section className="section">
            <h3 className="subtitle">What is your location?</h3>
                <form onSubmit={this.handleLocationFormSubmit}>
                    <div className="field">
                        <label className="label">Street Address</label>
                        <div className="control is-expanded">
                            <input
                                id="userAddress"
                                className="input"
                                type="text"
                                placeholder="Enter your address"
                                value={this.state.userAddress}
                                onChange={this.updateuserAddress}/>
                        </div>
                        <div className="control">
                        <label className="label">City</label>
                            <div className="select">
                                <select
                                    id="userCity"
                                    value={this.state.userCity}
                                    onChange={this.updateuserCity}>
                                    {this.renderCities(ontarioCities)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-primary" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
            </section>
        )
    }
}