import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import CityConditionReducer from '../reducers/CityConditionsReducer';
import {CityListState, ApplicationState} from '../models/Models';

// The top-level state object

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    cityList: CityConditionReducer
};