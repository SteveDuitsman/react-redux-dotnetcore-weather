import { ApplicationState } from '../models/Models';
import initialForecasts from './sample json/city forecast data.json';

let initialState : ApplicationState = {
    counter: { 
      count: 0 
    },
    weatherForecasts: { 
      startDateIndex: null, 
      forecasts: [], 
      isLoading: false 
    },
    cityList: {
      isLoading: false,
      cityList: [ 
        {City: "New Berlin", State: "WI", Zip: 53151},
        {City: "Wauwatosa", State: "WI", Zip: 53226},
        {City: "San Antonio", State: "TX", Zip: 78201},     
      ],
      forecasts: []//initialForecasts
    }
};
export default initialState;