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
} from '@ant-design/icons';

/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
export default {
	entrance: {
		title: 'Home',
		key: 'home',
		icon: <HomeOutlined />,
		path: '/admin/home',
	},
	items: [
		{
			title: 'Home',
			key: 'home',
			icon: <HomeOutlined />,
			path: '/admin/home',
		},
		{
			title: 'Products',
			key: 'products',
			icon: <AppstoreOutlined />,
			subItems: [
				{
					title: 'Categories',
					key: 'categories',
					icon: <BarsOutlined />,
					path: '/admin/products/categories',
				},
				{
					title: 'All Products',
					key: 'all-products',
					icon: <DatabaseOutlined />,
					path: '/admin/products/all-products',
				},
			],
		},

		{
			title: 'Users',
			key: 'users',
			icon: <UserOutlined />,
			path: '/admin/users',
		},
		{
			title: 'Roles',
			key: 'roles',
			icon: <ApartmentOutlined />,
			path: '/admin/roles',
		},

		{
			title: 'Stats',
			key: 'stats',
			icon: <AreaChartOutlined />,
			subItems: [
				{
					title: 'Line Charts',
					key: 'line-charts',
					icon: <LineChartOutlined />,
					path: '/admin/stats/line-charts',
				},
				{
					title: 'Bar Charts',
					key: 'bar-charts',
					icon: <BarChartOutlined />,
					path: '/admin/stats/bar-charts',
				},
				{
					title: 'Pie Charts',
					key: 'pie-charts',
					icon: <PieChartOutlined />,
					path: '/admin/stats/pie-charts',
				},
			],
		},
	],
};
