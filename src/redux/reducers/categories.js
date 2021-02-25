import { STAGE_CATEGORIES, UNSTAGE_CATEGORIES } from '../action_types';

const initState = [];
// eslint-disable-next-line import/no-anonymous-default-export
export default (prevState = initState, action) => {
	const { type, data } = action;
	switch (type) {
		case STAGE_CATEGORIES:
			return data;
		case UNSTAGE_CATEGORIES:
			return {};
		default:
			return initState;
	}
};
