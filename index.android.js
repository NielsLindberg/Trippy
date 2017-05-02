import React from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import reducer from './app/reducers';
import AppContainer from './app/containers/AppContainer/AppContainer';
import initialState from './app/reducers/initialState';

const loggerMiddleware = createLogger({ predicate: (getState, action) => __DEV__ });

function configureStore(initialState) {
	const enhancer = compose(
		applyMiddleware(
			thunkMiddleware,
			loggerMiddleware
		)
	);
	return createStore(reducer, initialState, enhancer);
}

const store = configureStore(initialState);

const App = () => (
	<Provider store={store}>
		<AppContainer/>
	</Provider>
);

AppRegistry.registerComponent('Trippy', () => App);