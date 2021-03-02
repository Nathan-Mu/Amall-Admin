import React, { Component } from 'react';
import { Heatmap } from '@antv/g2plot';
import { customerHeatMapData } from 'Config/visits-stats';

export default class CustomerHeatMap extends Component {
	componentDidMount() {
		this.renderChart();
	}

	renderChart = () => {
		const heatmapPlot = new Heatmap(document.getElementById('customer-heat-map'), {
			data: customerHeatMapData,
			height: 300,
			xField: 'age',
			yField: 'state',
			colorField: 'value',
			sizeField: 'value',
			shape: 'square',
			color: ['#dddddd', '#9ec8e0', '#5fa4cd', '#2e7ab6', '#114d90'],
			label: {
				style: {
					fill: '#fff',
					shadowBlur: 2,
					shadowColor: 'rgba(0, 0, 0, .45)',
				},
			},
		});
		heatmapPlot.render();
	};

	render() {
		return <div id='customer-heat-map'></div>;
	}
}
