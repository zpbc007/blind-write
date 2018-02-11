import React from 'react'
import { match } from 'react-router-dom'
import { Button, Icon, InputNumber } from 'antd'
import { SortType, Params } from '@src/router'
import Chart from '@components/Chart/index'
import { 
    BarOption, 
    BarData, 
    BarDataType, 
    BarOptionType,
    ColorMap,
    Status,
    RunTimeStatus
} from '@constant/ChartConstant'
import { deepCopy } from '@utils/utils'
// 排序算法
import bubbleSort from './bubbleSort'
import selectSort from './selectSort'

interface Props {
    match: match<Params>
}
interface State {
    option: BarOptionType,
    data: BarDataType,
    iterator: IterableIterator<BarDataType | null> | null,
    runTimeStatus: RunTimeStatus,
    interval: number,
    sortFunction: (
        data: BarDataType,
        currentColor: string,
        operateColor: string,
        restColor: (data: BarDataType) => string[]
    ) => IterableIterator<{
        dataList: number[];
        colorList: string[];
        xAxisData: string[];
    }>
}

// 算法排序柱状图
export default class AlgorithmBarChart extends React.Component<Props, State> {
    timer: NodeJS.Timer
    constructor(props: Props) {
        super(props)

        let sortFunction = null
        switch (props.match.params.type) {
            case SortType.bubble: 
                sortFunction = bubbleSort
                break
            case SortType.select:
                sortFunction = selectSort
                break
            default: 
                throw new Error(`不支持的排序方法：${props.match.params.type}`)
        }

        this.state = {
            option: BarOption,
            data: BarData,
            iterator: null,
            runTimeStatus: RunTimeStatus.Stop,
            interval: 0.5,
            sortFunction
        }
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
            iterator: this.state.sortFunction(
                resetAxisData, 
                this.mapStatusToColor(Status.Current),
                this.mapStatusToColor(Status.Operate), 
                this.resetColor),
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
                throw new Error(`当前运行状态不正确： ${this.state.runTimeStatus}`)
        }
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
    resetColor = (data: BarDataType) => this.setColor(data).colorList
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