function loadHistogram(name) {
    const xAxisData = [];
    const data_cumlative = [];
    const data_deaths = [];

    if (name === 'sum') {
        fetch('http://localhost:9000/data/total-cases-by-state').then(jsonResponse1 => {
            jsonResponse1.json().then(result1 => {
                const sum_length = parseInt(result1.sumOfState.length, 10);
                for (var i = 0; i < sum_length; i++) {
                    xAxisData.push(result1.sumOfState[i].date);
                    data_cumlative.push(result1.sumOfState[i].sum_cases);
                    // data_deaths.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
                }

                fetch('http://localhost:9000/data/deaths-by-state').then(jsonResponse2 => {
                    jsonResponse2.json().then(result2 => {
                        const deaths_length = parseInt(result2.deathSum.length, 10);
                        for (var i = 0; i < deaths_length; i++) {
                            data_deaths.push(result2.deathSum[i].sum_deaths);
                        }
                        // 基于准备好的dom，初始化echarts实例
                        var myChart = echarts.init(document.getElementById('sumCases'));
                        // 指定图表的配置项和数据

                        option = {
                            title: {
                                text: 'Overview of Germany'
                            },
                            legend: {
                                data: ['Cumulative', 'Deaths']
                            },
                            toolbox: {
                                // y: 'bottom',
                                feature: {
                                    magicType: {
                                        type: ['stack', 'tiled']
                                    },
                                    dataView: {},
                                    saveAsImage: {
                                        pixelRatio: 2
                                    }
                                }
                            },
                            tooltip: {},
                            xAxis: {
                                data: xAxisData,
                                splitLine: {
                                    show: false
                                }
                            },
                            yAxis: {},
                            series: [{
                                name: 'Cumulative',
                                type: 'bar',
                                data: data_cumlative,
                                animationDelay: function (idx) {
                                    return idx * 10;
                                }
                            }, {
                                name: 'Deaths',
                                type: 'bar',
                                data: data_deaths,
                                animationDelay: function (idx) {
                                    return idx * 10 + 100;
                                }
                            }],
                            animationEasing: 'elasticOut',
                            animationDelayUpdate: function (idx) {
                                return idx * 5;
                            }
                        };
                        myChart.setOption(option);
                    })
                });


// 使用刚指定的配置项和数据显示图表。

            })
        })
    }
    else {
        let shortname = mapTable[name].toString();
        fetch('http://localhost:9000/data/total-cases-by-state').then(jsonResponse1 => {
            jsonResponse1.json().then(result1 => {
                const sum_length = parseInt(result1.sumOfState.length, 10);
                for (var i = 0; i < sum_length; i++) {
                    xAxisData.push(result1.sumOfState[i].date);
                    data_cumlative.push(result1.sumOfState[i][shortname]);
                    // data_deaths.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
                }

                fetch('http://localhost:9000/data/deaths-by-state').then(jsonResponse2 => {
                    jsonResponse2.json().then(result2 => {
                        const deaths_length = parseInt(result2.deathSum.length, 10);
                        for (var i = 0; i < deaths_length; i++) {
                            data_deaths.push(result2.deathSum[i][shortname]);
                        }
                        // 基于准备好的dom，初始化echarts实例
                        var myChart = echarts.init(document.getElementById('sumCases'));
                        // 指定图表的配置项和数据

                        option = {
                            title: {
                                text: 'Overview of '+name,
                            },
                            legend: {
                                data: ['Cumulative', 'Deaths']
                            },
                            toolbox: {
                                // y: 'bottom',
                                feature: {
                                    magicType: {
                                        type: ['stack', 'tiled']
                                    },
                                    dataView: {},
                                    saveAsImage: {
                                        pixelRatio: 2
                                    }
                                }
                            },
                            tooltip: {},
                            xAxis: {
                                data: xAxisData,
                                splitLine: {
                                    show: false
                                }
                            },
                            yAxis: {},
                            series: [{
                                name: 'Cumulative',
                                type: 'bar',
                                data: data_cumlative,
                                animationDelay: function (idx) {
                                    return idx * 10;
                                }
                            }, {
                                name: 'Deaths',
                                type: 'bar',
                                data: data_deaths,
                                animationDelay: function (idx) {
                                    return idx * 10 + 100;
                                }
                            }],
                            animationEasing: 'elasticOut',
                            animationDelayUpdate: function (idx) {
                                return idx * 5;
                            }
                        };
                        myChart.setOption(option);
                    })
                });


// 使用刚指定的配置项和数据显示图表。

            })
        })

    }

}









