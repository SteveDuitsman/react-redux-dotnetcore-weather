import * as React from "react";
import * as ReactDOM from "react-dom";

import "bootstrap";
import configureStore from "./configureStore";
import "./css/site.css";
import routes from "./routes";

import { Provider } from "react-redux";
import { browserHistory, Router } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";
import initialState from "./reducers/InitialState";

import injectTapEventPlugin from "react-tap-event-plugin";

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// Get the application-wide store instance, prepopulating with state from the server where available.
const store = configureStore(initialState);
const history = syncHistoryWithStore(browserHistory, store);

// This code starts up the React app when it runs in a browser. It sets up the routing configuration
// and injects the app into a DOM element.
ReactDOM.render(
    <Provider store={ store }>
        <Router history={ history } children={ routes } />
    </Provider>,
    document.getElementById("react-app"),
);
