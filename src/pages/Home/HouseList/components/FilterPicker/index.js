import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../../components/FilterFooter'

export default class FilterPicker extends Component {
    state = {
        value: this.props.defaultValue
    }

    render() {
        const { onCancel, onSave, dataSource, cols } = this.props
        const { value } = this.state

        return (
            <>
                {/* 选择器组件： */}
                <PickerView data={dataSource} value={value} cols={cols} onChange={value => this.setState({ value })} />

                {/* 底部按钮 */}
                <FilterFooter onCancel={onCancel} onOk={() => onSave(value)} />
            </>
        )
    }
}
