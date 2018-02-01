import React from 'react'
import echarts, { ECharts, EChartOption } from 'echarts'

interface Props {
    option: EChartOption,
    style: React.CSSProperties
}

interface State {
    chart: ECharts | null
}

export default class Chart extends React.Component<Props, State> {

    self: HTMLDivElement | null

    constructor(props: Props) {
        super(props)

        this.state = {
            chart: null
        }
    }

    initChart = () => {
        if (this.self) {
            const myChart = echarts.init(this.self)
            window.onresize = () => myChart.resize()
            this.setState({chart: myChart}, () => this.setChartOption(this.props))
        }
    }

    setChartOption = (props: Props) => {
        if (this.state.chart) {
            this.state.chart.setOption(props.option)
        }
    }

    componentDidMount() {
        this.initChart()
    }

    shouldComponentUpdate() {
        return true
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setChartOption(nextProps)
    }

    render() {
        return (
            <div 
                ref={(self) => this.self = self} 
                style={{...this.props.style}}
            />
        )
    }
}