import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { HeatmapData } from '../../types/grantsHub';

interface ChartHeatmapProps {
  data: HeatmapData[];
}

const ChartHeatmap: React.FC<ChartHeatmapProps> = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current || data.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const margin = { top: 30, right: 30, bottom: 60, left: 120 };
    const width = 600 - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const g = svg
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Color scale
    const colorScale = d3
      .scaleLinear<string>()
      .domain([0, 50, 100])
      .range(['#f44336', '#ff9800', '#4caf50']);

    // Y scale
    const yScale = d3
      .scaleBand()
      .domain(data.map(d => d.category))
      .range([0, height])
      .padding(0.1);

    // Cell width
    const cellWidth = width;
    const cellHeight = yScale.bandwidth();

    // Draw cells
    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', d => yScale(d.category) || 0)
      .attr('width', cellWidth)
      .attr('height', cellHeight)
      .attr('fill', d => colorScale(d.success_rate))
      .attr('rx', 4)
      .attr('ry', 4)
      .style('cursor', 'pointer')
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 0.8);

        // Show tooltip
        const tooltip = d3.select('body')
          .append('div')
          .attr('class', 'heatmap-tooltip')
          .style('position', 'absolute')
          .style('background-color', '#1e293b')
          .style('border', '1px solid #334155')
          .style('border-radius', '8px')
          .style('padding', '10px')
          .style('color', '#f1f5f9')
          .style('font-size', '12px')
          .style('pointer-events', 'none')
          .style('z-index', '1000')
          .html(`
            <strong style="color: #9cf7ff;">${d.category}</strong><br/>
            Success Rate: <strong>${d.success_rate}%</strong><br/>
            Liczba dotacji: <strong>${d.count}</strong>
          `)
          .style('left', `${event.pageX + 10}px`)
          .style('top', `${event.pageY - 10}px`);
      })
      .on('mouseout', function () {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('opacity', 1);

        d3.selectAll('.heatmap-tooltip').remove();
      });

    // Add text labels
    g.selectAll('text.cell-label')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'cell-label')
      .attr('x', cellWidth / 2)
      .attr('y', d => (yScale(d.category) || 0) + cellHeight / 2)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('fill', '#f1f5f9')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none')
      .text(d => `${d.success_rate}%`);

    // Y axis
    const yAxis = d3.axisLeft(yScale);
    g.append('g')
      .call(yAxis)
      .style('color', '#94a3b8')
      .style('font-size', '12px');

    // Title
    g.append('text')
      .attr('x', cellWidth / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('fill', '#f1f5f9')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .text('Wskaźnik sukcesu wg kategorii');

  }, [data]);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default ChartHeatmap;
