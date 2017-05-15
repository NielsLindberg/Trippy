import * as types from './types';

export function appLayout(event: {width:number, height:number}) {
	const { width, height } = event;
	const orientation = (width > height) ? 'LANDSCAPE' : 'PORTRAIT';
	let payload = {};
	payload.width = width;
	payload.height = height;
	payload.orientation = orientation;
	return { type: types.SET_ORIENTATION, payload: payload}
};
