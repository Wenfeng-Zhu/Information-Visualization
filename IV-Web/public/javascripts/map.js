var width = 800,
    height = 1000,
    focused = null,
    geoPath;

var color = d3.scaleLinear()
  .domain([0,100])      // <--- min and MAX of your value
  .range(["#ffffff","000000"]);

var svg = d3.select("#map")
  .append("svg")
    .attr("width", width)
    .attr("height", height);

/*svg.append("rect")
    .attr("class", "background")
    .attr("width", width)
    .attr("height", height);*/

var g = svg.append("g")
  .append("g")
    .attr("id", "states");

let url = "https://raw.githubusercontent.com/isellsoap/deutschlandGeoJSON/master/2_bundeslaender/4_niedrig.geo.json"
d3.json(url, function(collection) {
  var bounds = d3.geoBounds(collection),
      bottomLeft = bounds[0],
      topRight = bounds[1],
      rotLong = -(topRight[0]+bottomLeft[0])/2;
      center = [(topRight[0]+bottomLeft[0])/2+rotLong, (topRight[1]+bottomLeft[1])/2],
      
      //default scale projection
      projection = d3.geoAlbers()
        .parallels([bottomLeft[1],topRight[1]])
        .rotate([rotLong,0,0])
        .translate([width/2,height/2])
        .center(center),
        
      bottomLeftPx = projection(bottomLeft),
      topRightPx = projection(topRight),
      scaleFactor = 1.00*Math.min(width/(topRightPx[0]-bottomLeftPx[0]), height/(-topRightPx[1]+bottomLeftPx[1])),
      
      projection = d3.geoAlbers()
        .parallels([bottomLeft[1],topRight[1]])
        .rotate([rotLong,0,0])
        .translate([width/2,height/2])
        .scale(scaleFactor*0.975*1000)
        //.scale(4*1000)  //1000 is default for USA map
        .center(center);

  geoPath = d3.geoPath().projection(projection);
    
  var graticule = d3.geoGraticule()
      .step([1, 1]);

  /*g.append("path")
      .datum(graticule)
      .attr("class", "graticuleLine")
      .attr("d", geoPath);*/
     
var beginColor = d3.rgb(255, 140, 0);	
var endColor = d3.rgb(255, 0, 0);	


var linear = d3.scaleLinear()
				      .domain([5500,280000])
				      .range([0,1]);

var compute = d3.interpolateRgb(beginColor, endColor);

var caseNumbers = [159013, 222360, 68508, 21123, 10499, 25775, 92825, 6446,
                  170904, 276697, 47140,  13212, 13826, 63535, 15082, 19463]
// State order: Baden-Wüttemberg, Bayen, Berlin, Brandenburg, Bremen, Hamburg, Hessen, Mecklenburg-Vorpommen,
//Niedersachsen, Nordrhein-Westfalen, Rheinland-Pfalz, Saarland, Sachsen-Anhalt, Sachsen, Schleswig-Holstein, Thüringen, 
g.selectAll("path.feature")
    .data(collection.features)
    .enter()
  .append("path")
    .attr("class", "feature")
    .attr("d", geoPath)
    .attr('fill',function(d,i) { 
        return compute(linear(caseNumbers[i])); 
      })
    .on("click", clickPath);

  /*      
  console.log("d3.json: bounds = "+bounds);
  console.log("d3.json: bottomLeft = "+bottomLeft);
  console.log("d3.json: topRight = "+topRight);
  console.log("d3.json: center = "+center);
  console.log("d3.json: projection(center) = "+projection(center));
  console.log("d3.json: projection(bottomLeft) = "+projection(bottomLeft));
  console.log("d3.json: projection(topRight) = "+projection(topRight));
  console.log("d3.json: topRightPx = "+topRightPx);
  console.log("d3.json: bottomLeftPx = "+bottomLeftPx);
  console.log("d3.json: scaleFactor x axis = "+width/(topRightPx[0]-bottomLeftPx[0]));
  console.log("d3.json: scaleFactor y axis = "+height/(-topRightPx[1]+bottomLeftPx[1]));  
  console.log("d3.json: scaleFactor = "+scaleFactor);
  */
});


function clickPath(d) {
  var x = width/2,
      y = height/2,
      k = 1,
      name = d.properties.name;

  g.selectAll("text")
    .remove();  

  if ((focused === null) || !(focused === d)) {
    var centroid = geoPath.centroid(d),
        x = +centroid[0],
        y = +centroid[1],
        k = 1.75;
    focused = d;
    
    g.append("text")
      .text(name)
      .attr("x", x)
      .attr("y", y)
      .style("text-anchor","middle")
      .style("font-size","8px")
      .style("stroke-width","0px")
      .style("fill","rgb(255, 200, 255)")
      .style("font-family","Times New Roman")
      .on("click", clickText);
  } else {
    focused = null;
  };

  g.selectAll("path")
      .classed("active", focused && function(d) { return d === focused; });
 
  g.transition()
      .duration(500)
      .attr("transform", "translate("+ (width/2) +","+ (height/2) +")scale("+ k +")translate("+ (-x) +","+ (-y) +")")
      .style("stroke-width", 1.75/k +"px");
}


function clickText(d) {
  focused = null;
  g.selectAll("text")
      .remove();
  g.selectAll("path")
      .classed("active", 0);
  g.transition()
      .duration(500)
      .attr("transform", "scale("+1+")translate("+0+","+0+")")
      .style("stroke-width", 1.00+"px");
}