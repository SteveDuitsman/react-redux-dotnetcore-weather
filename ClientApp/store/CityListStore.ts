import { fetch, addTask } from 'domain-task';
import { Action, Reducer, ActionCreator } from 'redux';
import { AppThunkAction } from '../models/Models';
import { City, CityConditions, CityListState, ConditionsState, ForecastSummaryState } from '../models/Models';
import {CityConditionActions, PossibleCityConditionActions} from '../actions/CityConditionActions';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

// -----------------
// ACTIONS

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).