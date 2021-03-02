import React, { Component } from 'react';
import { Column } from '@antv/g2plot';
import { monthlyGrossProfit } from 'Config/revenue-stats';

export default class MonthlyGrossProfit extends Component {
	componentDidMount() {
		this.renderChart();
	}

	renderChart = () => {
		const columnPlot = new Column('monthly-gross-profit', {
			data: monthlyGrossProfit,
			height: 300,
			padding: 'auto',
			xField: 'month',
			yField: 'profit',
			meta: {
				value: {
					max: 10000,
					min: -2500,
				},
				month: {
					formatter: val => `${val}`,
				},
			},
			annotations: [
				{
					type: 'region',
					start: xScale => {
						const ratio = xScale.ticks ? 1 / xScale.ticks.length : 1;
						const x = xScale.scale('7') - ratio / 2;
						return [`${x * 100}%`, '0%'];
					},
					end: xScale => {
						const ratio = xScale.ticks ? 1 / xScale.ticks.length : 1;
						const x = xScale.scale('9') + ratio / 2;
						return [`${x * 100}%`, '100%'];
					},
				},
			],
			xAxis: {
				label: {
					autoHide: true,
					autoRotate: false,
				},
			},
		});

		columnPlot.render();
	};

	render() {
		return <div id='monthly-gross-profit' />;
	}
}
