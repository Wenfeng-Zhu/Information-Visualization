import React, {Component} from "react";
import './Charts.css'
import * as echarts from 'echarts';
import {InfectionsDaily} from "../Resource/InfectionsData";
import {StateName} from '../Resource/StateName'

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
                        textArr.push(params[i].seriesName + ' : '+params[i].value);
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

        let heatMap = echarts.init(document.getElementById('heatMap'));
        heatMap.setOption({
            title: {
                top: 30,
                left: 'start',
                text: 'Weekly New Cases of each State'
            },
            tooltip: {
                title: "Weekly New Cases of each State ",
                position: 'top',
            },
            grid: {
                height: '55%',
                top: '20%',
                left: '20%'
            },
            xAxis: {
                type: 'category',
                data: function () {
                    let time = [];
                    time.push('week-1');
                    for (let i = 1; i < InfectionsDaily.length + 1; i++) {
                        if ((i % 7) === 0) {
                            time.push('week-' + (i / 7));
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
                        nameList.push(i.toString())
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
                itemWidth: '20%',
                itemHeight: '300%'

            },
            series: [{
                name: 'Weekly New Cases',
                type: 'heatmap',
                data: function () {
                    let allWeek = [];
                    let weekNum = 0;
                    let start = 0;
                    for (let name in StateName) {
                        for (let i = 1; i < InfectionsDaily.length; i++) {
                            weekNum += Number(InfectionsDaily[i - 1][StateName[name]]);
                            if ((i % 7) === 0) {
                                allWeek.push([((i / 7) - 1), start, weekNum]);
                                weekNum = 0;
                            }
                        }
                        start += 1;
                    }
                    return allWeek;
                }(),
                label: {
                    show: false
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#E1B753',
                        borderWidth: 0.1
                    }
                }
            }]
        });

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
            for (var i = 0; i < InfectionsDaily.length; i++) {
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