import * as Counter from "../store/Counter";
import * as WeatherForecasts from "../store/WeatherForecasts";

export interface ICityListState {
  cityList: ICity[];
  forecasts: ICityConditions[];
  isLoading: boolean;
}

export interface IApplicationState {
    counter: Counter.ICounterState;
    weatherForecasts: WeatherForecasts.IWeatherForecastsState;
    cityList: ICityListState;
}

export interface IConditionsState {
  icon_url: string;
  icon: string;
}

export interface IForecastSummaryState {
  city: string;
  state: string;
  zip: number;
  current_temp: string;
  highTemp: string;
  lowTemp: string;
  precipitationChance: string;
}

export interface ILocation {
  full: string;
  city: string;
  state: string;
  state_name: string;
  country: string;
  country_iso3166: string;
  zip: number;
  magic: number;
  wmo: string;
  latitude: number;
  longitude: number;
  elevation: number;
}

export interface ICity {
  City: string;
  State: string;
  Zip: number;
}

export interface ICityConditions {
  response: {
    version: number;
    termsofService: string;
    features: {
      conditions: number;
    }
  };
  current_observation: {
    image: {
      url: string;
      title: string;
      link: string;
    };
    display_location: ILocation;
    observation_location: ILocation;
    estimated: string;
    station_id: string;
    observation_time: string;
    observation_time_rfc822: string;
    observation_epoch: number;
    local_time_rfc822: string;
    local_epoch: number;
    local_tz_short: string;
    local_tz_long: string;
    local_tz_offset: string;
    weather: string;
    temperature_string: string;
    temp_f: string;
    temp_c: string;
    relative_humidity: string;
    wind_string: string;
    wind_dir: string;
    wind_degrees: string;
    wind_mph: string;
    wind_gust_mph: string;
    wind_kph: string;
    wind_gust_kph: string;
    pressure_mb: string;
    pressure_in: string;
    pressure_trend: string;
    dewpoint_string: string;
    dewpoint_f: string;
    dewpoint_c: string;
    heat_index_string: string;
    heat_index_f: string;
    heat_index_c: string;
    windchill_string: string;
    windchill_f: string;
    windchill_c: string;
    feelslike_string: string;
    feelslike_f: string;
    feelslike_c: string;
    visibility_mi: string;
    visibility_km: string;
    solarradiation: string;
    UV: string;
    precip_1hr_string: string;
    precip_1hr_in: string;
    precip_1hr_metric: string;
    precip_today_string: string;
    precip_today_in: string;
    precip_today_metric: string;
    icon: string;
    icon_url: string;
    forecast_url: string;
    history_url: string;
    ob_url: string;
    nowcast: string;
  };
}

// This type can be used as a hint on action creators so that its "dispatch" and "getState" params are
// correctly typed to match your store.
export interface IAppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => IApplicationState): void;
}
