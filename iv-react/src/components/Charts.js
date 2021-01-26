import React, {Component} from "react";
import './Charts.css'
import * as echarts from 'echarts';
import {InfectionsDaily} from "../Resource/InfectionsData";
import {DeathData} from "../Resource/DeathData";
import {StateName} from '../Resource/StateName'
import {RecoverData} from "../Resource/RecoverData";
import 'echarts-gl';

class Charts extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {

        let infectionChart = echarts.init(document.getElementById('histogram'));
        infectionChart.setOption({
            title: {
                text: 'Infection Situation of Germany',
                top: 20,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    let textArr = [];
                    textArr.push(params[0].name);
                    for (let i = 0; i < params.length; i++) {
                        textArr.push(params[i].seriesName + ' : ' + params[i].value);
                    }
                    return textArr.join('<br/>');
                }
            },
            legend: {
                top: 20,
                right: 40,
                data: ['Total', 'New Case']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                top: '25%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                splitLine: {show: false},
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
            dataZoom: [
                {
                    show: true,
                    start: 10,
                    end: 20,
                    fillerColor: '#F2F0EB',
                    borderColor: '#5196A6',
                    bottom: '2%'
                },
                {
                    type: 'inside',
                    start: 1,
                    end: 100,

                }
            ],
            series: [
                {
                    name: 'Total',
                    type: 'bar',
                    stack: 'all',
                    itemStyle: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: '#EB5952'
                    },
                    emphasis: {
                        itemStyle: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: '#F2955E'
                        }
                    },
                    data: function () {
                        let list = [];
                        let sum = 0;
                        for (var i = 0; i < InfectionsDaily.length; i++) {
                            sum += Number(InfectionsDaily[i].sum_cases);
                            list.push(sum);

                        }
                        return list;
                    }()
                },
                {
                    name: 'New Case',
                    type: 'bar',
                    stack: 'all',
                    label: {
                        show: false,
                        position: 'top'
                    },
                    itemStyle: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: '#5196A6'
                    },
                    data: function () {
                        var list = [];
                        for (var i = 0; i < InfectionsDaily.length; i++) {
                            list.push(Number(InfectionsDaily[i].sum_cases));
                        }
                        return list;
                    }()
                },
            ]
        });
        let deathChart = echarts.init(document.getElementById('histogram-1'));
        deathChart.setOption({
            title: {
                text: 'Recover and Death of Germany',
                top: 20,
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    let textArr = [];
                    textArr.push(params[0].name);
                    for (let i = 0; i < params.length; i++) {
                        textArr.push(params[i].seriesName + ' : ' + Math.abs(params[i].value));
                    }
                    return textArr.join('<br/>');
                }
            },
            legend: {
                top: 20,
                right: 40,
                data: ['Recover', 'Death']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '10%',
                top: '25%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                splitLine: {show: false},
                data: function () {
                    var list = [];
                    for (var i = 0; i < DeathData.length; i++) {
                        list.push(DeathData[i].date);
                    }
                    return list;
                }()
            },
            yAxis: {
                type: 'value'
            },
            dataZoom: [
                {
                    show: true,
                    start: 10,
                    end: 20,
                    fillerColor: '#F2F0EB',
                    borderColor: '#5196A6',
                    bottom: '2%'
                },
                {
                    type: 'inside',
                    start: 1,
                    end: 100,

                }
            ],
            series: [
                {
                    name: 'Recover',
                    type: 'bar',
                    stack: 'all',
                    itemStyle: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: '#9CC1D9'
                    },
                    emphasis: {
                        itemStyle: {
                            barBorderColor: 'rgba(0,0,0,0)',
                            color: '#9AD99E'
                        }
                    },
                    data: function () {
                        let list = [];
                        let sum = 0;
                        for (let i = 0; i < RecoverData.length; i++) {
                            //sum += Number(RecoverData[i].recovers);
                            list.push(Number(RecoverData[i].recovers));
                        }
                        return list;
                    }()
                },
                {
                    name: 'Death',
                    type: 'bar',
                    stack: 'all',
                    label: {
                        show: false,
                        position: 'top'
                    },
                    itemStyle: {
                        barBorderColor: 'rgba(0,0,0,0)',
                        color: '#8C2727'
                    },
                    data: function () {
                        var list = [];
                        for (let i = 0; i < DeathData.length; i++) {
                            list.push(-Number(DeathData[i].sum_cases));
                        }
                        return list;
                    }()
                },
            ]
        });


    }

    redrawHeatMap(){
        //alert('before'+this.heatMap_2D);
        this.heatMap_2D = !this.heatMap_2D;
        alert('after'+this.heatMap_2D);
    }

    componentDidUpdate() {
        let stateName = (this.props.focusState === null) ? 'sum_cases' : StateName[this.props.focusState.properties.name];
        let infectionChart = echarts.init(document.getElementById('histogram'));
        let option = infectionChart.getOption();
        option.series[0].data = function () {
            let list = [];
            let sum = 0;
            for (let i = 0; i < InfectionsDaily.length; i++) {
                sum += Number(InfectionsDaily[i][stateName]);
                list.push(sum);
            }
            return list;
        }();
        option.series[1].data = function () {
            let list = [];
            for (let i = 0; i < InfectionsDaily.length; i++) {
                list.push(Number(InfectionsDaily[i][stateName]));
            }
            return list;
        }();
        //update the date of chart
        infectionChart.setOption(option);
        //update the title of chart
        infectionChart.setOption({
                title: {
                    text: (stateName === 'sum_cases') ? 'Data of Germany' : ('Data of ' + this.props.focusState.properties.name),
                    top: 20
                }
            }
        )
        // let heatMap = echarts.init(document.getElementById('heatMap'));
        // heatMap.setOption(this.heatMap_2D?this.hmOption_2D:this.hmOption_3D);




    }

    render() {
        return (
            <div className="chartsArea">
                <div id="histogram"/>
                <div id='histogram-1'/>


            </div>
        )
    }
}

export default Charts;