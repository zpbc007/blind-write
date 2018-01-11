import React, { Component } from 'react'
import { RouterView } from '@src/router'
// 渲染路由对应组件
export default class App extends Component<{}, {}> {
    render () {
        return (
            <div>
                <RouterView/>
            </div>
        )
    }
} 