import React from 'react'
import { match } from 'react-router-dom'
import { Button, Icon, InputNumber, Input, Form } from 'antd'
import { SortType, Params } from '@src/router'
import Chart from '@components/Chart/index'
import { 
    BarOption, 
    BarData, 
    BarOptionType,
    RunTimeStatus,
    SortMiddleType,
    CreateAxisData,
    ExchangePosition,
    AddMiddleDataToOption
} from '@constant/ChartConstant'
// import { deepCopy } from '@utils/utils'
// 排序算法
import bubbleSort from './bubbleSort'
import selectSort from './selectSort'
import insertSort from './insertSort'
import shellSort from './shellSort'

interface Props {
    match: match<Params>
}
interface State {
    option: BarOptionType,
    data: number[],
    axisData: string[],
    iterator: IterableIterator<SortMiddleType> | null,
    runTimeStatus: RunTimeStatus,
    interval: number,
    sortFunction: (
        data: number[], 
        exchangePosition: (arr: number[], i: number, j: number) => void
    ) => IterableIterator<SortMiddleType>
}

interface FormProps {
    sortNum: number[],
    setSortNum: (arr: number[]) => any,
}

const SortNumForm = Form.create<FormProps>({
    mapPropsToFields(props: FormProps) {
        return {
            sortNum: Form.createFormField({
                value: props.sortNum.join(',')
            })
        }
    },
    onFieldsChange (props: FormProps, value: any) {
        props.setSortNum(value.sortNum.value.split(','))
    }
})((props) => {
    const { getFieldDecorator } = props.form
    const formItemLayout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 16 }
    }

    return (
        <Form>
            <Form.Item
                label="排序数组"
                {...formItemLayout}
            >
                {getFieldDecorator('sortNum')(<Input />)}
            </Form.Item>
        </Form>
    )
})

// 算法排序柱状图
export default class AlgorithmBarChart extends React.Component<Props, State> {
    timer: NodeJS.Timer
    constructor(props: Props) {
        super(props)

        let sortFunction = null
        let sortData = []
        switch (props.match.params.type) {
            case SortType.bubble: 
                sortFunction = bubbleSort
                sortData = BarData.bubble
                break
            case SortType.select:
                sortFunction = selectSort
                sortData = BarData.select
                break
            case SortType.insert:
                sortFunction = insertSort
                sortData = BarData.insert
                break
            case SortType.shell:
                sortFunction = shellSort
                sortData = BarData.shell
                break
            default: 
                throw new Error(`不支持的排序方法：${props.match.params.type}`)
        }

        this.state = {
            // 基础option
            option: BarOption,
            // 待排序数组
            data: sortData,
            axisData: CreateAxisData(sortData.length),
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
    // 初始化state，清除定时器,运行第一步
    reset = () => {
        this.clearInterval()
        this.setState(
            {
                axisData: CreateAxisData(this.state.data.length),
                iterator: this.state.sortFunction(
                    this.state.data, 
                    this.exchangePosition
                ),
                runTimeStatus: RunTimeStatus.Stop
            },
            () => {
                this.next()
            }
        )
    }
    // 下一步
    next = () => {
        if (this.state.iterator) {
            let value = this.state.iterator.next().value
            if (value) {
                this.setState({
                    option: {...AddMiddleDataToOption(this.state.option, value, this.state.axisData)}}
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
    exchangePosition = (arr: number[], i: number, j: number) => {
        ExchangePosition(arr, this.state.axisData, i, j)
    }
    setSortData = (data: number[]) => {
        this.setState(
        {
            data: data 
        }, 
        () => {
            this.reset()
        })
    }
    render() {
        const BarStyle = {width: '800px', height: '600px'}
        const FormStyle = {width: '800px'}
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
                <div style={FormStyle}>
                    <SortNumForm
                        sortNum={this.state.data}
                        setSortNum={this.setSortData}
                    />
                </div>
                <Chart
                    style={BarStyle}
                    option={this.state.option}
                />
            </div>
        )
    }
}