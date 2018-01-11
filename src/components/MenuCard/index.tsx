import React from 'react'
import { MenuContentItem } from '@constant/MenuContentList'
import { Link } from 'react-router-dom'

interface Prop extends MenuContentItem {
    url: string
}

export default class MenuCard extends React.Component<Prop, {}> {

    constructor (props: Prop) {
        super(props)
    }

    render () {
        return (
            <div>
                <span>text: {this.props.text}</span><br/>
                <span>icon: {this.props.icon}</span><br/>
                <span>link: {this.props.link}</span><br/>
                <Link to={`${this.props.url}${this.props.link}`}>{this.props.text}</Link>
                <span>info: {this.props.info}</span><br/>
            </div>
        )
    }
}