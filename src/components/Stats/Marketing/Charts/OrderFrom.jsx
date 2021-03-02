import React, { Component } from 'react';
import { Pie } from '@antv/g2plot';
import { orderFrom } from 'Config/marketing-stats';

export default class OrderFrom extends Component {
	componentDidMount() {
		this.renderChart();
	}
	renderChart = () => {
		const piePlot = new Pie('order-from', {
			appendPadding: 10,
			height: 300,
			data: orderFrom,
			angleField: 'value',
			colorField: 'state',
			radius: 0.75,
			label: {
				type: 'spider',
				labelHeight: 28,
				content: '{name}\n{percentage}',
			},
			interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
		});

		piePlot.render();
	};

	render() {
		return <div id='order-from'></div>;
	}
}
