import React, { Component } from 'react';
import { Card, Typography, Row, Col, Tree, Table, Divider } from 'antd';
import { Link } from 'react-router-dom';

const columns = [
	{
		title: 'Name',
		dataIndex: 'name',
	},
	{
		title: 'Description',
		dataIndex: 'desc',
	},
	{
		title: 'Office Website / GitHub Repo',
		dataIndex: 'url',
		render: url => <Link to={url}>{url}</Link>,
	},
];

const tableData = [
	{
		name: 'React',
		desc: 'A JavaScript library for building user interfaces',
		url: 'https://reactjs.org/',
	},
	{
		name: 'React-Router',
		desc: 'Declarative Routing for React.js',
		url: 'https://reactrouter.com/',
	},
	{
		name: 'Redux',
		desc: 'A predictable state container for JavaScript apps',
		url: 'https://redux.js.org/',
	},
	{
		name: 'React-Redux',
		desc: 'Official React bindings for Redux',
		url: 'https://react-redux.js.org/',
	},
	{
		name: 'Ant Design',
		desc: 'Front-end UI library',
		url: 'https://ant.design/',
	},
	{
		name: 'AntV G2Plot',
		desc: 'A data visualization library',
		url: 'https://g2plot.antv.vision/',
	},
	{
		name: 'Axios',
		desc: 'Promise based HTTP client',
		url: 'https://github.com/axios/axios',
	},
	{
		name: 'customize-cra',
		desc: 'A library for overriding webpack configurations',
		url: 'https://github.com/arackaf/customize-cra',
	},
	{
		name: 'dayjs',
		desc: 'A library for datetime format conversion',
		url: 'https://github.com/iamkun/dayjs',
	},
	{
		name: 'node-sass',
		desc: 'Node.js bindings to libsass',
		url: 'https://github.com/sass/node-sass',
	},
	{
		name: 'screenfull',
		desc: 'A library packed JavaScript Fullscreen API',
		url: 'https://github.com/sindresorhus/screenfull.js/',
	},
	{
		name: 'react-draft-wysiwyg',
		desc: 'A library for building rich text editor',
		url: 'https://github.com/jpuri/react-draft-wysiwyg',
	},
];

const routesData = [
	{ title: '/login', key: '0-0' },
	{
		title: '/admin',
		key: '0-1',
		children: [
			{ title: '/readme', key: '0-1-0' },
			{
				title: '/products',
				key: '0-1-1',
				children: [
					{ title: '/all-products', key: '0-1-1-0' },
					{ title: '/create', key: '0-1-1-1' },
					{ title: '/edit:id', key: '0-1-1-2' },
					{ title: '/details:id', key: '0-1-1-3' },
				],
			},
			{ title: '/categories', key: '0-1-2' },
			{ title: '/users', key: '0-1-3' },
			{ title: '/roles', key: '0-1-4' },
			{
				title: '/stat',
				key: '0-1-5',
				children: [
					{ title: '/revenue', key: '0-1-5-0' },
					{ title: '/marketing', key: '0-1-6-1' },
					{ title: '/visits', key: '0-1-6-2' },
				],
			},
		],
	},
];

const fileData = [
	{
		title: 'src',
		key: '0-0',
		children: [
			{
				title: 'Api',
				key: '0-0-0',
				children: [
					{
						title: 'backend-api.js',
						key: '0-0-0-0',
						isLeaf: true,
					},
					{
						title: 'axios-config.js',
						key: '0-0-0-1',
						isLeaf: true,
					},
					{
						title: 'weather-api.js',
						key: '0-0-0-2',
						isLeaf: true,
					},
				],
			},
			{
				title: 'Components',
				key: '0-0-1',
			},
			{
				title: 'Admin',
				key: '0-0-2',
			},
			{
				title: 'Categories',
				key: '0-0-3',
				children: [
					{
						title: 'Login',
						key: '0-0-3-0',
					},
					{
						title: 'Products',
						key: '0-0-3-1',
					},
					{
						title: '...',
						key: '0-0-3-2',
					},
				],
			},
			{
				title: 'Config',
				key: '0-0-4',
				children: [
					{
						title: 'index.js',
						key: '0-0-4-0',
						isLeaf: true,
					},
					{
						title: 'menu.jsx',
						key: '0-0-4-1',
						isLeaf: true,
					},
					{
						title: 'route.jsx',
						key: '0-0-4-2',
						isLeaf: true,
					},
					{
						title: '...',
						key: '0-0-4-3',
						isLeaf: true,
					},
				],
			},
			{
				title: 'Img',
				key: '0-0-5',
			},
			{
				title: 'Redux',
				key: '0-0-6',
				children: [
					{
						title: 'actions',
						key: '0-0-6-0',
					},
					{
						title: 'reducers',
						key: '0-0-6-1',
					},
					{
						title: 'action_types.js',
						key: '0-0-6-2',
						isLeaf: true,
					},
					{
						title: 'store.js',
						key: '0-0-6-3',
						isLeaf: true,
					},
				],
			},
			{
				title: 'App.js',
				key: '0-0-7',
				isLeaf: true,
			},
			{
				title: 'index.js',
				key: '0-0-8',
				isLeaf: true,
			},
		],
	},
];
export default class ReadMe extends Component {
	render() {
		return (
			<Card>
				<Row style={{ marginTop: 32 }}>
					<Col
						xs={{ span: 24 }}
						md={{ span: 20, offset: 2 }}
						xxl={{ span: 16, offset: 4 }}
					>
						<Typography>
							<h1>Welcome to Amall Admin</h1>
							<Divider />
							<h2>Project Introduction</h2>
							<Divider />
							<p>Amall Admin</p>
							<ul>
								<li>
									is a SPA with distributed front-end and back-end application
								</li>
								<li>
									aims to help clients manage their online store and staff
									easily
								</li>
								<li>
									includes user management, categories management, products
									management, roles management and other functional modules
								</li>
								<li>
									Front-end technology stack: React + React router + Redux,
									Antd, JavaScript(es6), Webpack, etc.
								</li>
								<li>Backend technology stack: Node, Express, MongoDB, etc.</li>
								<li>is running on AWS EC2 and accessible to the public</li>
							</ul>
							<h2>Source Code</h2>
							<Divider />
							<p>
								Front-end:
								<a href='https://github.com/Nathan-Mu/Amall-Admin'>
									https://github.com/Nathan-Mu/Amall-Admin
								</a>
							</p>
							<p>
								Back-end: TBD (private now, polishing the documentation and
								fixing bugs)
							</p>
							<h2>Technologies / Libraries</h2>
							<Divider />
							<Table
								columns={columns}
								dataSource={tableData}
								size='small'
								bordered
								pagination={false}
							/>
							<h2>File Structure</h2>
							<Divider />
							<Tree.DirectoryTree
								defaultExpandAll
								expandAction={false}
								selectable={false}
								checkable={false}
								treeData={fileData}
							/>
							<h2>Routes</h2>
							<Divider />
							<Tree
								showLine
								defaultExpandAll
								treeData={routesData}
								selectable={false}
								checkable={false}
							/>
							<h2>At the end</h2>
							<Divider />
							<p>
								My name is Nathan, a smart developer and keep learning all the
								time. If you are hiring a smart web developer, or you know some
								one who is hiring, please let me know the opportunity (
								<a href='mailto:nathanzhao.n@gmail.com'>
									nathanzhao.n@gmail.com
								</a>
								). And you won't be regret doing so. Thank you ^_^
							</p>
						</Typography>
					</Col>
				</Row>
			</Card>
		);
	}
}
