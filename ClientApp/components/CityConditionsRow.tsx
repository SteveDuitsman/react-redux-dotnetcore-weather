import {Card, CardActions, CardHeader, CardMedia, CardText, CardTitle} from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import * as React from "react";
import { ICityConditions } from "../models/Models";

type CityConditionsRowProps = ICityConditions;

class CityConditionsRow extends React.Component<CityConditionsRowProps, void> {
  public render() {
    return (
      <div>
        <Card>
          <CardHeader
            title={
                    this.props.current_observation.display_location.city +
                    ", " +
                    this.props.current_observation.display_location.state
                  }
            avatar={this.props.current_observation.icon_url}
            subtitle={this.props.current_observation.weather}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <p>Temperature {this.props.current_observation.temperature_string}</p>
            <p>Feels like {this.props.current_observation.feelslike_string}</p>
            <p>Winds {this.props.current_observation.wind_string}</p>
            <p>Humidity {this.props.current_observation.relative_humidity}</p>
            <p>Today"s Precipitation {this.props.current_observation.precip_today_string}</p>
            <small className="pull-right"><i>{this.props.current_observation.observation_time}</i></small>
          </CardText>
          <CardActions>
            <FlatButton label="Detailed Forecast" />
            <FlatButton label="Radar" />
          </CardActions>
        </Card>
      </div>
    );
  }
}

export default CityConditionsRow;
