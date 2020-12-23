
fetch('http://localhost:3000/data/testdata')
.then(function(response) {
    return response.json();
})
.then(function(myJson) {
    var options = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: '2018 年浏览器市场份额'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
            series: [{}]
    };
    var data = JSON.stringify(myJson.series).replace(/\{\"/g, "\{").replace(/\"\:/g,"\:").replace(/\,\"/g,"\,");
    //  data = data.replace(/\:/g,"\:\"").replace(/\,/g,"\"\,").replace(/"\[/g,"\[").replace(/\}\"\,\{/g,"\}\,\{").replace(/y\:\"/g,"y\:").replace(/\"true/g,"true").replace(/true\"/g,"true").replace(/d\"/g,"\/d");
     options.series[0] = data; 
    console.log(options.series[0]);
    Highcharts.chart('container', options);
});
