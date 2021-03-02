import { Row, Col, Card } from 'antd';
import React, { Component } from 'react';
import ConversionRate from './Charts/ConversionRate';
import ResourceAllocation from './Charts/ResourceAllocation';
import KeyWords from './Charts/KeyWords';
import OrderFrom from './Charts/OrderFrom';

export default class LineCharts extends Component {
	render() {
		return (
			<div>
				<Row gutter={[16, 16]}>
					<Col span={12}>
						<Card title='Conversion Rate'>
							<ConversionRate />
						</Card>
					</Col>
					<Col span={12}>
						<Card title='Keywords'>
							<KeyWords />
						</Card>
					</Col>
					<Col span={12}>
						<Card title='Resource Allocation'>
							<ResourceAllocation />
						</Card>
					</Col>
					<Col span={12}>
						<Card title='Orders by State'>
							<OrderFrom />
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}
