var xAxisData = [];
var data_cumlative = [];
var data_existing = [];


fetch('http://localhost:3000/data/total-cases-by-state').then(jsonResponse => {
    jsonResponse.json().then(result => {
        const sum_length = parseInt(result.sumOfState.length, 10);
        for (var i = 0; i < sum_length; i++) {
            xAxisData.push(result.sumOfState[i].date);
            data_cumlative.push(result.sumOfState[i].sum_cases);
            data_existing.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
            // xAxisData.push(result.sumOfState[i].date);
            // data_cumlative.push(parseInt(result.sumOfState[i].sum_cases))

        }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('sumCases'));
        // 指定图表的配置项和数据

        // for (var i = 0; i < long; i++) {
        //     xAxisData.push('num' + i);
        //     data_cumlative.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
        //     data_existing.push((Math.cos(i / 5) * (i / 5 - 10) + i / 6) * 5);
        // }

        option = {
            title: {
                text: '柱状图动画延迟'
            },
            legend: {
                data: ['Cumulative', 'Existing']
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
                name: 'Existing',
                type: 'bar',
                data: data_existing,
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

// 使用刚指定的配置项和数据显示图表。

    })
})




