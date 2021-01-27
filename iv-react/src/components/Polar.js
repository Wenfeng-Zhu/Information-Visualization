import React, {Component} from "react";
import './Polar.css'
import * as d3 from 'd3';
import {DataOfStates} from "../Resource/BasicDataOfStates";

class Polar extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            selectedMonth: "May"
        }
    }

    handleClick(event) {
        this.setState({selectedMonth: event.target.value});
    }

    componentDidMount() {
        this.drawChart()
    }

    componentDidUpdate() {
        d3.select(".diagramm").select('svg').remove();
        this.drawChart();
    }
      
    drawChart() {
        const month = this.state.selectedMonth;
        const typeChart = this.props.typeChart;
        const data = getDateOfStates();
        const width = 800;
        const height = 900;
        const innerRadius = 5;
        const outerRadius = 400;
        const chartColor = 'rgba(7, 92, 214, .7)';
        const gridLineColor = 'rgb(210, 214, 218)';

        const svg = d3.select('.diagramm')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`)
        
        const zoom = d3.zoom()
            .on('zoom', (event) => {
            svg.attr('transform', event.transform);
        })
        .scaleExtent([0.5, 4]);

        var radiusScale;

        if (month === "May" || month === "June" || month === "July" || month === "August" || month === "September") {
            radiusScale = d3.scaleLinear()
                        .domain([0,19])
            .range([0, outerRadius - 10])
        }
        else if (month === "October" || month === "November" || month === "December") {
            radiusScale = d3.scaleLinear()
                        .domain([0,380])
            .range([0, outerRadius - 10])
        }

        // Prototype or circle generation via the arc function
        const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .padAngle(Math.PI /100) 

        var toolTip;
        if (typeChart === "gdpChart") {
            svg.append("text")
            .attr("x", 0)             
            .attr("y", -height / 2 * 0.95)
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            .text("The relationship between the epidemic and GRP per capita");

            // set tooltip
            toolTip = d3.select('#dropdownBox')
                .append('div')
                .attr('class', 'tooltip')
            toolTip.html(
                `
                    <div class="state">
                        <span>State:</span>
                        <span class="value"></span>
                    </div>
                    <div class="type">
                        <span>GRP per capita:</span>
                        <span class="value"></span>
                    </div>
                    <div class="SevenDaysIncidence">
                        <span>7-Days-Incidence:</span>
                        <span class="incidence"></span>
                    </div>
                `
            )
        }
        else if (typeChart === 'populationChart') {
            svg.append("text")
            .attr("x", 0)             
            .attr("y", -height / 2 * 0.95)
            .attr("text-anchor", "middle")  
            .style("font-size", "16px") 
            .style("text-decoration", "underline")  
            .text("The relationship between the epidemic and population density");
            
            // set tooltip
            toolTip = d3.select('#dropdownBox')
                .append('div')
                .attr('class', 'tooltip')
            toolTip.html(
                `
                    <div class="state">
                        <span>State:</span>
                        <span class="value"></span>
                    </div>
                    <div class="type">
                        <span>popultation density:</span>
                        <span class="value"></span>
                    </div>
                    <div class="SevenDaysIncidence">
                        <span>7-Days-Incidence:</span>
                        <span class="incidence"></span>
                    </div>
                `
            )
        }

        drawGrid();
        drawDetail();
        svg.call(d3.zoom().scaleExtent([0.5, 4]).on("zoom", function (event) {
            svg.attr("transform", 'translate(400, 400) scale('+ event.transform.k+','+ event.transform.k+')')
        }))

        function drawGrid() {
            const gridWrapper = svg
            .append('g')
            .attr('class', 'grid-wrapper')
            .attr('fill', 'transparent')
            .attr('stroke', gridLineColor)
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', '5,5')
            .attr('text-anchor', 'end')
            .attr('dominant-baseline', 'end')
            .style('font-size', 12)
            .style('font-weight', 300)
            
            var maxIncidence;
            if (month === "May" || month === "June" || month === "July" || month === "August" || month === "September") {
                maxIncidence = 19 * outerRadius / ( outerRadius - 10 )
            }
            else if (month === "October" || month === "November" || month === "December") {
                maxIncidence = 380 * outerRadius / ( outerRadius - 10 )
            }
            for (let i = 1; i <= 6; i++) {
                var n = maxIncidence / 6 * i
                n = n.toFixed(1);
                gridWrapper.append('circle')
                    .attr('r', outerRadius / 6 * i)
                gridWrapper.append('text')
                    .text(n)
                    .style("color", "red")
                    .attr('transform', `translate(0, ${ -outerRadius / 6 * i })`)
            }
            const bandWidth = 2 * Math.PI / data.length
            for (let i = 0; i < data.length; i++) {
                const x = outerRadius * Math.sin( bandWidth * i + bandWidth / 10)
                const y = outerRadius * Math.cos( bandWidth * i + bandWidth / 10)
                gridWrapper.append('line')
                    .attr('x2',  x)
                    .attr('y2',  y)
            }
        }

        function drawDetail() {
            // 饼图数据
            var pieData
            if (typeChart === "gdpChart") 
                pieData = d3.pie().value(d => d.grp)(data)
            else 
                pieData = d3.pie().value(d => d.populationDensityPerSqKm)(data)

            var arcs = svg
                .append('g')
                .attr('class', 'arcs')
                .selectAll('g')
                .data(pieData)
                .enter()
                .append('path')
                .attr('class', 'arc')
                .attr('fill', chartColor)
                .attr('d', function (d) {
                    // 动态设定外半径
                    arc.outerRadius(radiusScale(parseFloat(d.data.SevenDaysIncidence[month])))
                    // 注册path data
                    return arc(d)
                })
                .on('mouseover', function (d, i) {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('opacity', '.85')

                    toolTip.style('opacity', 1)
                    toolTip.select('.state .value').text(i.data.state)
                    if (typeChart === "gdpChart") 
                        toolTip.select('.type .value').text(i.data.grp + '€')
                    else if (typeChart === "populationChart")
                        toolTip.select('.type .value').text(i.data.populationDensityPerSqKm + ' per Sqkm')
                        
                    toolTip.select('.SevenDaysIncidence .incidence').text(i.data.SevenDaysIncidence[month])
                })
                .on('mouseout', function (d, i) {
                    d3.select(this).transition()
                        .duration('50')
                        .attr('opacity', '1');
                    toolTip.style('opacity', 0)
                })
        }

        // get data of each state
        function getDateOfStates() {
            var data = [];
            for (var i in DataOfStates) {
                data.push({
                state: DataOfStates[i].State,
                grp: DataOfStates[i].GRPinEuro,
                SevenDaysIncidence: DataOfStates[i].SevenDaysIncidence,
                populationDensityPerSqKm: DataOfStates[i].populationDensityPerSqKm
                })
            }

            data.sort((a, b) => b.GRP - a.GRP)
            return data
        }
    }  
          
    render(){
      return (
            <div id="radial-bar-chart">
                <div id = "dropdownBox">
                    <select id = "month" onChange={this.handleClick.bind(this)} value={this.state.selectedMonth}>
                        <option value ="May">May</option>
                        <option value ="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value ="September">September</option>
                        <option value ="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </div>
                <div className="diagramm">
                </div>
             
            </div>
        )
    }
  }
      
  export default Polar;