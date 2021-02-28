import Home from 'Components/Home/Home';
import Editable from 'Components/Products/CreateOrEdit/Editable';
import Details from 'Components/Products/Details/Details';
import Products from 'Components/Products/Products';
import Categories from 'Components/Categories/Categories';
import Roles from 'Components/Roles/Roles';
import BarCharts from 'Components/Stats/BarCharts';
import LineCharts from 'Components/Stats/LineCharts';
import PieCharts from 'Components/Stats/PieCharts';
import Users from 'Components/Users/Users';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
	{
		path: '/admin/home',
		component: Home,
		key: 'home',
	},
	{
		path: '/admin/products/all-products',
		component: Products,
		key: 'all-products',
	},
	{
		path: '/admin/products/create',
		component: Editable,
		key: 'product-create',
	},
	{
		path: '/admin/products/edit/:id',
		component: Editable,
		key: 'product-edit',
	},
	{
		path: '/admin/products/details/:id',
		component: Details,
		key: 'product-details',
	},
	{
		from: '/admin/products',
		to: '/admin/products/all-products',
		key: 'products',
	},
	{
		path: '/admin/categories',
		component: Categories,
		key: 'categories',
	},
	{
		path: '/admin/users',
		component: Users,
		key: 'users',
	},
	{
		path: '/admin/roles',
		component: Roles,
		key: 'roles',
	},
	{
		path: '/admin/stats/bar-charts',
		component: BarCharts,
		key: 'bar-charts',
	},
	{
		path: '/admin/stats/line-charts',
		component: LineCharts,
		key: 'line-charts',
	},
	{
		path: '/admin/stats/pie-charts',
		component: PieCharts,
		key: 'pie-charts',
	},
	{
		to: '/admin/home',
	},
];
