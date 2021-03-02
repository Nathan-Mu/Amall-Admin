import {
	AppstoreOutlined,
	BarsOutlined,
	PieChartOutlined,
	DatabaseOutlined,
	UserOutlined,
	ApartmentOutlined,
	InfoCircleOutlined,
	AreaChartOutlined,
	LineChartOutlined,
	BarChartOutlined,
	AppstoreAddOutlined,
} from '@ant-design/icons';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
const MENU = {
	root: {
		title: 'ReadMe',
		key: 'readme',
		pathIdentifer: 'readme',
		icon: <InfoCircleOutlined />,
		path: '/admin/readme',
	},
	items: [
		{
			title: 'ReadMe',
			key: 'readme',
			pathIdentifer: 'readme',
			icon: <InfoCircleOutlined />,
			path: '/admin/readme',
			disableCheckbox: true
		},
		{
			title: 'Products',
			key: 'products',
			pathIdentifer: 'products',
			icon: <DatabaseOutlined />,
			path: '/admin/products/all-products',
			children: [
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
			children: [
				{
					title: 'Revenue',
					key: 'revenue',
					pathIdentifer: 'revenue',
					icon: <BarChartOutlined />,
					path: '/admin/stats/revenue',
				},
				{
					title: 'Marketing',
					key: 'marketing',
					pathIdentifer: 'marketing',
					icon: <LineChartOutlined />,
					path: '/admin/stats/marketing',
				},
				{
					title: 'Visits',
					key: 'visits',
					pathIdentifer: 'visits',
					icon: <PieChartOutlined />,
					path: '/admin/stats/visits',
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
					items = item.children;
					break;
				}
			}
			if (!items) break;
		}
		return { breadcrumbItems, matchedKey };
	},
};

export default MENU;
