import React, { Component } from 'react';
import { WordCloud } from '@antv/g2plot';
import { keywords } from 'Config/marketing-stats';

export default class KeyWords extends Component {
	componentDidMount() {
		this.renderChart();
	}

	renderChart = () => {
		const wordCloud = new WordCloud('keywords', {
			data: keywords,
			height: 300,
			wordField: 'name',
			weightField: 'value',
			colorField: 'name',
			wordStyle: {
				fontFamily: 'Verdana',
				fontSize: [8, 32],
				rotation: 0,
			},
			random: () => 0.5,
		});
		wordCloud.render();
	};

	render() {
		return <div id='keywords' />;
	}
}
