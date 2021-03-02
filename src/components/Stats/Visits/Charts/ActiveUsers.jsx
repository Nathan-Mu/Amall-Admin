import React, { Component } from 'react';
import { Liquid } from '@antv/g2plot';

export default class ActiveUsers extends Component {
	componentDidMount() {
		this.renderChart();
	}

	renderChart = () => {
		const liquidPlot = new Liquid('active-users', {
			percent: 0.25,
			height: 300,
			outline: {
				border: 4,
				distance: 8,
			},
			wave: {
				length: 128,
			},
		});
		liquidPlot.render();
	};

	render() {
		return <div id='active-users'></div>;
	}
}
