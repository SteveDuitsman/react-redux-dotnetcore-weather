import CircularProgress from "material-ui/CircularProgress";
import Paper from "material-ui/Paper";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router";

import * as CityConditionActions from "../actions/CityConditionActions";
import { IApplicationState }  from "../models/Models";
import { ICityListState } from "../models/Models";

import CityConditionsRow from "./CityConditionsRow";

// At runtime, Redux will merge together...
type CityListProps = ICityListState                                  // ... state we"ve requested from the Redux store
                     & typeof CityConditionActions.actionCreators   // ... plus action creators we"ve requested
                     & { };                                         // ... plus incoming routing parameters

class CityList extends React.Component<CityListProps, void> {

  public componentWillMount() {
      // This method runs when the component is first added to the page
      this.props.requestCityConditionsList(this.props.cityList);
  }

  public componentWillReceiveProps(nextProps: CityListProps) {
      // This method runs when incoming props (e.g., route params) change
      // this.props.requestCityConditionsList(nextProps.cityList);
  }

  public render() {
    return (
      <div>
        <h1>Weather Conditions</h1>
        <Paper zDepth={3}>
          {
            !!this.props.forecasts &&
            !!this.props.isLoading === false &&
            this.props.forecasts.map((conditions) =>
              <CityConditionsRow
                key={
                  `${conditions.current_observation.display_location.latitude}
                  ${conditions.current_observation.display_location.longitude}`
                }
                current_observation={conditions.current_observation}
                response={conditions.response} />,
            )
          }
        </Paper>          
        {
          !!this.props.isLoading &&
          <div>
            <CircularProgress />
          </div>
        }
      </div>
    );
  }
}

export default connect(
    // Selects which state properties are merged into the component"s props
    (state: IApplicationState) => {
      return state.cityList;
    },
    // Selects which action creators are merged into the component"s props
    CityConditionActions.actionCreators,
)(CityList);
