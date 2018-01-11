import React, { Component } from 'react'
import router from 'react-router'
import { Layout } from 'antd'
const { Header, Sider, Content} = Layout
import './index.css'

import SideMenu from '@components/SideMenu/index'
import { MenuContentList, MenuContentItem } from '@constant/MenuContentList'
import MenuCard from '@components/MenuCard/index'
import { Routes, SubRouterView } from '@route/router'

export interface Prop {
    match: router.match<{id: string}>
    routes: Routes
}

export interface State {
    collapsed: boolean,
    contentList?: Array<MenuContentItem>
}

export default class LayoutContent extends Component<Prop, State> {

    constructor (props: Prop) {
        super(props)
        this.state = {
            collapsed: false,
            contentList: []
        }
        this.onCollapse = this.onCollapse.bind(this)
        this.searchContent = this.searchContent.bind(this)
    }

    // 初次进入
    componentWillMount () {
        console.log('test 1', this.props.routes)
        this.searchContent(this.props.match.params)
    }

    // prop改变
    componentWillReceiveProps (nextProps: Prop) {
        console.log('test 2', this.props.routes)
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.searchContent(nextProps.match.params)
        }
    }

    // 是否合起
    onCollapse () {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }
    // 导航到对应页面
    searchContent (key: {id: string}) {
        this.setState({
            ...this.state,
            contentList: MenuContentList[key.id]
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
                        <div className="card-container">
                            {
                                this.state.contentList ? 
                                    this.state.contentList.map((contentItem: MenuContentItem) => {
                                        return (
                                            <MenuCard
                                                key={contentItem.link}
                                                text={contentItem.text}
                                                icon={contentItem.icon}
                                                link={contentItem.link}
                                                info={contentItem.info}
                                                url={this.props.match.url}
                                            />
                                        )
                                    }) : 
                                    '暂无数据'
                            }
                        </div>
                        <div className="component-container">
                            <SubRouterView routes={...this.props.routes} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        )
    }
} 