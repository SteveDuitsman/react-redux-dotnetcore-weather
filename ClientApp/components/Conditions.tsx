import * as React from "react";
import { IConditionsState } from "../models/Models";

type ConditionsProps = IConditionsState;

class Conditions extends React.Component<ConditionsProps, void> {
  public render() {
    return (
      <div className="conditions">
        <img src={this.props.icon_url} alt={this.props.icon} />
      </div>
    );
  }
}

export default Conditions;
