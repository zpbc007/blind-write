import React from 'react'
import { connect, Dispatch } from 'react-redux'
import { setRestSeconds, setSportSeconds, addCount, ActionType } from './action'
import StoreState, { Sport } from '@src/store'
import TwoTimers from '@components/Timer/TwoTimers/index'
import { Form, Input, Row, Col } from 'antd'
import { FormComponentProps } from 'antd/lib/form'

interface FormProps {
    sportSeconds: number,
    restSeconds: number,
    count: number
}

const SportInfoForm = Form.create<FormProps>({
    mapPropsToFields(props: FormProps) {
        return {
            sportSeconds: Form.createFormField({
                value: props.sportSeconds
            }),
            restSeconds: Form.createFormField({
                value: props.restSeconds
            }),
            count: Form.createFormField({
                value: props.count
            })
        }
    }
})((props) => {
    const { getFieldDecorator } = props.form
    const formItemLayout = {
        labelCol: {
            sm: {span: 7, offset: 1}
        },
        wrapperCol: {
            sm: {span: 15}
        }
    }

    return (
        <Form>
            <Form.Item 
                {...formItemLayout}
                label="运动时间"
            >
                {getFieldDecorator('sportSeconds')(<Input />)}
            </Form.Item>
            <Form.Item 
                {...formItemLayout}
                label="休息时间"
            >
                {getFieldDecorator('restSeconds')(<Input />)}
            </Form.Item>
            <Form.Item
                {...formItemLayout}
                label="组数"
            >
                {getFieldDecorator('count')(<Input />)}
            </Form.Item>
        </Form>
    )
})

interface Props extends FormComponentProps {
    sportTime: string,
    restTime: string,
    setRestSeconds: (seconds: number) => any,
    setSportSeconds: (seconds: number) => any,
    addCount: () => any,
    store: Sport
}

/**
 * 记录运动信息页面
 * 将秒表时间存入store中
 */
class Record extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props)

        this.getSportTime = this.getSportTime.bind(this)
        this.getRestTime = this.getRestTime.bind(this)
    }

    getSportTime(seconds: number) {
        this.props.setSportSeconds(seconds)
        this.props.addCount();
    }

    getRestTime(seconds: number) {
        this.props.setRestSeconds(seconds)
    }

    render () {
        return (
            <div>
                <Row>
                    <Col span={12}>
                        <SportInfoForm
                            sportSeconds={this.props.store.sportSeconds}
                            restSeconds={this.props.store.restSeconds}
                            count={this.props.store.count}
                        />
                    </Col>
                    <Col span={12}>
                        <TwoTimers
                            moveSecondChange={this.getSportTime}
                            breakSecondChange={this.getRestTime}
                        />
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(store: StoreState) {
    return {
        store: store.sport
    }
}

function mapDispatchToProps(dispatch: Dispatch<ActionType>) {
    return {
        setRestSeconds: (seconds: number) => dispatch(setRestSeconds(seconds)),
        setSportSeconds: (seconds: number) => dispatch(setSportSeconds(seconds)),
        addCount: () => dispatch(addCount())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Record)