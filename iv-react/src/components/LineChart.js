import React, {Component} from "react";
import "./LineChart.css";
import * as echarts from 'echarts';
import {InfectionsDaily} from "../Resource/InfectionsData";
import {StateName} from '../Resource/StateName';
import {PolicyData} from '../Resource/PolicyData';


class LineChart extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let lineChart = echarts.init(document.getElementById('linechart'));



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
                },
                {
                    name: 'policy',
                    type: 'scatter',
                    symbolSize: 15,
                    data: function(){
                        var list = [];
                        for (var i = 0; i < PolicyData[0].DE.length; i++) {
                            for(var n = 0; n < InfectionsDaily.length; n++){
                                if(InfectionsDaily[n].date == PolicyData[0].DE[i].Date){
                                    var datepolicy = [];
                                    datepolicy.push(PolicyData[0].DE[i].Date);
                                    datepolicy.push(InfectionsDaily[n].sum_cases);
                                    datepolicy.push(PolicyData[0].DE[i].Policy);
                                    list.push(datepolicy);
                                }
                            }
                        }
                        return list;
                    }()
                },
            ]
        });

        lineChart.on('mouseover', {seriesName: 'policy'}, function(params){

            var content = document.getElementById("policyContent")
            content.innerHTML=params.value;
        });
    }

    componentDidUpdate(){
        let stateName = (this.props.focusState === null) ? 'sum_cases' : StateName[this.props.focusState.properties.name];
        const policystateName = (this.props.focusState === null) ? 'DE' : StateName[this.props.focusState.properties.name];
        let lineChart = echarts.init(document.getElementById('linechart'));
        let option = lineChart.getOption();
        option.series[0].data = function () {
            let list = [];
            for (let i = 0; i < InfectionsDaily.length; i++) {
                list.push(Number(InfectionsDaily[i][stateName]));
            }
            return list;
        }();
        option.series[1].data = function(){
            let list = [];
            for (var i = 0; i < PolicyData[0][policystateName].length; i++) {
                for(var n = 0; n < InfectionsDaily.length; n++){
                    if(InfectionsDaily[n].date == PolicyData[0][policystateName][i].Date){
                        var datepolicy = [];
                        datepolicy.push(PolicyData[0][policystateName][i].Date);
                        datepolicy.push(InfectionsDaily[n][stateName]);
                        datepolicy.push(PolicyData[0][policystateName][i].Policy);
                        list.push(datepolicy);
                    }
                }
            }
            return list;
        }();
        lineChart.setOption(option);
        lineChart.setOption({
            title: {
                text: (stateName === 'sum_cases') ? 'The relationship between infection and policy - Germany' : ('The relationship between infection and policy - ' + this.props.focusState.properties.name),
                top: 20
            }
        });
    }


    render() {
        return (
            <div className="chartsArea">
                <div id="linechart"/>
                <div id="policyWindow">
                    <h1 id="policyTitle">Policies</h1>
                    <h2 id="policyContent"/>
                </div>
                
            </div>
        )
    }
}

export default LineChart;