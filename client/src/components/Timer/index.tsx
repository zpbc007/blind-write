import React from 'react'

interface Props {
    // 启动暂停标志位
    start: boolean,
    getCount?: (count: number) => any,
    reset?: boolean
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
    }

    componentWillReceiveProps (props: Props) {
        // 重置 清空定时器 清空计数器
        if (props.reset !== this.props.reset) {
            this.stopTick()
            this.setState({
                secondCount: 0
            })
            return 
        }
        if (props.start !== this.props.start) {
            if (props.start) {
                this.startTick()
            } else {
                this.stopTick()
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
        // 每次停止计数时更新count
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

    // 秒数加一
    tick () {
        this.setState({
            secondCount: this.state.secondCount + 1
        })
    }

    render () {
        return (
            <div>
                {this.state.secondCount}
            </div>
        )
    }
}