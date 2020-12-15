// let promise = fetch('http://localhost:3000/data/total-cases-by-state');

function getVirtulData(name) {
    var shortname = mapTable[name.toString()];
    var calenderChart = echarts.init(document.getElementById('eachState'));
    var date = +echarts.number.parseDate(2020 + '-03-02');
    var end = +echarts.number.parseDate(2020 + '-12-01');
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    fetch('http://localhost:3000/data/infections-by-state-daily').then(jsonResponse => {
        jsonResponse.json().then(result => {
            let i = 0;
            for (var time = date; time < end; time += dayTime) {
                data.push([
                    echarts.format.formatTime('yyyy-MM-dd', time),
                    result.dailyState[i][shortname.toString()]
                ]);
                i++;
            }
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
                    left: '100',
                    data: ['confirm', 'Top 12'],
                    textStyle: {
                        color: '#fff'
                    }
                },
                calendar: [{
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
                }, {
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
                            return val[1] / 200;
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
                            return val[1] / 200;
                        },
                        itemStyle: {
                            color: '#ddb926'
                        }
                    },
                    {
                        name: 'Top 12',
                        type: 'effectScatter',
                        coordinateSystem: 'calendar',
                        calendarIndex: 1,
                        data: data.sort(function (a, b) {
                            return b[1] - a[1];
                        }).slice(0, 12),
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
                        name: 'Top 12',
                        type: 'effectScatter',
                        coordinateSystem: 'calendar',
                        data: data.sort(function (a, b) {
                            return b[1] - a[1];
                        }).slice(0, 12),
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
                    }
                ]
            };
            calenderChart.setOption(option);

        })
    });
}



