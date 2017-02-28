import * as Counter from "./Counter";
import * as WeatherForecasts from "./WeatherForecasts";

import { IApplicationState, ICityListState } from "../models/Models";
import CityConditionReducer from "../reducers/CityConditionsReducer";

// The top-level state object

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It"s important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    cityList: CityConditionReducer,
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
};
