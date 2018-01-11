import React from 'react'
import router from 'react-router'
import { MenuContentList, MenuContentItem } from '@constant/MenuContentList'
import MenuCard from '@components/MenuCard/index'
import { Routes, SubRouterView } from '@route/router'

interface Prop {
    match: router.match<{id: string}>
    routes: Routes
}

interface State {
    contentList?: Array<MenuContentItem>
}

// 根据路由参数取得cardlist数据
export default class Container extends React.Component<Prop, State> {

    constructor (props: Prop) {
        super(props)
        this.state = {
            contentList: []
        }
        this.searchContent = this.searchContent.bind(this)
    }

    // 初次进入
    componentWillMount () {
        this.searchContent(this.props.match.params)
    }

    // prop改变
    componentWillReceiveProps (nextProps: Prop) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.searchContent(nextProps.match.params)
        }
    }

    // 导航到对应页面
    searchContent (key: {id: string}) {
        this.setState({
            contentList: MenuContentList[key.id]
        })
    }

    render () {
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
    }
}