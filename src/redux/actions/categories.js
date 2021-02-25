import { STAGE_CATEGORIES, UNSTAGE_CATEGORIES } from 'Redux/action_types';

export const stageCategories = data => ({ type: STAGE_CATEGORIES, data });
export const unstageCategories = data => ({ type: UNSTAGE_CATEGORIES, data });
