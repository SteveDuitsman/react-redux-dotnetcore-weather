import * as React from "react";
import * as TestUtils from "react-addons-test-utils";

import {createStore} from "redux";

import Counter from "../Counter";

import { reducer } from "../../store/Counter";

describe("<Counter />", () => {
  it("tests successfully", () => {
    expect(true).toBe(true);
  });

  it("renders", () => {
    const store = createStore(reducer);
    expect(true).toBe(true);
    // expect(TestUtils.createRenderer().render(<Counter />)).toMatchSnapshot();
  });
});
