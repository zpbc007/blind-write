import React, { Component } from 'react'
import router from 'react-router'
import { Layout } from 'antd'
const { Header, Sider, Content} = Layout
import './index.css'

import SideMenu from '@components/SideMenu/index'
import { Routes, SubRouterView } from '@src/router'

export interface Prop {
    match: router.match<{id: string}>
    routes: Routes
}

export interface State {
    collapsed: boolean
}

export default class LayoutContent extends Component<Prop, State> {

    constructor (props: Prop) {
        super(props)
        this.state = {
            collapsed: false
        }
        this.onCollapse = this.onCollapse.bind(this)
    }

    // 是否合起
    onCollapse () {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    render () {
        return (
            <Layout style={{minHeight: '100vh'}}>
                {/* 左侧菜单栏 */}
                <Sider
                    collapsible={true}
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <SideMenu/>
                </Sider>
                {/* 右侧内容区域 */}
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}/>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        <div className="component-container">
                            <SubRouterView routes={...this.props.routes} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
} 