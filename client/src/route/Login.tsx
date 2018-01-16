import React from 'react'
import { Button } from 'antd'

export default class TestPage extends React.Component<{}, {}> {
    constructor (props: {}) {
        super(props)

        this.getData = this.getData.bind(this)
    }

    getData () {
        fetch('/d3/test')
    }

    render () {
        return (
            <div>
                <Button type="primary" onClick={this.getData}>login</Button>
            </div>
        )
    }
}