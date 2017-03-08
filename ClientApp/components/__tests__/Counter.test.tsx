import {render, shallow} from "enzyme";
import * as React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";

import Counter from "../Counter";

import {reducer} from "../../store/Counter";

function setup() {
  const props = {
    count: 0,
    increment: () => {
      let doNothing = true;
    },
  };

  let store = createStore(reducer);

  const enzymeWrapper = shallow(
    <Provider store={store} >
      <Counter {...props} />
    </Provider>,
  );

  return {
    enzymeWrapper,
    props,
  };
}

describe("<Counter />", () => {
  it("should render", () => {
    let {enzymeWrapper} = setup();

    // expect(enzymeWrapper.html()).toBe(
    //   `<div class="in-foo"></div>`,
    // );

    expect(enzymeWrapper.find("h1").text()).toBe("Counter");

    expect(enzymeWrapper.find("button").text()).toBe("Increment");
  });
});
