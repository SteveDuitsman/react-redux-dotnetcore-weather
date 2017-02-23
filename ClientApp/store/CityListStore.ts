import { Action, Reducer } from 'redux';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface CityListState {
  cityList: Object[],
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
    type: 'REQUEST_CITY_CONDITIONS',
    cityList: Object[]
}

interface ReceiveCityListAction {
    type: 'RECEIVE_CITY_CONDITIONS',
    cityList: Object[],
    forecasts: CityConditions[]
}

type KnownAction = RequestCityListAction | ReceiveCityListAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    // requestWeatherForecasts: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
    //     // Only load data if it's something we don't already have (and are not already loading)
    //     if (startDateIndex !== getState().weatherForecasts.startDateIndex) {
    //         let fetchTask = fetch(`/api/SampleData/WeatherForecasts?startDateIndex=${ startDateIndex }`)
    //             .then(response => response.json() as Promise<WeatherForecast[]>)
    //             .then(data => {
    //                 dispatch({ type: 'RECEIVE_WEATHER_FORECASTS', startDateIndex: startDateIndex, forecasts: data });
    //             });

    //         addTask(fetchTask); // Ensure server-side prerendering waits for this to complete
    //         dispatch({ type: 'REQUEST_WEATHER_FORECASTS', startDateIndex: startDateIndex });
    //     }
    // }
};

// -----------------
// REDUCER

const unloadedState: CityListState = {
  isLoading: false,
  cityList: [],
  forecasts: [] 
  /*JSON.parse("[{ 'response': { 'version':'0.1', 'termsofService':'http://www.wunderground.com/weather/api/d/terms.html', 'features': { 'conditions': 1 } } ,	'current_observation': { 'image': { 'url':'http://icons.wxug.com/graphics/wu2/logo_130x80.png', 'title':'Weather Underground', 'link':'http://www.wunderground.com' }, 'display_location': { 'full':'Wauwatosa, WI', 'city':'Wauwatosa', 'state':'WI', 'state_name':'Wisconsin', 'country':'US', 'country_iso3166':'US', 'zip':'53226', 'magic':'2', 'wmo':'99999', 'latitude':'43.06000137', 'longitude':'-88.01000214', 'elevation':'232.0' }, 'observation_location': { 'full':'Cooper Park, Milwaukee, Wisconsin', 'city':'Cooper Park, Milwaukee', 'state':'Wisconsin', 'country':'US', 'country_iso3166':'US', 'latitude':'43.071350', 'longitude':'-88.014526', 'elevation':'715 ft' }, 'estimated': { }, 'station_id':'KWIMILWA93', 'observation_time':'Last Updated on February 23, 1:03 PM CST', 'observation_time_rfc822':'Thu, 23 Feb 2017 13:03:04 -0600', 'observation_epoch':'1487876584', 'local_time_rfc822':'Thu, 23 Feb 2017 13:03:44 -0600', 'local_epoch':'1487876624', 'local_tz_short':'CST', 'local_tz_long':'America/Chicago', 'local_tz_offset':'-0600', 'weather':'Overcast', 'temperature_string':'40.5 F (4.7 C)', 'temp_f':40.5, 'temp_c':4.7, 'relative_humidity':'80%', 'wind_string':'From the WSW at 5.0 MPH', 'wind_dir':'WSW', 'wind_degrees':248, 'wind_mph':5.0, 'wind_gust_mph':0, 'wind_kph':8.0, 'wind_gust_kph':0, 'pressure_mb':'1011', 'pressure_in':'29.87', 'pressure_trend':'+', 'dewpoint_string':'34 F (1 C)', 'dewpoint_f':34, 'dewpoint_c':1, 'heat_index_string':'NA', 'heat_index_f':'NA', 'heat_index_c':'NA', 'windchill_string':'37 F (3 C)', 'windchill_f':'37', 'windchill_c':'3', 'feelslike_string':'37 F (3 C)', 'feelslike_f':'37', 'feelslike_c':'3', 'visibility_mi':'10.0', 'visibility_km':'16.1', 'solarradiation':'--', 'UV':'1','precip_1hr_string':'0.00 in ( 0 mm)', 'precip_1hr_in':'0.00', 'precip_1hr_metric':' 0', 'precip_today_string':'0.00 in (0 mm)', 'precip_today_in':'0.00', 'precip_today_metric':'0', 'icon':'cloudy', 'icon_url':'http://icons.wxug.com/i/c/k/cloudy.gif', 'forecast_url':'http://www.wunderground.com/US/WI/Wauwatosa.html', 'history_url':'http://www.wunderground.com/weatherstation/WXDailyHistory.asp?ID=KWIMILWA93', 'ob_url':'http://www.wunderground.com/cgi-bin/findweather/getForecast?query=43.071350,-88.014526', 'nowcast':'' } },{ 'response': { 'version':'0.1', 'termsofService':'http://www.wunderground.com/weather/api/d/terms.html', 'features': { 'conditions': 1 } } ,	'current_observation': { 'image': { 'url':'http://icons.wxug.com/graphics/wu2/logo_130x80.png', 'title':'Weather Underground', 'link':'http://www.wunderground.com' }, 'display_location': { 'full':'New Berlin, WI', 'city':'New Berlin', 'state':'WI', 'state_name':'Wisconsin', 'country':'US', 'country_iso3166':'US', 'zip':'53151', 'magic':'1', 'wmo':'99999', 'latitude':'42.97999954', 'longitude':'-88.09999847', 'elevation':'271.9' }, 'observation_location': { 'full':'150th and National Ave, New Berlin, Wisconsin', 'city':'150th and National Ave, New Berlin', 'state':'Wisconsin', 'country':'US', 'country_iso3166':'US', 'latitude':'42.981499', 'longitude':'-88.101410', 'elevation':'880 ft' }, 'estimated': { }, 'station_id':'KWINEWBE5', 'observation_time':'Last Updated on February 23, 1:02 PM CST', 'observation_time_rfc822':'Thu, 23 Feb 2017 13:02:08 -0600', 'observation_epoch':'1487876528', 'local_time_rfc822':'Thu, 23 Feb 2017 13:02:10 -0600', 'local_epoch':'1487876530', 'local_tz_short':'CST', 'local_tz_long':'America/Chicago', 'local_tz_offset':'-0600', 'weather':'Overcast', 'temperature_string':'40.0 F (4.4 C)', 'temp_f':40.0, 'temp_c':4.4, 'relative_humidity':'80%', 'wind_string':'From the ENE at 3.0 MPH Gusting to 10.0 MPH', 'wind_dir':'ENE', 'wind_degrees':74, 'wind_mph':3.0, 'wind_gust_mph':'10.0', 'wind_kph':4.8, 'wind_gust_kph':'16.1', 'pressure_mb':'1011', 'pressure_in':'29.85', 'pressure_trend':'0', 'dewpoint_string':'34 F (1 C)', 'dewpoint_f':34, 'dewpoint_c':1, 'heat_index_string':'NA', 'heat_index_f':'NA', 'heat_index_c':'NA', 'windchill_string':'40 F (4 C)', 'windchill_f':'40', 'windchill_c':'4', 'feelslike_string':'40 F (4 C)', 'feelslike_f':'40', 'feelslike_c':'4', 'visibility_mi':'10.0', 'visibility_km':'16.1', 'solarradiation':'--', 'UV':'1','precip_1hr_string':'0.00 in ( 0 mm)', 'precip_1hr_in':'0.00', 'precip_1hr_metric':' 0', 'precip_today_string':'0.00 in (0 mm)', 'precip_today_in':'0.00', 'precip_today_metric':'0', 'icon':'cloudy', 'icon_url':'http://icons.wxug.com/i/c/k/cloudy.gif', 'forecast_url':'http://www.wunderground.com/US/WI/New_Berlin.html', 'history_url':'http://www.wunderground.com/weatherstation/WXDailyHistory.asp?ID=KWINEWBE5', 'ob_url':'http://www.wunderground.com/cgi-bin/findweather/getForecast?query=42.981499,-88.101410', 'nowcast':'' } }]")
  */
};

export const reducer: Reducer<CityListState> = (state: CityListState, action: KnownAction) => {
    switch (action.type) {
        case 'REQUEST_CITY_CONDITIONS':
            return {
                cityList: action.cityList,
                forecasts: state.forecasts,
                isLoading: true
            };
        case 'RECEIVE_CITY_CONDITIONS':
                return {
                    cityList: action.cityList,
                    forecasts: action.forecasts,
                    isLoading: false
                };
        default:
            // The following line guarantees that every action in the KnownAction union has been covered by a case above
            const exhaustiveCheck: never = action;
            break;
    }

    return state || unloadedState;
};