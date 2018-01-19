import React from 'react'
import router from 'react-router'
import { MenuContentList, MenuContentItem } from '@constant/MenuContentList'
import MenuCard from '@components/MenuCard/index'
import { Row, Col } from 'antd'
import './container.less'

interface Props {
    match: router.match<{id: string}>
}

interface State {
    contentList: Array<MenuContentItem>
}

// 根据路由参数取得cardlist数据
export default class Container extends React.Component<Props, State> {
    constructor (props: Props) {
        super(props)
        this.state = {
            contentList: []
        }
        this.searchContent = this.searchContent.bind(this)
    }
    shouldComponentUpdate (nextProps: Props) {
        return nextProps.match.params.id !== this.props.match.params.id
    }
    // 初次进入
    componentWillMount () {
        this.searchContent(this.props.match.params)
    }
    // prop改变
    componentWillReceiveProps (nextProps: Props) {
        if (this.props.match.params.id !== nextProps.match.params.id) {
            this.searchContent(nextProps.match.params)
        }
    }
    // 导航到对应页面
    searchContent (key: {id: string}) {
        this.setState({
            contentList: MenuContentList[key.id] || []
        })
    }
    // [] => [[]]
    createRow (contentList: Array<MenuContentItem>, rowCount: number, aim: Array<Array<MenuContentItem>>) {
        if (contentList.length < rowCount) {
            aim.push(contentList)
        } else {
            aim.push(contentList.slice(0, rowCount))
            this.createRow(contentList.slice(rowCount, contentList.length), rowCount, aim)
        }
    }
    render () {
        let arr: Array<Array<MenuContentItem>> = []
        this.createRow(this.state.contentList, 4, arr)
        if (this.state.contentList.length > 0) {
            return (
                arr.map((rowContentList: Array<MenuContentItem>, rowNum: number) => {
                    return (
                        <Row key={rowNum}>
                            {
                                rowContentList.map((contentItem: MenuContentItem, colNum: number) => {
                                    return (
                                        <Col span={6} key={`${rowNum}-${colNum}`}>
                                            <MenuCard
                                                style={{color: 'red'}}
                                                key={contentItem.link}
                                                contentItem={contentItem}
                                                url={this.props.match.url}
                                            />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                    )
                })
            )
        } else {
            return (
                <div className="no-data">
                    暂无数据
                </div>
            )
        }
    }
}