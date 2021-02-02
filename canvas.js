function _randomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

window.onload = function() {

    var min = _randomInt(5, 10), max = _randomInt(10, 25)

    let data = []
    for(var i=0; i<_randomInt(5, 10); i++)
    {
        data.push({label: i, value: _randomInt(min, max)})
    }

    var chart = new BarChart('bar-chart', 'Visualization', data)
    chart.render()
}
