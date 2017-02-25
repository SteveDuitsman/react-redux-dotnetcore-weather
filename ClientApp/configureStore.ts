import { createStore, applyMiddleware, compose, combineReducers, GenericStoreEnhancer } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer } from 'react-router-redux';
import * as Store from './store';
import { ApplicationState }  from './models/Models';
import * as InitalState from './reducers/InitialState';

export default function configureStore(initialState?: ApplicationState) {
    // Build middleware. These are functions that can process the actions before they reach the store.
    const windowIfDefined = typeof window === 'undefined' ? null : window as any;
    // If devTools is installed, connect to it
    const devToolsExtension = windowIfDefined && windowIfDefined.devToolsExtension as () => GenericStoreEnhancer;
    const createStoreWithMiddleware = compose(
        applyMiddleware(thunk),
        devToolsExtension ? devToolsExtension() : f => f
    )(createStore);

    // Combine all reducers and instantiate the app-wide store instance
    const allReducers = buildRootReducer(Store.reducers);
    const store = createStoreWithMiddleware(allReducers, InitalState) as Redux.Store<ApplicationState>;

    // Enable Webpack hot module replacement for reducers
    if (module.hot) {
        module.hot.accept('./store', () => {
            const nextRootReducer = require<typeof Store>('./store');
            store.replaceReducer(buildRootReducer(nextRootReducer.reducers));
        });
    }

    return store;
}

function buildRootReducer(allReducers) {
    return combineReducers<ApplicationState>(Object.assign({}, allReducers, { routing: routerReducer }));
}
