import React, { Component } from 'react';
import { Funnel, FUNNEL_CONVERSATION_FIELD } from '@antv/g2plot';
import { conversion } from 'Config/marketing-stats';

export default class ConversionRate extends Component {
	componentDidMount() {
		this.renderChart();
	}

	renderChart = () => {
		const funnelPlot = new Funnel('conversionRate', {
			data: conversion,
			height: 300,
			xField: 'stage',
			yField: 'number',
			isTransposed: true,
			minSize: 0.05,
			maxSize: 1,
			label: {
				formatter: datum => {
					return `${datum.stage}: ${datum.number}`;
				},
			},
			conversionTag: {
				formatter: datum => {
					return (
						datum[FUNNEL_CONVERSATION_FIELD][1] /
						datum[FUNNEL_CONVERSATION_FIELD][0]
					).toFixed(2);
				},
			},
			tooltip: {
				formatter: datum => {
					return { name: datum.stage, value: `${datum.number}` };
				},
			},
		});
		funnelPlot.render();
	};

	render() {
		return <div id='conversionRate' />;
	}
}
