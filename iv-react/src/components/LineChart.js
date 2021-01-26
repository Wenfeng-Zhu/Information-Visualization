import React, {Component} from "react";
import * as echarts from 'echarts';
import {InfectionsDaily} from "../Resource/InfectionsData";
import {StateName} from '../Resource/StateName'


class LineChart extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let lineChart = echarts.init(document.getElementById('histogram'));
        lineChart.setOption({
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {}
            }]
        });
    }


    render() {
        return (
            <div className="chartsArea">
                <div id="histogram"/>
            </div>
        )
    }
}

export default LineChart;