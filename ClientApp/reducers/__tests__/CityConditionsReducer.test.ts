import CityConditionsReducer from "../CityConditionsReducer";
import initialState from "../InitialState";

describe("City Conditions Reducer", () => {
  it("should load with initial state", () => {
    expect(CityConditionsReducer(undefined, { type: "noaction"})).toEqual(initialState.cityList);
  });
});
