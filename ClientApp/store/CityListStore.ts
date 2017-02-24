import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from './';

import initialForecasts from '../../sample json/city forecast data.json';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CityListState {
  cityList: City[],
  forecasts: CityConditions[],
  isLoading: boolean
};

export interface ConditionsState {
  icon_url: string,
  icon: string
}

export interface ForecastSummaryState {
  city: string,
  state: string,
  zip: number,
  current_temp: string,
  highTemp: string,
  lowTemp: string,
  precipitationChance: string,
}

export interface Location {
  full: string,
  city: string,
  state: string,
  state_name: string,
  country: string,
  country_iso3166: string,
  zip: number,
  magic: number,
  wmo: string,
  latitude: number,
  longitude: number,
  elevation: number
}

export interface City {
  City: string,
  State: string,
  Zip: number
}

export interface CityConditions {
  response: {
    version: number,
    termsofService: string
    features: {
      conditions: number
    }
  },
  current_observation: {
    image: {
      url: string,
      title: string,
      link: string,
    },
    display_location: Location,
    observation_location: Location,
    estimated: string,
    station_id: string,
    observation_time: string,
    observation_time_rfc822: string,
    observation_epoch: number,
    local_time_rfc822:  string,
    local_epoch: number,
    local_tz_short: string,
    local_tz_long: string,
    local_tz_offset: string,
    weather: string,
    temperature_string: string,
    temp_f: string,
    temp_c: string,
    relative_humidity: string,
    wind_string: string,
    wind_dir: string,
    wind_degrees: string,
    wind_mph: string,
    wind_gust_mph: string,
    wind_kph:  string,
    wind_gust_kph: string,
    pressure_mb: string,
    pressure_in: string,
    pressure_trend: string,
    dewpoint_string: string,
    dewpoint_f: string,
    dewpoint_c: string,
    heat_index_string: string,
    heat_index_f: string,
    heat_index_c: string,
    windchill_string: string,
    windchill_f: string,
    windchill_c: string,
    feelslike_string: string,
    feelslike_f: string,
    feelslike_c: string,
    visibility_mi: string,
    visibility_km: string,
    solarradiation: string,
    UV: string,
    precip_1hr_string: string,
    precip_1hr_in: string,
    precip_1hr_metric: string,
    precip_today_string: string,
    precip_today_in: string,
    precip_today_metric: string,
    icon: string,
    icon_url: string,
    forecast_url: string,
    history_url: string,
    ob_url: string,
    nowcast: string,
  }
}

// -----------------
// ACTIONS

interface RequestCityListAction {
    type: 'REQUEST_CITY_CONDITIONS_LIST',
    cityList: City[]
}

interface RequestCityConditionsAction {
    type: 'REQUEST_CITY_CONDITIONS',
    city: City
}

interface ReceiveCityConditionAction {
    type: 'RECEIVE_CITY_CONDITIONS',
    city: City,
    forecast: CityConditions
}

// interface ReceiveCityConditionListAction {
//     type: 'RECEIVE_CITY_CONDITIONS_LIST',
//     cityList: City[],
//     forecast: CityConditions
// }

type KnownAction = RequestCityListAction | RequestCityConditionsAction | ReceiveCityConditionAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

let createCityConditionsRequest = (city:City, dispatch) => {
  let cityName = city.City.replace(' ','_');
  let url = `http://api.wunderground.com/api/988d4d4a2535c885/conditions/q/${city.State}/${cityName}.json`;
  let fetchTask = fetch(url)
                    .then(response => response.json() as Promise<CityConditions>)
                    .then(data => {
                        dispatch({ type: 'RECEIVE_CITY_CONDITIONS', forecast: data, city: city });
                    });
  return fetchTask;
};

export const actionCreators = {
  //
  //  Single City Request
  //
  requestCityConditions: (city: City): AppThunkAction<KnownAction> => (dispatch, getState) => {
    let task = createCityConditionsRequest(city, dispatch);
    addTask(task); // Ensure server-side prerendering waits for this to complete
    dispatch({ type: 'REQUEST_CITY_CONDITIONS', city: city });
  },

  requestCityConditionsList: (cityList: City[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
    for(let city of cityList) {
      let task = createCityConditionsRequest(city, dispatch);
      addTask(task);
      dispatch({ type: 'REQUEST_CITY_CONDITIONS', city: city });
    }
  }
};

// -----------------
// REDUCER

const unloadedState: CityListState = {
  isLoading: false,
  cityList: [ 
    {City: "New Berlin", State: "WI", Zip: 53151},
    {City: "Wauwatosa", State: "WI", Zip: 53226},
    {City: "San Antonio", State: "TX", Zip: 78201},     
  ],
  forecasts: initialForecasts
};

export const reducer: Reducer<CityListState> = (state: CityListState, action: KnownAction) => {
    switch (action.type) {
        case 'REQUEST_CITY_CONDITIONS':
          return {
            cityList: state.cityList,
            forecasts: state.forecasts,
            isLoading: true
          };
        case 'RECEIVE_CITY_CONDITIONS':
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
        case 'REQUEST_CITY_CONDITIONS_LIST':
          return state;
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
            break;
    }

    return state || unloadedState;
};