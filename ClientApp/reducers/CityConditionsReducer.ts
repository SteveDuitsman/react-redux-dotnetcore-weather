import { Reducer } from 'redux';
import { City, CityConditions, CityListState, ConditionsState, ForecastSummaryState } from '../models/Models';
import { CityConditionActions, PossibleCityConditionActions } from '../actions/CityConditionActions';
import initialState from '../reducers/InitialState';

// -----------------
// REDUCER

const reducer: Reducer<CityListState> = (state = initialState.cityList, action: PossibleCityConditionActions) => {
    switch (action.type) {
        case CityConditionActions.REQUEST_CITY_CONDITIONS:
          return {
            cityList: state.cityList,
            forecasts: state.forecasts,
            isLoading: true
          };
        case CityConditionActions.RECEIVE_CITY_CONDITIONS:
          let oldForecasts = state.forecasts;
          let unchangedCityList = state.cityList.filter(city => { 
            return city.City === action.city.City && 
                   city.State === action.city.State && 
                   city.Zip === action.city.Zip;
          });
          let unchangedCityConditions = oldForecasts.filter(city => { 
            return !(city.current_observation.display_location.city === action.city.City && 
                     city.current_observation.display_location.state === action.city.State && 
                     city.current_observation.display_location.zip === action.city.Zip);
          });
          return {
            cityList: [...unchangedCityList, action.city],
            forecasts: [...unchangedCityConditions, action.forecast],
            isLoading: false
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

export default reducer;