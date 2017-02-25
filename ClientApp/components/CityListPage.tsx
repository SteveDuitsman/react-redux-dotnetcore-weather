import * as React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';

import { ApplicationState }  from '../models/Models';
import * as CityConditionActions from '../actions/CityConditionActions';
import { CityConditions, CityListState, ConditionsState, ForecastSummaryState } from '../models/Models';

type ConditionsProps = ConditionsState;

class Conditions extends React.Component<ConditionsProps, void> {
  render() {
    return (
      <div className="conditions">
        <img src={this.props.icon_url} alt={this.props.icon} />
      </div>
    );
  }
}

type ForecastSummaryProps = ForecastSummaryState;

class ForecastSummary extends React.Component<ForecastSummaryProps, void> {
  render() {
    return (
      <div className="forecast-summary">
        <div className="city">
          <strong>{this.props.city}, {this.props.state}</strong>
        </div>
        <div className="temps">
          <strong>{this.props.current_temp}</strong>
          {false && <p>{this.props.highTemp}&nbsp;|&nbsp;{this.props.lowTemp}</p>}
          {false && <p><i className="fa fa-tint fa-lg"></i>{this.props.precipitationChance}%</p>}
        </div>
      </div>
    );
  }
}

type CityRowProps = CityConditions;

class CityRow extends React.Component<CityRowProps, void> {
  render() {
    return (
      <div>
        <Card>
          <CardHeader
            title={this.props.current_observation.display_location.city + ', ' + this.props.current_observation.display_location.state}
            avatar={this.props.current_observation.icon_url}
            subtitle={this.props.current_observation.temp_f+ 'F and ' + this.props.current_observation.icon }
            actAsExpander={false}
            showExpandableButton={false}
          />
          <CardActions>
            <FlatButton label="Detailed Forecast" />
            <FlatButton label="Radar" />
          </CardActions>
        </Card>
      </div>
    );
  }
}

// At runtime, Redux will merge together...
type CityListProps = CityListState                           // ... state we've requested from the Redux store
                     & typeof CityConditionActions.actionCreators   // ... plus action creators we've requested
                    & { };                                   // ... plus incoming routing parameters

class CityList extends React.Component<CityListProps, void> {

  componentWillMount() {
      // This method runs when the component is first added to the page
      this.props.requestCityConditionsList(this.props.cityList);
  }

  componentWillReceiveProps(nextProps: CityListProps) {
      // This method runs when incoming props (e.g., route params) change
      //this.props.requestCityConditionsList(nextProps.cityList);
  }

  render() {
    return (
      <div>
        <h1>Weather Conditions</h1>
        <Paper zDepth={3}>
          { 
            !!this.props.forecasts && 
            !!this.props.isLoading === false &&
            this.props.forecasts.map(conditions =>
              <CityRow key={`${conditions.current_observation.display_location.latitude}${conditions.current_observation.display_location.longitude}`} 
                      current_observation={conditions.current_observation} 
                      response={conditions.response} />
            )
          }
        </Paper>          
        {!!this.props.isLoading && <CircularProgress />}
      </div>
    );
  }
}

export default connect(
    (state: ApplicationState) => {
      return state.cityList;
    }, // Selects which state properties are merged into the component's props
    CityConditionActions.actionCreators                 // Selects which action creators are merged into the component's props
)(CityList);