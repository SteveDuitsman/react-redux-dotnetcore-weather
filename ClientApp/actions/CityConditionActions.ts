import { City, CityConditions } from '../models/Models';
import { fetch, addTask } from 'domain-task';
import { AppThunkAction } from '../models/Models';

export class CityConditionActions {
  public static readonly REQUEST_CITY_CONDITIONS_LIST = 'REQUEST_CITY_CONDITIONS_LIST';
  public static readonly REQUEST_CITY_CONDITIONS = 'REQUEST_CITY_CONDITIONS';
  public static readonly RECEIVE_CITY_CONDITIONS = 'RECEIVE_CITY_CONDITIONS';
}

type REQUEST_CITY_CONDITIONS_LIST = 'REQUEST_CITY_CONDITIONS_LIST';
type REQUEST_CITY_CONDITIONS = 'REQUEST_CITY_CONDITIONS'
type RECEIVE_CITY_CONDITIONS = 'RECEIVE_CITY_CONDITIONS';

export interface RequestCityListAction {
    type: REQUEST_CITY_CONDITIONS_LIST,
    cityList: City[]
}

export interface RequestCityConditionsAction {
    type: REQUEST_CITY_CONDITIONS,
    city: City
}

export interface ReceiveCityConditionAction {
    type: RECEIVE_CITY_CONDITIONS,
    city: City,
    forecast: CityConditions
}

export type PossibleCityConditionActions = RequestCityListAction | RequestCityConditionsAction | ReceiveCityConditionAction;

let createCityConditionsRequest = (city:City, dispatch) => {
  let cityName = city.City.replace(' ','_');
  let url = `http://api.wunderground.com/api/988d4d4a2535c885/conditions/q/${city.State}/${cityName}.json`;
  let fetchTask = fetch(url)
                    .then(response => response.json() as Promise<CityConditions>)
                    .then(data => {
                        dispatch({ type: CityConditionActions.RECEIVE_CITY_CONDITIONS, forecast: data, city: city });
                    });
  return fetchTask;
};

export const actionCreators = {
  //
  //  Single City Request
  //
  requestCityConditions: (city: City): AppThunkAction<PossibleCityConditionActions> => (dispatch, getState) => {
    let task = createCityConditionsRequest(city, dispatch);
    addTask(task); // Ensure server-side prerendering waits for this to complete
    dispatch({ type: CityConditionActions.REQUEST_CITY_CONDITIONS, city: city });
  },

  requestCityConditionsList: (cityList: City[]): AppThunkAction<PossibleCityConditionActions> => (dispatch, getState) => {
    for(let city of cityList) {
      let task = createCityConditionsRequest(city, dispatch);
      addTask(task);
      dispatch({ type: CityConditionActions.REQUEST_CITY_CONDITIONS, city: city });
    }
  }
};