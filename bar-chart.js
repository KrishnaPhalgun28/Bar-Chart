'use-strict'

class BarChart {

    constructor(id, title, data) {
        this.chart = document.getElementById(id)
        this.width = this.chart.clientWidth
        this.height = this.chart.clientHeight
        this.title = title
        this.data_labels = data.map(item => item.label)
        this.data_values = data.map(item => item.value)
        this.data_num_value = this.data_values.length
        this.data_max_value = Math.max(...this.data_values)

        this.createCanvas()
        this.setChartProperties()
    }

    createCanvas() {
        var canvas = document.createElement('canvas')

        this.canvas = canvas
        this.context = this.canvas.getContext('2d')

        this.canvas.width = this.width
        this.canvas.height = this.height

        this.chart.innerHTML = ''
        this.chart.appendChild(this.canvas)
    }

    setChartProperties() {
        let a, d

        this.axisWidth = 0.75
        this.axisColor = 'black'

        this.fontStyle = 'normal'
        this.fontFamily = 'roboto'
        this.fontWeight = '300'
        this.fontColor = 'black'
        this.fontSize = Math.min(this.height*0.03, this.width*0.03)

        this.guideLineColor = 'grey'
        this.guideLineWidth = 0.5

        this.marginRatio = 0.1
        this.margin = Math.max(this.height*this.marginRatio, this.width*this.marginRatio)

        this.verticalLowerBound = Math.ceil(this.data_num_value/5)*5
        this.verticalUpperBound = Math.ceil(this.data_max_value/10)*10

        this.verticalAxisLength = (this.height - this.margin) - this.margin
        this.horizontalAxisLength = (this.width - this.margin) - this.margin

        this.xLabels = this.data_labels
        this.yLabels = []

        a = 0, d = this.verticalUpperBound/this.verticalLowerBound
        for(var i=0; i<=this.verticalLowerBound; i++) this.yLabels.push(a+i*d)

        this.originY = this.margin+this.verticalAxisLength
        this.verticalLabelFreq = this.verticalAxisLength/(this.yLabels.length-1)
        this.horizontalLabelFreq = this.horizontalAxisLength/(this.xLabels.length+1)
    }

    drawAxis() {
        let a, d

        this.context.lineWidth = this.axisWidth
        this.context.strokeStyle = this.axisColor

        this.context.beginPath()

        this.context.moveTo(this.margin, this.margin)
        this.context.lineTo(this.margin, this.height-this.margin)

        this.context.moveTo(this.margin, this.height-this.margin)
        this.context.lineTo(this.width-this.margin, this.height-this.margin)

        this.context.stroke()

        this.context.closePath()

        this.context.textAlign = "center"
        this.context.font = this.fontStyle+' '+this.fontWeight+' '+this.fontSize+'px '+this.fontFamily
        this.context.fillStyle = this.fontColor

        this.context.fillText(this.title, this.width/2, this.margin/2)

        this.context.textAlign = "end"

        a = this.originY, d = -this.verticalLabelFreq
        for(var i=0; i<this.yLabels.length; i++) {
            let text = this.yLabels[i]
            let textX = this.margin*(1-this.marginRatio)
            let textY = a+i*d

            this.context.fillText(text, textX, textY)
        }

        this.context.textAlign = 'center'
        this.context.textBaseline = 'top'

        a = this.margin, d = this.horizontalLabelFreq
        for(var i=0; i<this.xLabels.length; i++) {
            let text = this.xLabels[i]
            let textX = a+(i+1)*d
            let textY = this.margin*(1+this.marginRatio)+this.verticalAxisLength

            this.context.fillText(text, textX, textY)
        }

        this.context.stroke()
    }

    drawPlot() {
        let a, d

        a = this.margin, d = this.horizontalLabelFreq
        for(var i=0; i<this.xLabels.length; i++)
        {
            let [fillColor, strokeColor] = this._randomColor('0.3')
            this.context.fillStyle = fillColor
            this.context.strokeStyle = strokeColor

            this.context.beginPath()
        
            let barW = d/2
            let barH = this.data_values[i]*(this.verticalAxisLength/this.verticalUpperBound)
            let barX = (a+(i+1)*d)-(barW/2)
            let barY = this.originY

            this.context.moveTo(this.margin, this.originY-barH)
            this.context.lineTo(barX, this.originY-barH)
            this.context.rect(barX, barY, barW, -barH)

            this.context.fill()
            this.context.stroke()

            this.context.closePath()
        }
    }

    render() {
        this.drawAxis()
        this.drawPlot()
    }

    _randomColor(opacity) {
        var color = 'rgba('
        for (var i=0; i<3; i++) {
          color += Math.floor(Math.random()*255)+','
        }
        return [color+opacity+')', color+'1.0)']
    }
}