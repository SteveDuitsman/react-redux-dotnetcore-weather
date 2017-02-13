import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as CityListStore from '../store/CityListStore';

type ConditionsProps = CityListStore.ConditionsState;

class Conditions extends React.Component<ConditionsProps, void> {
  render() {
    return (
      <div className="conditions">
        <img src="{this.props.imageSource}" alt="{this.props.altText}" />
      </div>
    );
  }
}

type ForecastSummaryProps = CityListStore.ForecastSummaryState;

class ForecastSummary extends React.Component<ForecastSummaryProps, void> {
  render() {
    return (
      <div className="forecast-summary">
        <div className="city">
          <strong>{this.props.city}, {this.props.state}</strong>
        </div>
        <div className="temps">
          <strong>{this.props.current_temp}</strong>
          <p>{this.props.highTemp}&nbsp;|&nbsp;{this.props.lowTemp}</p>
          <p><i className="fa fa-tint fa-lg"></i>{this.props.precipitationChance}%</p>
        </div>
      </div>
    );
  }
}

type CityRowProps = CityListStore.CityConditions;

class CityRow extends React.Component<CityRowProps, void> {
  render() {
    return (
      <div>
        <Conditions icon_url={this.props.current_observation.icon_url} 
                    icon={this.props.current_observation.icon} />
        <ForecastSummary city={this.props.current_observation.display_location.city} 
                         state={this.props.current_observation.display_location.state}
                         zip={this.props.current_observation.display_location.zip}
                         current_temp={this.props.current_observation.temp_f}
                         highTemp={this.props.current_observation.temp_f}
                         lowTemp={this.props.current_observation.temp_f}
                         precipitationChance="0" />
      </div>
    );
  }
}

interface CityListProps {
  cityConditions: Object,
}

class CityList extends React.Component<CityListProps, void> {
  render() {
    return (
      <div>

      </div>
    );
  }
}