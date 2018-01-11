import React from 'react'
import { LoadingComponentProps } from 'react-loadable'

export default class Loading extends React.Component<LoadingComponentProps> {
    render () {
        return (
            <div>
                Loading12 ...
                {this.props.error}
            </div>
            
        )
    }
}