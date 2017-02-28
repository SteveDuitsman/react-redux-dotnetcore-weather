import { addTask, fetch } from "domain-task";
import { IAppThunkAction } from "../models/Models";
import { ICity, ICityConditions } from "../models/Models";

export class CityConditionActions {
  public static readonly REQUEST_CITY_CONDITIONS_LIST = "REQUEST_CITY_CONDITIONS_LIST";
  public static readonly REQUEST_CITY_CONDITIONS = "REQUEST_CITY_CONDITIONS";
  public static readonly RECEIVE_CITY_CONDITIONS = "RECEIVE_CITY_CONDITIONS";
}

type REQUEST_CITY_CONDITIONS_LIST = "REQUEST_CITY_CONDITIONS_LIST";
type REQUEST_CITY_CONDITIONS = "REQUEST_CITY_CONDITIONS";
type RECEIVE_CITY_CONDITIONS = "RECEIVE_CITY_CONDITIONS";

export interface IRequestCityListAction {
    type: REQUEST_CITY_CONDITIONS_LIST;
    cityList: ICity[];
}

export interface IRequestCityConditionsAction {
    type: REQUEST_CITY_CONDITIONS;
    city: ICity;
}

export interface IReceiveCityConditionAction {
    type: RECEIVE_CITY_CONDITIONS;
    city: ICity;
    forecast: ICityConditions;
}

export type PossibleCityConditionActions = IRequestCityListAction |
                                           IRequestCityConditionsAction |
                                           IReceiveCityConditionAction;

let createCityConditionsRequest = (city: ICity, dispatch) => {
  let cityName = city.City.replace(" ", "_");
  let url = `http://api.wunderground.com/api/988d4d4a2535c885/conditions/q/${city.State}/${cityName}.json`;
  let fetchTask = fetch(url)
                    .then((response) => response.json() as Promise<ICityConditions>)
                    .then((data) => {
                        dispatch({ type: CityConditionActions.RECEIVE_CITY_CONDITIONS, forecast: data, city });
                    });
  return fetchTask;
};

export const actionCreators = {
  //
  //  Single City Request
  //
  requestCityConditions: (city: ICity): IAppThunkAction<PossibleCityConditionActions> => (dispatch, getState) => {
    let task = createCityConditionsRequest(city, dispatch);
    addTask(task); // Ensure server-side prerendering waits for this to complete
    dispatch({ type: CityConditionActions.REQUEST_CITY_CONDITIONS, city });
  },

  requestCityConditionsList: (cityList: ICity[]):
    IAppThunkAction<PossibleCityConditionActions> => (dispatch, getState) => {
      for (let city of cityList) {
        let task = createCityConditionsRequest(city, dispatch);
        addTask(task);
        dispatch({ type: CityConditionActions.REQUEST_CITY_CONDITIONS, city });
      }
  },
};
