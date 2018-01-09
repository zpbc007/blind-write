import React, { Component } from 'react'
import { Layout } from 'antd'
const { Header, Sider, Content} = Layout
import { ClickParam } from 'antd/lib/menu'

import SideMenu from '@components/SideMenu/SideMenu'
import { MenuContentList, MenuContentItem } from '@constant/MenuContentList'
import MenuCard from '@components/MenuCard/MenuCard'
import router from '@route/router'

export interface State {
    collapsed: boolean,
    contentList?: Array<MenuContentItem>
}

export interface Prop {}

export default class App extends Component<Prop, State> {

    constructor (props: Prop) {
        super(props)
        this.state = {
            collapsed: false,
            contentList: []
        }
        this.onCollapse = this.onCollapse.bind(this)
        this.searchContent = this.searchContent.bind(this)
    }

    onCollapse () {
        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    searchContent ({key}: ClickParam) {
        this.setState({
            ...this.state,
            contentList: MenuContentList[key]
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
                    <SideMenu 
                        menuClick={this.searchContent}
                    />
                </Sider>
                {/* 右侧内容区域 */}
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}/>
                    <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
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
                                        />
                                    )
                                }) : 
                                '暂无数据'
                        }
                        {
                            router()
                        }
                    </Content>
                </Layout>
            </Layout>
        )
    }
} 