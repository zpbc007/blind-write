import React, { Component } from 'react'
import router from 'react-router'
import * as history from 'history'
import { Layout, Icon } from 'antd'
import SideMenu from '@components/SideMenu/index'
import { Routes, SubRouterView } from '@src/router'
import DocumentTitle from 'react-document-title'
import './index.less'

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
        const { location, routes } = this.props
        const path = location.pathname
        const reg = /\/layoutContent\/:\w*\//
        const reg2 = /\/layoutContent\/\w*\//
        const currentPathId = path.replace(reg2, '') 
        let title = '无他，唯手熟尔'
        routes.map(item => {
            let itemPath = item.path
            if (itemPath) {
                if (itemPath.replace(reg, '') === currentPathId ) {
                    if (item.title) {
                        title = item.title
                    }
                }
            }
        })
        
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