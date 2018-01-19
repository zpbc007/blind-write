import React from 'react'
import { Button, Icon, Tooltip } from 'antd'
import Timer from '../index'

import './index.less'

interface Props {

}

enum TimerType {
    MoveTimer,
    BreakTimer
}

const styles = {
    timerStyle: {
        fontSize: 20
    }
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
    
    private info = {
        start: {
            message: '开始',
            icon: 'play-circle-o'
        },
        move: {
            message: '运动',
            icon: 'heart-o'
        },
        break: {
            message: '休息',
            icon: 'coffee'
        },
        pause: {
            message: '暂停',
            icon: 'pause-circle-o'
        },
        continue: {
            message: '继续',
            icon: 'play-circle-o'
        }
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
    getStartBtnInfo () {
        return this.state.init ? this.info.start : (this.state.moveStart ? this.info.break : this.info.move)
    }
    getPauseBtnInfo () {
        return this.state.pause ? this.info.continue : this.info.pause
    }
    render () {
        return (
            <div className="timers-container">
                <div className="timer-container">
                    <Timer 
                        style={styles.timerStyle}
                        start={this.state.moveStart} 
                        getCount={this.getMoveCount} 
                        reset={this.state.resetMoveTimer}
                        title="运动时间"
                    />
                    <Timer 
                        style={styles.timerStyle}
                        start={this.state.breakStart} 
                        getCount={this.getBreakCount}
                        reset={this.state.resetBreakTimer}
                        title="休息时间"
                    />
                </div>
                <div className="button-group">
                    <Tooltip 
                        title={this.getStartBtnInfo().message}
                        placement="bottom"
                        autoAdjustOverflow={true}
                    >
                        <Button
                            type="primary" 
                            shape="circle"
                            size="large"
                            onClick={this.changeTimer}
                            disabled={this.state.pause}
                        >
                            <Icon 
                                type={this.getStartBtnInfo().icon} 
                            />
                        </Button>
                    </Tooltip>
                    <Tooltip 
                        title={this.getPauseBtnInfo().message}
                        placement="bottom"
                        autoAdjustOverflow={true}
                    >
                        <Button 
                            shape="circle"
                            size="large"                    
                            onClick={this.pauseTimer}
                            disabled={this.state.init}
                        >
                            <Icon 
                                type={this.getPauseBtnInfo().icon}
                            />
                        </Button>
                    </Tooltip>
                    <Tooltip 
                        title="重置"
                        placement="bottom"
                        autoAdjustOverflow={true}
                    >
                        <Button 
                            shape="circle"
                            size="large"                    
                            onClick={this.resetTimer}
                            type="danger"
                        >
                            <Icon 
                                type="reload"
                            />
                        </Button>
                    </Tooltip>
                </div>
            </div>
        )
    }
}