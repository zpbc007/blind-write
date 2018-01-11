import React from 'react'
import { MenuContentItem } from '@constant/MenuContentList'
import { Link } from 'react-router-dom'
import { generateLink } from '@constant/MenuContentList'

interface Prop {
    url: string,
    contentItem: MenuContentItem
}

export default class MenuCard extends React.Component<Prop, {}> {

    constructor (props: Prop) {
        super(props)
    }

    render () {
        return (
            <div>
                <span>text: {this.props.contentItem.text}</span><br/>
                <span>icon: {this.props.contentItem.icon}</span><br/>
                <span>link: {this.props.contentItem.link}</span><br/>
                <Link to={generateLink(this.props.contentItem, this.props.url)}>{this.props.contentItem.text}</Link>
                <span>info: {this.props.contentItem.info}</span><br/>
            </div>
        )
    }
}