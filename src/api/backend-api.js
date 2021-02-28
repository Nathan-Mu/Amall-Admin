import { BASE_URL } from 'Config';
import axios from './axios-config';

const GET = 'get';
const POST = 'post';

export const uploadImageUrl = `${BASE_URL}/manage/img/upload`;

export const requestLogin = (username, password) =>
	axios({
		method: POST,
		url: '/login',
		data: { username, password },
	});

export const requestAllCategories = () =>
	axios({
		method: GET,
		url: '/manage/category/list',
	});

export const requestCreateCategory = categoryName =>
	axios({
		method: POST,
		url: '/manage/category/add',
		data: { categoryName },
	});

export const requestUpdateCategoryName = (categoryName, categoryId) =>
	axios({
		method: POST,
		url: '/manage/category/update',
		data: { categoryId, categoryName },
	});

export const requestPagedProducts = (pageNo, pageSize) =>
	axios({
		method: GET,
		url: '/manage/product/list',
		params: { pageNum: pageNo, pageSize },
	});

export const requestUpdateProductStatus = (productId, status) =>
	axios({
		method: POST,
		url: '/manage/product/updateStatus',
		data: { productId, status: status ? 1 : 2 },
	});

export const requestSearchPagedProducts = (
	keyword,
	searchBy,
	pageNo,
	pageSize
) =>
	axios({
		method: GET,
		url: '/manage/product/search',
		params: {
			pageNum: pageNo,
			pageSize,
			[searchBy]: keyword,
		},
	});

export const requestSearchProductById = productId =>
	axios({
		method: GET,
		url: '/manage/product/info',
		params: { productId },
	});

export const requestCategoryNameById = categoryId =>
	axios({
		method: GET,
		url: '/manage/category/info',
		params: { categoryId },
	});

export const requestDeleteImage = name =>
	axios({
		method: POST,
		url: '/manage/img/delete',
		data: { name },
	});

export const requestSearchCategoryById = categoryId =>
	axios({
		method: GET,
		url: '/manage/category/info',
		params: { categoryId },
	});

export const requestCreateProduct = newProduct =>
	axios({
		method: POST,
		url: '/manage/product/add',
		data: newProduct,
	});

export const requestUpdateProduct = product =>
	axios({
		method: POST,
		url: '/manage/product/update',
		data: product,
	});

export const requestRoles = () =>
	axios({
		method: GET,
		url: '/manage/role/list',
	});

export const requestCreateRole = roleName =>
	axios({
		method: POST,
		url: '/manage/role/add',
		data: { roleName },
	});

export const requestSetPermissions = (id, permissions, auth_name) =>
	axios({
		method: POST,
		url: '/manage/role/update',
		data: { _id: id, menus: permissions, auth_time: Date.now(), auth_name },
	});
