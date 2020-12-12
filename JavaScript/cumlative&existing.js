// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById('sumCases'));
//var mydate = require('../DataSources/total-cases-by-state.json');
// 指定图表的配置项和数据
var xAxisData = [];
var data1 = [];
var data2 = [];


for (var i = 0;i<100;i++) {
    xAxisData.push('num'+i);
    data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
    data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
}

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
    yAxis: {
    },
    series: [{
        name: 'Cumulative',
        type: 'bar',
        data: data1,
        animationDelay: function (idx) {
            return idx * 10;
        }
    }, {
        name: 'Existing',
        type: 'bar',
        data: data2,
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