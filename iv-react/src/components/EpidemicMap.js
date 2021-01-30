import React, {Component, useState} from "react";
import './EpidemicMap.css'
import * as d3 from 'd3';
import {MapData} from "./MapData";
import {GeoData} from "./MapData";

class EpidemicMap extends Component {
    constructor(props) {
        super(props);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.preState = null;
    }

    handleStateChange(e, target) {
        this.props.onFocusStateChange(e, target);
    }

    componentDidMount() {
        let data = MapData;
        let width = GeoData.width;
        let height = GeoData.height;
        const g = d3.select('.allStates');

        g.selectAll("text").remove();

        let bounds = d3.geoBounds(MapData);
        let bottomLeft = bounds[0];
        let topRight = bounds[1];
        let rotLong = -(topRight[0] + bottomLeft[0]) / 2;
        let center = [(topRight[0] + bottomLeft[0]) / 2 + rotLong, (topRight[1] + bottomLeft[1]) / 2];
        //default scale projection
        let projection = d3.geoAlbers()
            .parallels([bottomLeft[1], topRight[1]])
            .rotate([rotLong, 0, 0])
            .translate([width / 2, height / 2])
            .center(center);
        let bottomLeftPx = projection(bottomLeft);
        let topRightPx = projection(topRight);
        let scaleFactor = 1.00 * Math.min(width / (topRightPx[0] - bottomLeftPx[0]), height / (-topRightPx[1] + bottomLeftPx[1]));

        projection = d3.geoAlbers()
            .parallels([bottomLeft[1], topRight[1]])
            .rotate([rotLong, 0, 0])
            .translate([width / 2, height / 2])
            .scale(scaleFactor * 0.975 * 1000)
            .center(center);

        this.geoPath = d3.geoPath().projection(projection);
        let geoPath = this.geoPath;
        let graticule = d3.geoGraticule()
            .step([1, 1]);

        // g.append("path")
        //     .datum(graticule)
        //     .attr("class", "graticuleLine")
        //     .attr("d", geoPath);

        let beginColor = d3.rgb(241, 224, 153);
        let endColor = d3.rgb(242, 65, 65);
        let linear = d3.scaleLinear()
            .domain([5500, 280000])
            .range([0, 1]);
        let compute = d3.interpolateRgb(beginColor, endColor);
        let caseNumbers = [159013, 222360, 68508, 21123, 10499, 25775, 92825, 6446,
            170904, 276697, 47140, 13212, 13826, 63535, 15082, 19463];

        g.selectAll("path.feature")
            .data(data.features)
            .enter()
            .append("path")
            .attr("class", "feature")
            .attr("d", geoPath)
            .attr('fill', function (d, i) {
                return compute(linear(caseNumbers[i]));
            })
            .on("click", this.handleStateChange)
            .on("mouseover",function(d,i){   
                d3.select(this)
                    .attr("fill-opacity", "60%")
               
            })
            .on("mouseout",function(d,i){
                d3.select(this)
                .attr("fill-opacity", "100%")
            });


    }

    componentDidUpdate() {
        if ((this.props.focusState === null) || !(this.preState === this.props.focusState)) {
            this.preState = this.props.focusState;
            let focusState = this.props.focusState;
            let width = GeoData.width;
            let height = GeoData.height;
            let x = width / 2,
                y = height / 2,
                k = 1;
            const g = d3.select('.allStates');
            if (focusState != null) {
                //alert('state change get')
                let centroid = this.geoPath.centroid(focusState);
                x = +centroid[0];
                y = +centroid[1];
                k = 1.75;
                //let name = (this.props.focusState === null) ? '' : focusState.properties.name;
                //alert(name)
                // g.append("text")
                //     .text(name)
                //     .attr("x", x)
                //     .attr("y", y)
                //     .style("text-anchor", "middle")
                //     .style("font-size", "8px")
                //     .style("stroke-width", "0px")
                //     .style("fill", "rgb(255, 200, 255)")
                //     .style("font-family", "Times New Roman")
                // .on('click',this.handleStateChange(null,null))

            } else {
                //do nothing
            }
            g.selectAll("path")
                .classed("active", focusState && function (d) {
                    return d === focusState;
                });

            g.transition()
                .duration(500)
                .attr("transform", "translate(" + (width / 2) + "," + (height / 2) + ")scale(" + k + ")translate(" + (-x) + "," + (-y) + ")")
                .style("stroke-width", 1.75 / k + "px");
        } else {
            this.handleStateChange(null, null);
        }
    }

    render() {
        return (
            <svg className='displayWindow'>
                <g className='allStates'>
                </g>
            </svg>
        )
    }
}


export default EpidemicMap;