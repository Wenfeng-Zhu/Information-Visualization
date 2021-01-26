import React, {Component} from "react";
import * as echarts from 'echarts';
import {InfectionsDaily} from "../Resource/InfectionsData";
import {StateName} from '../Resource/StateName';


class LineChart extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let lineChart = echarts.init(document.getElementById('histogram'));

        lineChart.setOption({
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                }
            },
            title: {
                left: 'center',
                text: 'The relationship between infection and policy',
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: function () {
                    var list = [];
                    for (var i = 0; i < InfectionsDaily.length; i++) {
                        list.push(InfectionsDaily[i].date);
                    }
                    return list;
                }()
            },
            yAxis: {
                type: 'value'
            },
            dataZoom: [{
                type: 'inside',
                start: 0,
                end: 10
            }, {
                start: 0,
                end: 10
            }],
            series: [
                {
                    name: 'Infection',
                    type: 'line',
                    symbol: 'none',
                    sampling: 'lttb',
                    itemStyle: {
                        color: 'rgb(255, 70, 131)'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        }, {
                            offset: 1,
                            color: 'rgb(255, 70, 131)'
                        }])
                    },
                    data: function () {
                        var list = [];
                        for (var i = 0; i < InfectionsDaily.length; i++) {
                            list.push(InfectionsDaily[i].sum_cases);
                        }
                        return list;
                    }()
                }
            ]
        });
    }

    componentDidUpdate(){
        let stateName = (this.props.focusState === null) ? 'sum_cases' : StateName[this.props.focusState.properties.name];
        let lineChart = echarts.init(document.getElementById('histogram'));
        let option = lineChart.getOption();
        option.series[0].data = function () {
            let list = [];
            for (let i = 0; i < InfectionsDaily.length; i++) {
                list.push(Number(InfectionsDaily[i][stateName]));
            }
            return list;
        }();
        lineChart.setOption(option);
        lineChart.setOption({
            title: {
                text: (stateName === 'sum_cases') ? 'The relationship between infection and policy - Germany' : ('The relationship between infection and policy - ' + this.props.focusState.properties.name),
                top: 20
            }
        }
    )
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