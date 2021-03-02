import React, { Component } from 'react';
import { Line } from '@antv/g2plot';
import { monthlyVisits } from 'Config/visits-stats';

export default class MonthlyVisits extends Component {
	componentDidMount() {
		this.renderChart();
	}

	renderChart = () => {
		const line = new Line('visit-by-month', {
			data: monthlyVisits,
			padding: 'auto',
			xField: 'Date',
			yField: 'visits',
			height: 300,
			xAxis: {
				// type: 'timeCat',
				tickCount: 5,
			},
			smooth: true,
		});

		line.render();
	};
	render() {
		return <div id='visit-by-month'></div>;
	}
}
