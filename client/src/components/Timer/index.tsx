import React from 'react'

import './index.less'

interface Props {
    // 启动暂停标志位
    start: boolean,
    getCount?: (count: number) => any,
    reset?: boolean,
    format?: (seconds: number) => JSX.Element
    style?: React.CSSProperties,
    // 每秒变化的数量
    interval?: number,
    title: string
}

interface State {
    // 秒数
    secondCount: number,
    interval?: any
}

export default class Timer extends React.Component<Props, State> {
    constructor (props: Props) {
        super(props)

        this.state = {
            secondCount: 0
        }

        this.startTick = this.startTick.bind(this)
        this.stopTick = this.stopTick.bind(this)
        this.tick = this.tick.bind(this)
        this.fixZero = this.fixZero.bind(this)
        this.defaultFormat = this.defaultFormat.bind(this)
        this.emitCount = this.emitCount.bind(this)
    }
    componentWillReceiveProps (props: Props) {
        // 重置 清空定时器 清空计数器
        if (props.reset !== this.props.reset) {
            this.stopTick()
            this.setState(
                {
                    secondCount: 0
                }, 
                () => {
                    this.emitCount()
                }
            )
            return 
        }
        if (props.start !== this.props.start) {
            if (props.start) {
                this.startTick()
            } else {
                this.stopTick()
                this.emitCount()
            }
        }
    }
    // 启动定时器
    startTick () {
        this.setState({
            ...this.state,
            interval: setInterval(this.tick, 1000)
        })
    }
    // 停止定时器
    stopTick () {
        if (this.state.interval) {
            clearInterval(this.state.interval)
        }
        this.setState({
            ...this.state,
            interval: null
        })
    }
    // 更新count
    emitCount() {
        if (this.props.getCount) {
            this.props.getCount(this.state.secondCount)
        }
    }
    // 组件移除前清空定时器
    componentWillUnmount () {
        if (this.state.interval) {
            clearInterval(this.state.interval)
        }
    }
    // 秒数加interval
    tick () {
        let interval = 1
        if (this.props.interval) {
            interval = this.props.interval
        }

        this.setState({
            secondCount: this.state.secondCount + interval
        })
    }
    // 小于10的加0
    fixZero (num: number) {
        return num < 10 ? `0${num}` : num
    }
    // 格式化
    defaultFormat (seconds: number) {
        const hour = 60 * 60
        const minute = 60
        const second = 1
        
        const h = Math.floor(seconds / hour)
        const m = Math.floor((seconds - h * hour) / minute)
        const s = Math.floor((seconds - h * hour - m * minute) / second)

        return <span>{this.fixZero(h)}:{this.fixZero(m)}:{this.fixZero(s)}</span>
    }

    render () {
        const {format = this.defaultFormat} = this.props
        return (
            <div 
                className="timer"
                style={this.props.style}
            >
                <div className="timer-title-container">
                    <span>{this.props.title}</span>
                </div>
                <div className="timer-second-container">
                    <div className="timer-second">
                        {format(this.state.secondCount)}
                    </div>
                </div>
            </div>
        )
    }
}