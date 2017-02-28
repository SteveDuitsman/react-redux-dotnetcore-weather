import { IApplicationState } from "../models/Models";
import initialForecasts from "./sample json/city forecast data.json";

export default {
  cityList: {
    cityList: [
      {City: "New Berlin", State: "WI", Zip: 53151},
      {City: "Wauwatosa", State: "WI", Zip: 53226},
      {City: "San Antonio", State: "TX", Zip: 78201},
    ],
    forecasts: [],
    isLoading: false,
  },
  counter: {
    count: 0,
  },
  weatherForecasts: {
    forecasts: [],
    isLoading: false,
    startDateIndex: null,
  },
} as IApplicationState;
