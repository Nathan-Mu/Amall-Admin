import { UNSTAGE_PRODUCT, STAGE_PRODUCT } from 'Redux/action_types';

export const stageProduct = data => ({ type: STAGE_PRODUCT, data });
export const unstageProduct = data => ({ type: UNSTAGE_PRODUCT, data });
