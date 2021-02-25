import { STAGE_PRODUCT, UNSTAGE_PRODUCT } from '../action_types';

const initState = {};
// eslint-disable-next-line import/no-anonymous-default-export
export default (prevState = initState, action) => {
	const { type, data } = action;
	switch (type) {
		case STAGE_PRODUCT:
			return data;
		case UNSTAGE_PRODUCT:
			return {};
		default:
			return prevState;
	}
};
