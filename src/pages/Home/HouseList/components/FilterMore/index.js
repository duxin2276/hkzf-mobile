import React, { Component } from 'react'

import FilterFooter from '../../../../../components/FilterFooter'

import styles from './index.module.css'

export default class FilterMore extends Component {
    state = {
        selectedValues: []
    }

    onTagClick(value) {
        // 要么数组中有，就删除，要么没有就添加。
        const { selectedValues: [...selectedValues] } = this.state

        selectedValues.some((i, idx, arr) => i === value && arr.splice(idx, 1)) || selectedValues.push(value);

        this.setState({ selectedValues });
    }

    // 渲染标签
    renderFilters(list) {
        const { selectedValues } = this.state

        return list.map(({ label, value }) => {

            const isSelected = selectedValues.includes(value)

            return <span key={value} onClick={this.onTagClick.bind(this, value)} className={[styles.tag, ...isSelected ? [styles.tagActive] : []].join(' ')}>{label}</span>
        })
        // 高亮类名： styles.tagActive
    }

    render() {
        const { dataSource: { roomType, oriented, floor, characteristic } } = this.props

        return (
            <div className={styles.root}>
                {/* 遮罩层 */}
                <div className={styles.mask} />

                {/* 条件内容 */}
                <div className={styles.tags}>
                    <dl className={styles.dl}>
                        <dt className={styles.dt}>户型</dt>
                        <dd className={styles.dd}>{this.renderFilters(roomType)}</dd>

                        <dt className={styles.dt}>朝向</dt>
                        <dd className={styles.dd}>{this.renderFilters(oriented)}</dd>

                        <dt className={styles.dt}>楼层</dt>
                        <dd className={styles.dd}>{this.renderFilters(floor)}</dd>

                        <dt className={styles.dt}>房屋亮点</dt>
                        <dd className={styles.dd}>{this.renderFilters(characteristic)}</dd>
                    </dl>
                </div>

                {/* 底部按钮 */}
                <FilterFooter className={styles.footer} />
            </div>
        )
    }
}
