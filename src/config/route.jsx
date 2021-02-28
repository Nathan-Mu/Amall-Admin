import Home from 'Components/Home/Home';
import Editable from 'Components/Products/CreateOrEdit/Editable';
import Details from 'Components/Products/Details/Details';
import Products from 'Components/Products/Products';
import Categories from 'Components/Categories/Categories'
import Roles from 'Components/Roles/Roles';
import BarCharts from 'Components/Stats/BarCharts';
import LineCharts from 'Components/Stats/LineCharts';
import PieCharts from 'Components/Stats/PieCharts';
import Users from 'Components/Users/Users';


// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: '/admin/home',
    component: Home
  }, 
  {
    path: '/admin/products/all-products',
    component: Products
  },
  {
    path: '/admin/products/create',
    component: Editable
  },
  {
    path: '/admin/products/edit/:id',
    component: Editable
  },
  {
    path: '/admin/products/details/:id',
    component: Details
  },
  {
    from: '/admin/products',
    to: '/admin/products/all-products'
  },
  {
    path: '/admin/categories',
    component: Categories
  },
  {
    path: '/admin/users',
    component: Users
  },
  {
    path: '/admin/roles',
    component: Roles
  },
  {
    path: '/admin/stats/bar-charts',
    component: BarCharts
  },
  {
    path: '/admin/stats/line-charts',
    component: LineCharts
  },
  {
    path: '/admin/stats/pie-charts',
    component: PieCharts
  },
  {
    to: '/admin/home'
  },
  
]