import React from 'react'
import { Button, Icon, InputNumber } from 'antd'
import Chart from '@components/Chart/index'
import { BarOption, BarData, BarDataType, BarOptionType } from '@constant/ChartOption'
import { deepCopy } from '@utils/utils'

const ColorMap = {
    gray: '#99A3A4',
    green: '#58D68D',
    blue: '#3498DB',
    red: '#CD6155'
}
enum Status {
    Init,
    Orderd,
    Current,
    Operate
} 
enum RunTimeStatus {
    // 定时运行
    Run,
    // 单步运行
    Step,
    // 暂停
    Pause,
    // 停止（初始状态）
    Stop
}
interface State {
    option: BarOptionType,
    data: BarDataType,
    iterator: IterableIterator<BarDataType | null> | null,
    runTimeStatus: RunTimeStatus,
    interval: number
}

// 冒泡排序
export default class AlgorithmChart extends React.Component<{}, State> {
    timer: NodeJS.Timer
    constructor(props: {}) {
        super(props)

        this.state = {
            option: BarOption,
            data: BarData,
            iterator: null,
            runTimeStatus: RunTimeStatus.Stop,
            interval: 0.5
        }

        this.bubbleSort = this.bubbleSort.bind(this)
    }
    componentWillMount() {
        this.reset()
    }
    // 定时器执行
    run = () => {
        this.setState({runTimeStatus: RunTimeStatus.Run})
        this.timer = global.setInterval(this.next, this.state.interval * 1000)
    }
    // 暂停
    pause = () => {
        this.setState({runTimeStatus: RunTimeStatus.Pause})
        this.clearInterval()
    }
    // 单步执行
    singleStep = () => {
        this.clearInterval()
        this.setState({runTimeStatus: RunTimeStatus.Step})
        this.next()
    }
    // 初始化state，清除定时器
    reset = () => {
        this.clearInterval()
        const resetColorData = this.setColor(BarData)
        const resetAxisData = this.resetAxisData(resetColorData)
        this.setState({
            data: resetAxisData,
            option: {...this.addDataToOption(BarOption, resetAxisData)},
            iterator: this.bubbleSort(resetAxisData),
            runTimeStatus: RunTimeStatus.Stop
        })
    }
    // 下一步
    next = () => {
        if (this.state.iterator) {
            let value = this.state.iterator.next().value
            if (value) {
                this.setState({
                    option: {...this.addDataToOption(this.state.option, value)}}
                )
            } else {
                this.clearInterval()
            }
        }
    }
    // interval change
    intervalChange = (value: number) => {
        this.setState({interval: value})
    }
    // 当前按钮
    getButton = () => {
        switch (this.state.runTimeStatus) {
            case RunTimeStatus.Step :
            case RunTimeStatus.Stop : 
                return (
                    <Button
                        onClick={this.run}
                    >
                        开始
                        <Icon type="play-circle-o"/>
                    </Button>
                )
            case RunTimeStatus.Pause:
                return (
                    <Button
                        onClick={this.run}
                    >
                        继续
                        <Icon type="play-circle-o"/>
                    </Button>
                )
            case RunTimeStatus.Run:
                return (
                    <Button
                        onClick={this.pause}    
                    >
                        暂停
                        <Icon type="pause-circle-o"/>
                    </Button>
                )
            default:
                debugger
                throw new Error(`当前运行状态不正确： ${this.state.runTimeStatus}`)
        }
    }
    // 排序方法
    * bubbleSort(data: BarDataType) {
        let {dataList, colorList, xAxisData} = data
        for (let i = 0; i < dataList.length; i++) {
            for (let j = 0; j < dataList.length - 1; j++) {
                // 当前指针颜色
                colorList[j] = this.mapStatusToColor(Status.Current)
                yield {dataList, colorList, xAxisData}
                if (data.dataList[j] > dataList[j + 1]) {
                    colorList[j] = colorList[j + 1] = this.mapStatusToColor(Status.Operate)
                    yield {dataList, colorList, xAxisData}
                    
                    this.exchange(dataList, j, j + 1)
                    this.exchange(xAxisData, j, j + 1)
                    yield {dataList, colorList, xAxisData}
                }
                colorList = this.setColor({dataList, colorList, xAxisData}).colorList
            }
        }
        return null
    }
    // 清除定时器
    clearInterval = () => {
        if (this.timer) {
            clearInterval(this.timer)
        }
    }
    // 设置柱形图color
    setColor = (data: BarDataType, status?: Status, index?: number) => {
        data = deepCopy(data)
        let { colorList, dataList } = data
        let color = this.mapStatusToColor(status)
        // 没有index，所有图形为初始化颜色
        if (!index) {
            colorList = []
            for (let i = 0; i < dataList.length; i++) {
                colorList[i] = color
            }
        } else {// 设为固定状态颜色
            colorList[index] = color
        }
        data.colorList = colorList
        return data
    }
    // status与color映射关系
    mapStatusToColor = (status?: Status) => {
        switch (status) {
            case Status.Init:
                return ColorMap.gray
            case Status.Orderd:
                return ColorMap.green
            case Status.Current:
                return ColorMap.blue
            case Status.Operate:
                return ColorMap.red
            default:
                return ColorMap.gray
        }
    }
    // 重置x轴数据
    resetAxisData = (data: BarDataType) => {
        data = deepCopy(data)
        let { xAxisData, dataList } = data
        let arr = []
        for (let i = 0; i < dataList.length; i++) {
            arr.push(`${i}`)
        }
        xAxisData = arr
        
        return {...data, xAxisData: xAxisData}
    }
    // 处理chartOption 将数据填充到option中
    addDataToOption = (option: BarOptionType, data: BarDataType) => {
        const result = {...option}
        const {dataList = [], colorList} = data
        // 填充series数据
        if (result.series.length > 0) {
            result.series[0].data = dataList
            result.series[0].itemStyle.color = (param: any) => {
                return colorList[param.dataIndex]
            }
        }
        // 填充x轴数据
        result.xAxis[0].data = data.xAxisData

        return result
    }
    // 交换数组元素位置
    exchange = (arr: Array<any>, index1: number, index2: number) => {
        let temp = arr[index1]
        arr[index1] = arr[index2]
        arr[index2] = temp
    }
    render() {
        const BarStyle = {width: '800px', height: '600px'}
        return (
            <div>
                <Button.Group>
                    {this.getButton()}
                    <Button
                        onClick={this.singleStep}
                    >   
                        单步运行
                        <Icon type="right-circle-o"/>
                    </Button>
                    <Button
                        onClick={this.reset}
                        disabled={this.state.runTimeStatus === RunTimeStatus.Stop}
                    >   
                        重置
                        <Icon type="reload"/>
                    </Button>
                </Button.Group>
                <InputNumber
                    min={0.1}
                    defaultValue={this.state.interval}
                    step={0.5}
                    onChange={this.intervalChange}
                />
                <Chart
                    style={BarStyle}
                    option={this.state.option}
                />
            </div>
        )
    }
}