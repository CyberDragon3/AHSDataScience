import * as d3 from 'd3';
import { useRef, useState, useEffect } from 'react';

const D3BarChart = () => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height: height || 300 });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    const data = [30, 80, 45, 60, 20];
    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;

    svg.attr('width', width).attr('height', height);

    svg.selectAll('rect').remove();

    if (!svg.select('defs').node()) {
      const defs = svg.append('defs');
      defs.append('pattern')
        .attr('id', 'dollar-pattern')
        .attr('width', 10)
        .attr('height', 10)
        .attr('patternUnits', 'userSpaceOnUse')
        .append('text')
        .attr('x', 0)
        .attr('y', 10)
        .attr('font-size', '10px')
        .attr('fill', '#00ff00')
        .text('$');
    }

    const xScale = d3.scaleBand()
      .domain(data.map((_, index) => index.toString()))
      .range([0, width])
      .padding(0.05); // Reduced padding for closer bars

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data) || 0])
      .range([0, height - 250]); // Reduced height range for smaller bars

    const bars = svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (_, index) => xScale(index.toString())! + (0.15 * xScale.bandwidth())) // Adjust x to center narrower bars
      .attr('y', height - 250) // Start bars higher
      .attr('width', 0.7 * xScale.bandwidth()) // Narrower bars (70% of default width)
      .attr('height', 0)
      .attr('fill', 'url(#dollar-pattern)')
      .style('stroke', '#0f0')
      .style('stroke-width', '2px');

    const animateBars = () => {
      const scrollProgress = Math.min(scrollY / 200, 1);
      bars.attr('y', (d: number) => height - 250 - yScale(d) * scrollProgress) // Move higher
        .attr('height', (d: number) => yScale(d) * scrollProgress);
    };

    animateBars();

    window.addEventListener('scroll', animateBars);
    return () => {
      window.removeEventListener('scroll', animateBars);
    };
  }, [scrollY, dimensions]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const { width, height } = dimensions;

    svg.selectAll('.animated-text').remove();

    const text = svg
      .append('text')
      .attr('class', 'animated-text')
      .attr('x', width / 2)
      .attr('y', height / 6) // Move text higher
      .attr('font-size', '50px') // Smaller font size to match bar scale
      .attr('text-anchor', 'middle')
      .attr('fill', 'gold')
      .html("Data is the new <tspan style='font-weight: bold; color: black'>oil</tspan>");

    setTimeout(() => {
      text.transition()
        .duration(1000)
        .style('opacity', 0)
        .on('end', () => {
          text.html('AHS Data Science Club');
          text.transition()
            .duration(1000)
            .style('opacity', 1);
        });
    }, 1000);
  }, [dimensions]);

  return (
    <div ref={containerRef} style={{ position: 'relative', height: '100vh', overflowY: 'hidden' }}>
      <svg ref={svgRef} />
    </div>
  );
};

export default D3BarChart;
