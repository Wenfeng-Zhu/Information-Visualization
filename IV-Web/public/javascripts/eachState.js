// let promise = fetch('http://localhost:3000/data/total-cases-by-state');

function loadCalendar(name) {
    const shortname = mapTable[name.toString()];
    const calenderChart = echarts.init(document.getElementById('eachState'));
    const date = +echarts.number.parseDate(2020 + '-03-02');
    const end = +echarts.number.parseDate(2020 + '-12-01');
    const dayTime = 3600 * 24 * 1000;
    const data = [];
    const policy_date = [];
    fetch('http://localhost:9000/data/infections-by-state-daily').then(jsonResponse => {
        jsonResponse.json().then(result_1 => {

            fetch('http://localhost:9000/data/policy').then(jsonResponse => {
                jsonResponse.json().then(result_2 =>{
                    for (let element of result_2.policy[0][shortname.toString()]){
                        policy_date.push(echarts.format.formatTime('yyyy-MM-dd', element.Date));
                    }

                    let i = 0;
                    let j = 0;
                    for (let time = date; time < end; time += dayTime) {
                        let time_format = echarts.format.formatTime('yyyy-MM-dd', time);
                        let policy = null;
                        if(policy_date.includes(time_format)){
                            policy = result_2.policy[0][shortname.toString()][policy_date.indexOf(time_format)].Policy.toString();
                            //alert(policy);
                        }
                        data.push([
                            time_format,
                            result_1.dailyState[i][shortname.toString()],
                            policy
                        ]);

                        i++;
                    }




                    //alert('test'+result_2.policy[0]['DE'][0].Date)
                    // for (let time = date;time<end;time+=dayTime){
                    //     if (result.policy[1]){
                    //
                    //     }
                    // }

                    option = {
                        backgroundColor: '#404a59',

                        title: {
                            top: 30,
                            text: 'Confirmed status in ' + name,
                            left: 'center',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        tooltip: {
                            trigger: 'item',
                            formatter(params) {
                                return params.name + params.value;
                            }

                        },
                        legend: {
                            top: '30',
                            left: '70',
                            data: ['confirm', 'Top 10', 'Policy'],
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        calendar: [
                            {
                                top: '15%',
                                left: 'center',
                                range: ['2020-03-02', '2020-06-30'],
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#000',
                                        width: 4,
                                        type: 'solid'
                                    }
                                },
                                yearLabel: {
                                    formatter: '{start}  1st',
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                itemStyle: {
                                    color: '#323c48',
                                    borderWidth: 1,
                                    borderColor: '#111'
                                },
                                width: '70%',
                                height: '35%',
                                orient: 'horizontal'
                            },
                            {
                                top: '60%',
                                left: 'center',
                                range: ['2020-07-01', '2020-11-30'],
                                splitLine: {
                                    show: true,
                                    lineStyle: {
                                        color: '#000',
                                        width: 4,
                                        type: 'solid'
                                    }
                                },
                                yearLabel: {
                                    formatter: '{start}  2nd',
                                    textStyle: {
                                        color: '#fff'
                                    }
                                },
                                itemStyle: {
                                    color: '#323c48',
                                    borderWidth: 1,
                                    borderColor: '#111'
                                },
                                width: '80%',
                                height: '35%',
                                orient: 'horizontal'
                            }],
                        series: [

                            {
                                name: 'confirm',
                                type: 'scatter',
                                coordinateSystem: 'calendar',
                                data: data,
                                symbolSize: function (val) {
                                    return val[1] / 150;
                                },
                                itemStyle: {
                                    color: '#ddb926'
                                }
                            },
                            {
                                name: 'confirm',
                                type: 'scatter',
                                coordinateSystem: 'calendar',
                                calendarIndex: 1,
                                data: data,
                                symbolSize: function (val) {
                                    return val[1] / 150;
                                },
                                itemStyle: {
                                    color: '#ddb926'
                                }
                            },
                            {
                                name: 'Top 10',
                                type: 'effectScatter',
                                coordinateSystem: 'calendar',
                                calendarIndex: 1,
                                data: data.sort(function (a, b) {
                                    return b[1] - a[1];
                                }).slice(0, 10),
                                symbolSize: function (val) {
                                    return val[1] / 200;
                                },
                                showEffectOn: 'render',
                                rippleEffect: {
                                    brushType: 'stroke'
                                },
                                hoverAnimation: true,
                                itemStyle: {
                                    color: '#f4e925',
                                    shadowBlur: 10,
                                    shadowColor: '#333'
                                },
                                zlevel: 1
                            },
                            {
                                name: 'Top 10',
                                type: 'effectScatter',
                                coordinateSystem: 'calendar',
                                data: data.sort(function (a, b) {
                                    return b[1] - a[1];
                                }).slice(0, 10),
                                symbolSize: function (val) {
                                    return val[1] / 200;
                                },
                                showEffectOn: 'render',
                                rippleEffect: {
                                    brushType: 'stroke'
                                },
                                hoverAnimation: true,
                                itemStyle: {
                                    color: '#f4e925',
                                    shadowBlur: 10,
                                    shadowColor: '#333'
                                },
                                zlevel: 1
                            },
                            {
                                name: 'Policy',
                                type: 'effectScatter',
                                coordinateSystem: 'calendar',
                                calendarIndex: 1,
                                data: data,
                                symbolSize: function (val) {
                                    if (val[2] != null){
                                        return val[1] / 200;
                                    }
                                    else {
                                        return 0;
                                    }
                                },
                                showEffectOn: 'render',

                                rippleEffect: {
                                    brushType: 'stroke',
                                },
                                hoverAnimation: true,
                                itemStyle: {
                                    color: '#DC143C',
                                    shadowBlur: 10,
                                    shadowColor: '#DC143C'
                                },
                                zlevel: 2
                            },
                            {
                                name: 'Policy',
                                type: 'effectScatter',
                                coordinateSystem: 'calendar',
                                data: data,
                                symbolSize: function (val) {
                                    if (val[2] != null){
                                        return val[1] / 200;
                                    }
                                    else {
                                        return 0;
                                    }
                                },
                                showEffectOn: 'render',

                                rippleEffect: {
                                    brushType: 'stroke',
                                },
                                hoverAnimation: true,
                                itemStyle: {
                                    color: '#DC143C',
                                    shadowBlur: 10,
                                    shadowColor: '#DC143C'
                                },
                                zlevel: 2
                            }

                        ]
                    };
                    calenderChart.setOption(option);


                })
            })


        })
    });
}



