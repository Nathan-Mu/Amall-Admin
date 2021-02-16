import {
	AppstoreOutlined,
	BarsOutlined,
	PieChartOutlined,
	DatabaseOutlined,
	UserOutlined,
	ApartmentOutlined,
	HomeOutlined,
	AreaChartOutlined,
	LineChartOutlined,
	BarChartOutlined,
	AppstoreAddOutlined,
} from '@ant-design/icons';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
const MENU = {
	root: {
		title: 'Home',
		key: 'home',
		pathIdentifer: 'home',
		icon: <HomeOutlined />,
		path: '/admin/home',
	},
	items: [
		{
			title: 'Home',
			key: 'home',
			pathIdentifer: 'home',
			icon: <HomeOutlined />,
			path: '/admin/home',
		},
		{
			title: 'Products',
			key: 'products',
			pathIdentifer: 'products',
			icon: <DatabaseOutlined />,
			path: '/admin/products/all-products',
			subItems: [
				{
					title: 'Create',
					key: 'product-create',
					pathIdentifer: 'create',
					icon: <AppstoreAddOutlined />,
					path: '/admin/products/create',
				},
				{
					title: 'Edit',
					key: 'product-edit',
					pathIdentifer: 'edit',
					hiddenOnMenu: true,
					path: '/admin/products/edit',
				},
				{
					title: 'Details',
					key: 'product-details',
					pathIdentifer: 'details',
					hiddenOnMenu: true,
					path: '/admin/products/details',
				},
				{
					title: 'All Products',
					key: 'all-products',
					pathIdentifer: 'all-products',
					icon: <AppstoreOutlined />,
					path: '/admin/products/all-products',
				},
			],
		},
		{
			title: 'Categories',
			key: 'categories',
			pathIdentifer: 'categories',
			icon: <BarsOutlined />,
			path: '/admin/categories',
		},
		{
			title: 'Users',
			key: 'users',
			pathIdentifer: 'users',
			icon: <UserOutlined />,
			path: '/admin/users',
		},
		{
			title: 'Roles',
			key: 'roles',
			pathIdentifer: 'roles',
			icon: <ApartmentOutlined />,
			path: '/admin/roles',
		},

		{
			title: 'Stats',
			key: 'stats',
			pathIdentifer: 'stats',
			icon: <AreaChartOutlined />,
			subItems: [
				{
					title: 'Line Charts',
					key: 'line-charts',
					pathIdentifer: 'line-charts',
					icon: <LineChartOutlined />,
					path: '/admin/stats/line-charts',
				},
				{
					title: 'Bar Charts',
					key: 'bar-charts',
					pathIdentifer: 'bar-charts',
					icon: <BarChartOutlined />,
					path: '/admin/stats/bar-charts',
				},
				{
					title: 'Pie Charts',
					key: 'pie-charts',
					pathIdentifer: 'pie-charts',
					icon: <PieChartOutlined />,
					path: '/admin/stats/pie-charts',
				},
			],
		},
	],
	traverseItems: pathname => {
		let paths = pathname.split('/');
		let pathIdentifers = paths.splice(2);
		let { items } = MENU;
		let breadcrumbItems = [],
			matchedKey = '';
		for (let pathIdentifer of pathIdentifers) {
			for (let item of items) {
				if (pathIdentifer === item.pathIdentifer) {
					breadcrumbItems = [...breadcrumbItems, item];
					matchedKey = item.key;
					items = item.subItems;
					break;
				}
			}
			if (!items) break;
		}
		return { breadcrumbItems, matchedKey };
	},
};

export default MENU;
