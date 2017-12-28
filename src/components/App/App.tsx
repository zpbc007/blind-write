import React, { Component } from 'react'
import { Layout } from 'antd'
const { Header, Sider, Content} = Layout

import SideMenu from '@components/SideMenu/SideMenu'

export interface State {
    collapsed: boolean
}

export interface Prop {}

export default class App extends Component<Prop, State> {

    constructor (props: Prop) {
        super(props)
        this.state = {
            collapsed: false
        }

        this.onCollapse = this.onCollapse.bind(this)
    }

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
                    <SideMenu />
                </Sider>
                {/* 右侧内容区域 */}
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}/>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                        content
                    </Content>
                </Layout>
            </Layout>
        )
    }
} 