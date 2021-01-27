import React, {Component} from "react";
import "./LineChart.css";
import * as echarts from 'echarts';
import {InfectionsDaily} from "../Resource/InfectionsData";
import {StateName} from '../Resource/StateName';
import {PolicyData} from '../Resource/PolicyData';


class LineChart extends Component {

    constructor(props) {
        super(props);
        this.rewriteText = this.rewriteText.bind(this);
    }

    rewriteText(params){
        let date = document.getElementById("publishedDate");
        let infection = document.getElementById("currentInfection");
        let content = document.getElementById("policyContent");
        date.innerHTML="Release date: " + params.value[0];
        infection.innerHTML="Current infection: " + params.value[1];
        content.innerHTML=params.value[2];
    }

    textInit(){
        let date = document.getElementById("publishedDate");
        let infection = document.getElementById("currentInfection");
        let content = document.getElementById("policyContent");
        date.innerHTML='Click the "policy scatter point" <br/> in the line chart to view the corresponding policy';
        infection.innerHTML='';
        content.innerHTML='';

    }

    componentDidMount() {
        let lineChart = echarts.init(document.getElementById('linechart'));
        lineChart.setOption({
            tooltip: {
                trigger: 'axis',
                position: function (pt) {
                    return [pt[0], '10%'];
                },
                formatter: function (params) {
                    let textArr = [];
                    textArr.push('Infection:'+params[0].value);
                    for (let i = 1; i < params.length; i++) {
                        textArr.push(params[i].seriesName);
                    }
                    console.log(textArr);
                    return textArr.join('<br/>');
                },
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
                        color: '#F24141'
                    },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgb(255, 158, 68)'
                        }, {
                            offset: 1,
                            color: '#F24141'
                        }])
                    },
                    data: function () {
                        var list = [];
                        for (var i = 0; i < InfectionsDaily.length; i++) {
                            list.push(InfectionsDaily[i].sum_cases);
                        }
                        return list;
                    }(),
                    z: 1
                },
                {
                    name: 'policy',
                    type: 'effectScatter',
                    symbolSize: 12,
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
                    }(),
                    z:2,
                },

            ]
        });
        lineChart.on('click', {seriesName: 'policy'}, this.rewriteText);
        this.textInit();
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
        this.textInit();
    }


    render() {
        return (
            <div className="chartsArea">
                <div id="linechart"/>
                <div id="policyWindow">
                    <h1 id="policyTitle">Policies</h1>
                    <h2 id="publishedDate"/>
                    <h3 id="currentInfection"/>
                    <h4 id="policyContent"/>
                </div>
                
            </div>
        )
    }
}

export default LineChart;