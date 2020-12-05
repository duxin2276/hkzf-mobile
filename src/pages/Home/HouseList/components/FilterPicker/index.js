import React, { Component } from 'react'

import { PickerView } from 'antd-mobile'

import FilterFooter from '../../../../../components/FilterFooter'

export default class FilterPicker extends Component {
    render() {
        const { onCancel, dataSource, cols } = this.props

        return (
            <>
                {/* 选择器组件： */}
                <PickerView data={dataSource} value={null} cols={cols} />

                {/* 底部按钮 */}
                <FilterFooter onCancel={onCancel} />
            </>
        )
    }
}
