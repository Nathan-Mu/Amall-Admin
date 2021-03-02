import React, { Component } from 'react';
import { Line } from '@antv/g2plot';
import { monthlyRevenue } from 'Config/revenue-stats';

export default class MonthlyRevenue extends Component {
	componentDidMount() {
		this.renderChart();
	}

	renderChart = () => {
		const line = new Line('revenue-line', {
			data: monthlyRevenue,
			padding: 'auto',
			xField: 'Date',
			yField: 'Revenue',
			xAxis: {
				tickCount: 5,
			},
			slider: {
				start: 0.75,
				end: 1,
			},
			height: 300,
		});

		line.render();
	};

	render() {
		return <div id='revenue-line' />;
	}
}
