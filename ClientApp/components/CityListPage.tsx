import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

interface ConditionsProps {
  imageSource: string,
  altText: string
}

class Conditions extends React.Component<ConditionsProps, void> {
  render() {
    return (
      <div className="conditions">
        <img src="{this.props.imageSource}" alt="{this.props.altText}" />
      </div>
    );
  }
}

interface ForecastSummaryProps {
  city: string,
  state: string,
  zip: number,
  highTemp: number,
  lowTemp: number,
  precipitationChance: number,
}

class ForecastSummary extends React.Component<ForecastSummaryProps, void> {
  render() {
    return (
      <div className="forecast-summary">
        <div className="city">
          <strong>{this.props.city}, {this.props.state}</strong>
        </div>
        <div className="temps">
          <p>{this.props.highTemp}&nbsp;|&nbsp;{this.props.lowTemp}</p>
          <p><i class="fa fa-tint fa-lg"></i>{this.props.precipitationChance}%</p>
        </div>
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
    );
  }
}