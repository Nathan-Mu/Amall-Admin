import React, { Component } from 'react';
import { Card, Row, Col } from 'antd';
import RevenueByCategory from './Charts/RevenueByCategory';
import MonthlyRevenue from './Charts/MonthlyRevenue';
import MonthlyGrossProfit from './Charts/MonthlyGrossProfit';

export default class BarCharts extends Component {
	render() {
		return (
			<div>
				<Row gutter={[16, 16]}>
					<Col span={24}>
						<Card title='Monthly Revenue'>
							<MonthlyRevenue />
						</Card>
					</Col>
					<Col span={12}>
						<Card title='Revenue by category'>
							<RevenueByCategory />
						</Card>
					</Col>
					<Col span={12}>
						<Card title='Gross Profit'>
							<MonthlyGrossProfit />
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}
