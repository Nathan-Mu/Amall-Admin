import ReadMe from 'Components/ReadMe/ReadMe';
import Editable from 'Components/Products/CreateOrEdit/Editable';
import Details from 'Components/Products/Details/Details';
import Products from 'Components/Products/Products';
import Categories from 'Components/Categories/Categories';
import Roles from 'Components/Roles/Roles';
import Revenue from 'Components/Stats/Revenue/Revenue';
import Marketing from 'Components/Stats/Marketing/Marketing';
import Visits from 'Components/Stats/Visits/Visits';
import Users from 'Components/Users/Users';

// eslint-disable-next-line import/no-anonymous-default-export
export default [
	{
		path: '/admin/readme',
		component: ReadMe,
		key: 'readme',
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
		path: '/admin/stats/revenue',
		component: Revenue,
		key: 'revenue',
	},
	{
		path: '/admin/stats/marketing',
		component: Marketing,
		key: 'marketing',
	},
	{
		path: '/admin/stats/visits',
		component: Visits,
		key: 'visits',
	},
	{
		to: '/admin/readme',
	},
];
