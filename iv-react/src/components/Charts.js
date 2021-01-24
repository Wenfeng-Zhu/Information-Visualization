import React, {Component, useState} from "react";
import './Charts.css'
import * as d3 from 'd3';
import {MapData} from "./MapData";
import * as echarts from 'echarts';
import {InfectionsDaily} from "../Resource/InfectionsData";
import {StateName} from '../Resource/StateName'

class Charts extends Component {

    componentDidMount() {
        let infectionChart = echarts.init(document.getElementById('histogram'));
        infectionChart.setOption({
            title: {
                text: 'Infection',
                // subtext: 'From ExcelHome',
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (params) {
                    // let infection = params[1];
                    // let sum = params[0];

                    return params[0].name + '<br/>' + params[0].seriesName + ' : ' + params[0].value
                        + '<br/>' + params[1].seriesName + ' : ' + params[1].value;
                }
            },
            legend: {
                data: ['Total', 'New Case']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
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

        let calendarChart = echarts.init(document.getElementById('heatMap'));
        let time = [];
        time.push('week-1');
        let allWeek = [];
        let weekNum = 0;
        let start = 0;
        for (let name in StateName){
            for (let i = 1; i < InfectionsDaily.length; i++){
                weekNum += Number(InfectionsDaily[i-1][StateName[name]]);
                if ((i % 7)=== 0) {
                    allWeek.push([((i/7)-1),start,weekNum]);
                    weekNum = 0;
                }

            }
            start+=1;
        }

        calendarChart.setOption(
            {
                title: {
                    top: 30,
                    left: 'start',
                    text: 'Weekly New Cases of each State'
                },
                tooltip: {
                    position: 'top'
                },
                grid: {
                    height: '55%',
                    top: '20%',
                    left:'20%'
                },
                xAxis: {
                    type: 'category',
                    data: function (){
                        for (let i = 1; i < InfectionsDaily.length+1; i++){
                            if ((i % 7)=== 0) {
                                time.push('week-'+(i/7));
                            }
                        }
                        return time;
                    }(),
                    splitArea: {
                        show: true
                    }
                },
                yAxis: {
                    type: 'category',
                    data: function () {
                        let nameList = [];
                        for (let i in StateName) {
                            nameList.push(i)
                        }
                        return nameList;
                    }(),
                    splitArea: {
                        show: true
                    }
                },
                visualMap: {

                    min: 100,
                    max: 5000,
                    calculable: true,
                    orient: 'horizontal',
                    left: 'center',
                    bottom: '5%',
                    itemWidth:'20%',
                    itemHeight:'300%'

                },
                series: [{
                    name: 'Weekly New Cases',
                    type: 'heatmap',
                    data: allWeek,
                    label: {
                        show: false
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    itemStyle:{
                        normal:{
                            borderColor: '#E1B753',
                            borderWidth:0.1
                        }
                    }
                }]
            }
        );

    }

    render() {
        return (
            <div className="chartsArea">
                <div id="histogram" style={{}}/>
                <div id="heatMap" style={{}}/>
            </div>
        )
    }
}

export default Charts;