import axios from './axios-config';

export const requestLogin = (username, password) =>
	axios({
		method: 'post',
		url: '/login',
		data: { username, password },
	});

export const requestAllCategories = () =>
	axios({
		method: 'get',
		url: '/manage/category/list',
	});

export const requestCreateCategory = categoryName =>
	axios({
		method: 'post',
		url: '/manage/category/add',
		data: { categoryName },
	});

export const requestUpdateCategoryName = (categoryName, categoryId) =>
	axios({
		method: 'post',
		url: '/manage/category/update',
		data: { categoryId, categoryName },
	});

export const requestPagedProducts = (pageNo, pageSize) =>
	axios({
		method: 'get',
		url: '/manage/product/list',
		params: { pageNum: pageNo, pageSize },
	});

export const requestUpdateProductStatus = (productId, status) =>
	axios({
		method: 'post',
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
		method: 'get',
		url: '/manage/product/search',
		params: {
			pageNum: pageNo,
			pageSize,
			[searchBy]: keyword,
		},
	});
