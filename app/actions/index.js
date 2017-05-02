import * as BackendActions from './backend';
import * as LayoutActions from './layout';
import * as UserActions from './user';
import * as TripsActions from './trips';

export const ActionCreators = Object.assign({},
	BackendActions,
	LayoutActions,
	UserActions,
	TripsActions
);