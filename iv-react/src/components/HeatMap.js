import React, {Component} from "react";
import * as echarts from "echarts";
import {InfectionsDaily} from "../Resource/InfectionsData";
import {StateName} from "../Resource/StateName";
import './HeatMap.css';

export class HeatMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            heatMap_2D: true
        }
        //this.setState = this.setState.bind(this);
        this.reDraw = this.reDraw.bind(this);
    }

    componentDidMount() {
        this.heatMap = echarts.init(document.getElementById('heatMap'));
        this.hmOption_2D = {
            title: {
                top: 30,
                left: 'center',
                text: 'Daily New Cases of each State'
            },
            tooltip: {
                title: "Weekly New Cases of each State ",
                position: 'top',
            },
            grid: {
                height: '70%',
                top: '15%',
                left: '15%',
                width: '80%'
            },
            xAxis: {
                type: 'category',
                data: function () {
                    let time = [];
                    for (let i = 0; i < InfectionsDaily.length; i++) {
                        time.push(InfectionsDaily[i].date);
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
                min: 10,
                max: 1000,
                calculable: true,
                orient: 'horizontal',
                left: 'center',
                bottom: '2%',
                itemWidth: '20%',
                itemHeight: '300%'

            },
            series: [{
                name: 'Daily New Cases',
                type: 'heatmap',
                data: function () {
                    let allWeek = [];
                    let start = 0;
                    for (let name in StateName) {
                        for (let i = 0; i < InfectionsDaily.length; i++) {
                            allWeek.push([i, start, InfectionsDaily[i][StateName[name]]]);
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
        };
        this.hmOption_3D = {
            title: {
                top: 30,
                left: 'center',
                text: 'Daily New Cases of each State'
            },
            grid: {
                top: '10%',
            },
            tooltip: {},
            visualMap: {
                min: 100,
                max: 5000,
                inRange: {
                    color: ['#F1E099', '#F24141']
                }
            },
            xAxis3D: {
                name: 'Time',
                nameGap: 30,
                type: 'category',
                data: function () {
                    let time = [];
                    for (let i = 0; i < InfectionsDaily.length; i++) {
                        time.push(InfectionsDaily[i].date.toString())
                    }
                    return time;
                }(),
            },
            yAxis3D: {
                name: 'States',
                nameGap: 30,
                type: 'category',
                data: function () {
                    let nameList = [];
                    for (let i in StateName) {
                        nameList.push(i.toString())
                    }
                    return nameList;
                }(),
                splitArea: {
                    show: true,
                    interval: 0
                },
            },
            zAxis3D: {
                name: 'Infections',
                nameGap: 30,
                type: 'value'
            },
            dataset: {
                dimensions: [
                    'Time',
                    'State',
                    'Infections'
                ]
            },
            //     source: function () {
            //         let allData = [];
            //         let start = 0;
            //         for (let name in StateName) {
            //             let shortName = StateName[name];
            //             for (let i = 0; i < InfectionsDaily.length; i++) {
            //                 allData.push([InfectionsDaily[i].date.toString(), name.toString(), Number(InfectionsDaily[i][shortName])]);
            //             }
            //             start += 1;
            //         }
            //         //alert(allData[0]);
            //         return allData;
            //     }(),
            // },
            grid3D: {
                boxWidth: 200,
                boxDepth: 150,
                viewControl: {
                    // projection: 'orthographic'
                },
                light: {
                    main: {
                        intensity: 1.2,
                        shadow: true
                    },
                    ambient: {
                        intensity: 0.3
                    }
                }
            },
            series: [{
                type: 'bar3D',
                name: 'Daily New Cases',
                data: function () {
                    let allData = [];
                    let start = 0;
                    for (let name in StateName) {
                        let shortName = StateName[name];
                        for (let i = 0; i < InfectionsDaily.length; i++) {
                            allData.push([i, start, Number(InfectionsDaily[i][shortName])]);
                        }
                        start += 1;
                    }
                    return allData;
                }(),
                shading: 'lambert',
                encode: {
                    x: 'Time',
                    y: 'States',
                    z: 'Infections',
                    //tooltip:[0,1,2]
                },
                label: {
                    fontSize: 16,
                    borderWidth: 1
                },
                emphasis: {
                    label: {
                        fontSize: 20,
                        color: '#900'
                    },
                    itemStyle: {
                        color: '#900'
                    }
                }
            }]
        };
        this.heatMap.setOption(this.state.heatMap_2D ? this.hmOption_2D : this.hmOption_3D);
    }

    componentDidUpdate() {
        this.heatMap.setOption(this.state.heatMap_2D ? this.hmOption_2D : this.hmOption_3D, {notMerge: true});
    }

    reDraw() {
        let current = this.state.heatMap_2D;
        let buttonText = document.getElementById('text');
        buttonText.innerText = this.state.heatMap_2D ? '2D' : '3D';
        this.setState({heatMap_2D: !current});


    }

    render() {
        // for (let name in StateName){
        //     alert(name);
        //     break;
        // }
        return (
            <div className='heatMapArea'>
                <button id='changeButton' onClick={this.reDraw} ><span id='text'>3D</span></button>
                <div id='heatMap'/>
            </div>
        )

    }


}