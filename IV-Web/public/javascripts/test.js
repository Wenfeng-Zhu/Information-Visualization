// function getVirtulData(promise,name) {
// var date = +echarts.number.parseDate(year + '-03-02');
// var end = +echarts.number.parseDate(year + '-12-01');
// var dayTime = 3600 * 24 * 1000;
// var data = [];
// const stateName = name;
const name = 'DE-BB'
fetch('http://localhost:3000/data/total-cases-by-state').then(jsonResponse => {
    jsonResponse.json().then(result => {
        let i = 0;
        for (var time = date; time < end; time += dayTime) {
            result.sumOfState[i][name]
            console.log(result.sumOfState[i][name])
            data.push([
                echarts.format.formatTime('yyyy-MM-dd', time),
                Math.floor(Math.random() * 10000)
            ]);
        }
    })

});
// return data;
// }