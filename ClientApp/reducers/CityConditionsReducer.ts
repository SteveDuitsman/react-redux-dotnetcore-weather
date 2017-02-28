import { Reducer } from "redux";
import { CityConditionActions, PossibleCityConditionActions } from "../actions/CityConditionActions";
import { ICity, ICityConditions, ICityListState, IConditionsState, IForecastSummaryState } from "../models/Models";
import initialState from "../reducers/InitialState";

const CityConditionsReducer: Reducer<ICityListState> = 
  (state = initialState.cityList, action: PossibleCityConditionActions) => {
    switch (action.type) {
        case CityConditionActions.REQUEST_CITY_CONDITIONS:
          return {
            cityList: state.cityList,
            forecasts: state.forecasts,
            isLoading: true,
          };
        case CityConditionActions.RECEIVE_CITY_CONDITIONS:
          let oldForecasts = state.forecasts;
          let unchangedCityList = state.cityList.filter((city) => {
            return city.City === action.city.City &&
                   city.State === action.city.State &&
                   city.Zip === action.city.Zip;
          });
          let unchangedCityConditions = oldForecasts.filter((city) => {
            return !(city.current_observation.display_location.city === action.city.City &&
                     city.current_observation.display_location.state === action.city.State &&
                     city.current_observation.display_location.zip === action.city.Zip);
          });
          return {
            cityList: [...unchangedCityList, action.city],
            forecasts: [...unchangedCityConditions, action.forecast],
            isLoading: false,
          };
        case CityConditionActions.REQUEST_CITY_CONDITIONS_LIST:
          return state;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
            break;
    }
    return state;
};

export default CityConditionsReducer;
