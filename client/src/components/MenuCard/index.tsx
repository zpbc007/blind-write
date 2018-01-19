import React from 'react'
import { MenuContentItem } from '@constant/MenuContentList'
import { Link } from 'react-router-dom'
import { generateLink } from '@constant/MenuContentList'

import { Card, Icon, Row, Col } from 'antd'
const { Meta } = Card

import './index.less'

interface Prop {
    url: string,
    contentItem: MenuContentItem,
    style?: React.CSSProperties
}

export default class MenuCard extends React.Component<Prop, {}> {

    constructor (props: Prop) {
        super(props)
    }

    render () {
        return (
            <Card 
                title={this.props.contentItem.title}
                actions={[
                    <Link to={generateLink(this.props.contentItem, this.props.url)} key="link">
                        <Icon type="login" className="enter-icon" />
                    </Link>
                ]}
            >
                <Row type="flex" justify="space-around" align="middle">
                    <Col span={8} className="content-icon-container">
                        <Icon type={this.props.contentItem.icon} className="content-icon"/>
                    </Col>
                    <Col span={16} className="content-info-container">
                        <Meta description={this.props.contentItem.info}/>
                    </Col>
                </Row>
            </Card>
        )
    }
}