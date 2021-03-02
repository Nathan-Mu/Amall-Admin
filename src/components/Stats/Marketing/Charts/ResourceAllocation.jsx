import React, { Component } from 'react';
import { Rose } from '@antv/g2plot';
import { resourceAllocation } from 'Config/marketing-stats';

export default class ResourceAllocation extends Component {
	componentDidMount() {
		this.renderChart();
	}

	renderChart = () => {
		const rosePlot = new Rose('resource-allocation', {
			data: resourceAllocation,
			height: 300,
			xField: 'type',
			yField: 'value',
			seriesField: 'type',
			radius: 0.9,
			legend: {
				position: 'bottom',
			},
		});

		rosePlot.render();
	};

	render() {
		return <div id='resource-allocation' />;
	}
}
