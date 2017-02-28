import * as React from "react";
import { IForecastSummaryState } from "../models/Models";

type ForecastSummaryProps = IForecastSummaryState;

class ForecastSummary extends React.Component<ForecastSummaryProps, void> {
  public render() {
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

export default ForecastSummary;
