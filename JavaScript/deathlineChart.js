var data = [];
d3.csv("https://raw.githubusercontent.com/ShaohuaTong/DataSourceForIV-Project/main/total-by-state.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { date : d3.timeParse("%Y/%m/%d")(d.date), value : d.sum_cases }
  },
  function(dataJson) {
    for (let i = 0; i < dataJson.length; i++) {
        data.push([dataJson[i].date, dataJson[i].value]);
        
    }
    
    // Delete the last empty array
    data.pop();

    drawLineGraph(600, 1000, data, "Intensity", {
        lineValue: 200,
        label: "OMG!"
      })
  }
);


function GMTToStr(time){
    let date = new Date(time)
    let Str=date.getFullYear() + '-' +
    (date.getMonth() + 1) + '-' +
    date.getDate()

    return Str;
}

var drawLineGraph = function(containerHeight, containerWidth, data, yLabel, warnLine) {
    
    var svg = d3.select("body").append("svg")
        .attr("width", containerWidth)
        .attr("height", containerHeight);
 
    var margin = {
        top: 100,
        left: 100,
        right: 100,
        bottom: 100
    };
 
    var height = containerHeight - margin.top - margin.bottom;
    var width = containerWidth - margin.left - margin.right;
 
    var xDomain = d3.extent(data, function(d) {
        return d[0];
    })
    var yDomain = [d3.min(data, function(d) { return Math.min(d[1]);}), d3.max(data, function(d) { return Math.max(d[1]);})];
 
    var xScale = d3.scaleTime().range([0, width]).domain(xDomain);
    var yScale = d3.scaleLinear().range([height, 0]).domain(yDomain);
 
    var xAxis = d3.axisBottom(xScale);
    var yAxis = d3.axisLeft(yScale);
 
    var line = d3.line()
        .x(function(d) {
            return xScale(d[0]);
        })
        .y(function(d) {
            return yScale(d[1]);
        });
 
    var area = d3.area()
        .x(function(d) {
            return xScale(d[0]);
        })
        .y0(function(d) {
            return yScale(d[1]);
        })
        .y1(height);
 
    var g = svg.append('g').attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
 
    g.append('path')
        .datum(data)
        .attr('class', 'area')
        .attr('d', area);
 
    g.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0, ' + height + ')')
        .call(xAxis);
 
    g.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .attr('text-anchor', 'end')
        .text(yLabel);
 
    g.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line);
 
    /*g.selectAll('circle').data(data).enter().append('circle')
        .attr('cx', function(d) {
            return xScale(d[0]);
        })
        .attr('cy', function(d) {
            return yScale(d[1]);
        })
        .attr('r', 3)
        .attr('class', 'circle');*/
 
    // focus tracking
 
    var focus = g.append('g').style('display', 'none');
 
    focus.append('line')
        .attr('id', 'focusLineX')
        .attr('class', 'focusLine');
    focus.append('line')
        .attr('id', 'focusLineY')
        .attr('class', 'focusLine');
    focus.append('circle')
        .attr('id', 'focusCircle')
        .attr('r', 5)
        .attr('class', 'circle focusCircle');
 
    var bisectDate = d3.bisector(function(d) {
        return d[0];
    }).left;
 
    g.append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', function() {
            focus.style('display', null);
            d3.select('#dialog')
            .style('opacity',0);
        })
        .on('mouseout', function() {
            focus.style('display', 'none');
            d3.select('#dialog')
            .style('opacity',0);
        })
        .on('mousemove', function() {
            var mouse = d3.mouse(this);
            var mouseDate = xScale.invert(mouse[0]);
            var i = bisectDate(data, mouseDate); // returns the index to the current data item
 
            var d0 = data[i - 1]
            var d1 = data[i];
            // work out which date value is closest to the mouse
            var d = mouseDate - d0[0] > d1[0] - mouseDate ? d1 : d0;
 
            var x = xScale(d[0]);
            var y = yScale(d[1]);
 
            focus.select('#focusCircle')
                .attr('cx', x)
                .attr('cy', y);
            focus.select('#focusLineX')
                .attr('x1', x).attr('y1', yScale(yDomain[0]))
                .attr('x2', x).attr('y2', yScale(yDomain[1]));
            focus.select('#focusLineY')
                .attr('x1', xScale(xDomain[0])).attr('y1', y)
                .attr('x2', xScale(xDomain[1])).attr('y2', y);
 
            d3.select('#dialog')
                //.attr('transform', 'translate(' + x + ',' + y + ')')
                //.attr('text-anchor', 'middle')
                .style('opacity','0.7')
                .text('Time: ' + GMTToStr(d[0]) + ' Total sumcases: ' + d[1]);
 
        });
 
    // warn line
 
    if (warnLine && yDomain[0] < warnLine.lineValue && yDomain[1] > warnLine.lineValue) {
        g.append('line')
            .attr('x1', xScale(xDomain[0]))
            .attr('y1', yScale(warnLine.lineValue))
            .attr('x2', xScale(xDomain[1]))
            .attr('y2', yScale(warnLine.lineValue))
            .attr('class', 'zeroline');
        g.append('text')
            .attr('x', xScale(xDomain[1]))
            .attr('y', yScale(warnLine.lineValue))
            .attr('dy', '1em')
            .attr('text-anchor', 'end')
            .text(warnLine.label)
            .attr('class', 'zerolinetext');
    }
};