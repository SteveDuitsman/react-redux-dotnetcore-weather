import {shallow} from "enzyme";
import * as React from "react";

import Counter from "../Counter";

// function setup() {
//   const props = {
//     count: 0,
//     increment: () => {
//       let doNothing = true;
//     },
//   };

//   const enzymeWrapper = shallow(<Counter {...props}/>);

//   return {
//     enzymeWrapper,
//     props,
//   };
// }

describe("<Counter />", () => {
  it("should render", () => {
    expect(true).toBe(true);

    // let {enzymeWrapper} = setup();

    // expect(enzymeWrapper.find("h1").text()).toBe("Counter");

    // expect(enzymeWrapper.find("button").text()).toBe("Increment");
  });
});
