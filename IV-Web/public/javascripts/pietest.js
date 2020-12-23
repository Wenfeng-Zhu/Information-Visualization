var pieexample = {
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
	series: [{
		name: 'Brands',
		colorByPoint: true,
		data: [{
			name: 'Chrome',
			y: 61.41,
			sliced: true,
			selected: true
		}, {
			name: 'Internet Explorer',
			y: 11.84
		}, {
			name: 'Firefox',
			y: 10.85
		}, {
			name: 'Edge',
			y: 4.67
		}, {
			name: 'Safari',
			y: 4.18
		}, {
			name: 'Other',
			y: 7.05
		}]
	}]
};

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
    //var data = JSON.stringify(myJson.series).replace(/\{\"/g, "\{").replace(/\"\:/g,"\:").replace(/\,\"/g,"\,");
    //  data = data.replace(/\:/g,"\:\"").replace(/\,/g,"\"\,").replace(/"\[/g,"\[").replace(/\}\"\,\{/g,"\}\,\{").replace(/y\:\"/g,"y\:").replace(/\"true/g,"true").replace(/true\"/g,"true").replace(/d\"/g,"\/d");
    options.series = myJson.series; 

    if(pieexample == options) 
        console.log("fuck");
    else 
        console.log("shabi");
    
    console.log(pieexample);
     
    console.log(options);

    Highcharts.chart('container', options);
});
