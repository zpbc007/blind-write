import React, { Component } from 'react'
import router from 'react-router'
import * as history from 'history'
import { Layout, Icon } from 'antd'
import SideMenu from '@components/SideMenu/index'
import { Routes, SubRouterView } from '@src/router'
import DocumentTitle from 'react-document-title'
import './index.css'

const { Header, Sider, Content, Footer } = Layout

export interface Prop {
    match: router.match<{id: string}>
    routes: Routes
    location: history.Location
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

        this.getTitle = this.getTitle.bind(this)
        this.toggle = this.toggle.bind(this)
    }

    // 是否合起
    toggle () {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    // 获取页面title
    getTitle () {
        // let { location, routes } = this.props
        // let path = location.pathname
        // routes.filter(item => {
        //     let reg = new RegExp(/\/:\w+\//)
        //     if (reg.exec(item.path) !== null) {

        //     }
        // })
        let title = '无他，唯手熟尔'
        return title
    }

    render () {
        return (
            <Layout style={{minHeight: '100vh'}}>
                {/* 左侧菜单栏 */}
                <Sider
                    trigger={null}
                    collapsible={true}
                    collapsed={this.state.collapsed}
                >
                    <SideMenu/>
                </Sider>
                {/* 右侧内容区域 */}
                <Layout className="right-container">
                    <Header className="header" >
                        <Icon
                            className="menu-trigger"
                            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                            onClick={this.toggle}
                        />
                    </Header>
                    <Content className="content-container" >
                        <div className="component-container">
                            <DocumentTitle title={this.getTitle()}>
                                <SubRouterView routes={...this.props.routes} />
                            </DocumentTitle>
                        </div>
                    </Content>
                    <Footer>
                        <div className="footer">
                            Copyright <Icon type="copyright" /> 2018 无他，唯手熟尔
                        </div>
                    </Footer>
                </Layout>
            </Layout>
        )
    }
} 