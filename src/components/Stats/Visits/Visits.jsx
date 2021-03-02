import React, { Component } from 'react';
import { Row, Col, Card } from 'antd';
import ActiveUsers from './Charts/ActiveUsers';
import CustomerHeatMap from './Charts/CustomerHeatMap';
import MonthlyNewCustomers from './Charts/MonthlyNewCustomers';
import MonthlyVisits from './Charts/MonthlyVisits';

export default class PieCharts extends Component {
	render() {
		return (
			<div>
				<Row gutter={[16, 16]}>
					<Col span={12}>
						<Card title='Visits by Month'>
							<MonthlyVisits />
						</Card>
					</Col>
					<Col span={12}>
						<Card title='New Customers by Month'>
							<MonthlyNewCustomers />
						</Card>
					</Col>
					<Col span={12}>
						<Card title='Customer Heatmap'>
							<CustomerHeatMap />
						</Card>
					</Col>
					<Col span={12}>
						<Card title='Active Users'>
							<ActiveUsers />
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}
