import React from 'react'
import { Button } from 'antd'
import Timer from '../index'

interface Props {

}

enum TimerType {
    MoveTimer,
    BreakTimer
}

interface State {
    // 运动标志位 
    moveStart: boolean,
    // 休息标志位
    breakStart: boolean,
    // 初始开始标志位
    init: boolean,
    // 暂停标志位
    pause: boolean,
    pauseTimer?: TimerType,
    // 运动时间
    moveCount: number,
    // 休息时间
    breakCount: number,
    // move 定时器重置标志位
    resetMoveTimer: boolean,
    // break 定时器重置标志位
    resetBreakTimer: boolean
}

export default class TwoTimers extends React.Component<Props, State> {
    
    private message = {
        start: '开始计时',
        move: '运动',
        break: '休息',
        pause: '暂停',
        continue: '继续'
    }

    private initState: State = {
        moveStart: false,
        breakStart: false,
        init: true,
        pause: false,
        moveCount: 0,
        breakCount: 0,
        resetMoveTimer: false,
        resetBreakTimer: false
    }
    
    constructor (props: Props) {
        super(props)

        this.state = this.initState

        this.changeTimer = this.changeTimer.bind(this)
        this.getMoveCount = this.getMoveCount.bind(this)
        this.getBreakCount = this.getBreakCount.bind(this)
        this.pauseTimer = this.pauseTimer.bind(this)
        this.resetTimer = this.resetTimer.bind(this)
    }

    changeTimer () {
        // 初始开始
        if (this.state.init) {
            this.setState({
                init: false,
                moveStart: true
            })
        } else {
            this.setState({
                moveStart: !this.state.moveStart,
                breakStart: !this.state.breakStart
            })
        }
    }
    getMoveCount (count: number) {
        this.setState({
            moveCount: count
        })
    }
    getBreakCount (count: number) {
        this.setState({
            breakCount: count
        })
    }
    pauseTimer () {
        if (this.state.pause) {
            this.setState({
                pause: false
            })

            this.state.pauseTimer === TimerType.MoveTimer ? 
                this.setState({
                    moveStart: true
                }) :
                this.setState({
                    breakStart: true
                })
            
        } else {
            this.setState({
                moveStart: false,
                breakStart: false,
                pause: true,
                pauseTimer: this.state.moveStart ? TimerType.MoveTimer : TimerType.BreakTimer
            })
        }
    }
    resetTimer () {
        this.setState({
            ...this.initState,
            resetMoveTimer: !this.state.resetMoveTimer,
            resetBreakTimer: !this.state.resetBreakTimer
        })
    }

    render () {
        return (
            <div>
                <Timer 
                    start={this.state.moveStart} 
                    getCount={this.getMoveCount} 
                    reset={this.state.resetMoveTimer}
                />
                <Timer 
                    start={this.state.breakStart} 
                    getCount={this.getBreakCount}
                    reset={this.state.resetBreakTimer}
                />
                <Button 
                    onClick={this.changeTimer}
                    disabled={this.state.pause}
                >
                    {this.state.init ? 
                        this.message.start : 
                        (this.state.moveStart ? this.message.break : this.message.move)}
                </Button>
                <Button 
                    onClick={this.pauseTimer}
                    disabled={this.state.init}
                >
                    {this.state.pause ? this.message.continue : this.message.pause}
                </Button>
                <Button onClick={this.resetTimer}>
                    重置
                </Button>
            </div>
        )
    }
}