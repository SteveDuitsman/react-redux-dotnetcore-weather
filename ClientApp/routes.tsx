import * as React from "react";
import { HistoryBase, Route, Router } from "react-router";

import CityListPage from "./components/CityListPage";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";
import Home from "./components/Home";
import { Layout } from "./components/Layout";

export default <Route component={ Layout }>
    <Route path="/" components={{ body: Home }} />
    <Route path="/citylistpage" components={{ body: CityListPage }} />
</Route>;

// Enable Hot Module Replacement (HMR)
if (module.hot) {
    module.hot.accept();
}
