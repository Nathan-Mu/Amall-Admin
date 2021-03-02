import React, { Component } from 'react';
import { Area } from '@antv/g2plot';
import { monthlyNewCustomers } from 'Config/visits-stats';

export default class MonthlyNewCustomers extends Component {
	componentDidMount() {
		this.renderChart();
	}

	renderChart = () => {
		const area = new Area('monthly-new-customers', {
			data: monthlyNewCustomers,
			xField: 'Date',
			yField: 'number',
			height: 300,
			xAxis: {
				tickCount: 5,
			},
			animation: false,
			slider: {
				start: 0.8,
				end: 1,
				trendCfg: {
					isArea: true,
				},
			},
		});
		area.render();
	};
	render() {
		return <div id='monthly-new-customers'></div>;
	}
}
