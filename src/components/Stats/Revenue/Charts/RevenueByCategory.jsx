import React, { Component } from 'react';
import { Pie, measureTextWidth } from '@antv/g2plot';
import { revenueByCategory } from 'Config/revenue-stats';

export default class RevenueByCategory extends Component {
	componentDidMount() {
		this.renderChart();
	}

	renderChart = () => {
		function renderStatistic(containerWidth, text, style) {
			const { width: textWidth, height: textHeight } = measureTextWidth(
				text,
				style
			);
			const R = containerWidth / 2;
			// r^2 = (w / 2)^2 + (h - offsetY)^2
			let scale = 1;
			if (containerWidth < textWidth) {
				scale = Math.min(
					Math.sqrt(
						Math.abs(
							Math.pow(R, 2) /
								(Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2))
						)
					),
					1
				);
			}
			const textStyleStr = `width:${containerWidth}px;`;
			return `<div style="${textStyleStr};font-size:${scale}em;line-height:${
				scale < 1 ? 1 : 'inherit'
			};">${text}</div>`;
		}

		const piePlot = new Pie('revenue-by-category', {
			appendPadding: 10,
			data: revenueByCategory,
			angleField: 'value',
			colorField: 'type',
			radius: 1,
			height: 300,
			innerRadius: 0.64,
			meta: {
				value: {
					formatter: v => `$ ${v.toLocaleString()}`,
				},
			},
			label: {
				type: 'inner',
				offset: '-50%',
				style: {
					textAlign: 'center',
				},
				autoRotate: false,
				// content: '{value}',
				formatter: item => item.value.toLocaleString(),
			},
			statistic: {
				title: {
					offsetY: -4,
					customHtml: (container, view, datum) => {
						const { width, height } = container.getBoundingClientRect();
						const d = Math.sqrt(
							Math.pow(width / 2, 2) + Math.pow(height / 2, 2)
						);
						const text = datum ? datum.type : 'Total';
						return renderStatistic(d, text, { fontSize: 28 });
					},
				},
				content: {
					offsetY: 4,
					style: {
						fontSize: '32px',
					},
					customHtml: (container, view, datum, data) => {
						const { width } = container.getBoundingClientRect();

						const text = datum
							? `$ ${datum.value}`
							: `$ ${data.reduce((r, d) => r + d.value, 0).toLocaleString()}`;
						return renderStatistic(width, text, { fontSize: 32 });
					},
				},
			},
			// 添加 中心统计文本 交互
			interactions: [
				{ type: 'element-selected' },
				{ type: 'element-active' },
				{ type: 'pie-statistic-active' },
			],
		});

		piePlot.render();
	};

	render() {
		return <div id='revenue-by-category'></div>;
	}
}
