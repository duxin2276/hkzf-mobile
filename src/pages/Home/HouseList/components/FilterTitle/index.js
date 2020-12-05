import React from 'react'

import { Flex } from 'antd-mobile'

import styles from './index.module.css'

// 条件筛选栏标题数组：
const titleList = [
    { title: '区域', type: 'area' },
    { title: '方式', type: 'mode' },
    { title: '租金', type: 'price' },
    { title: '筛选', type: 'more' }
]

export default function FilterTitle({ titleStatus, changeStatus }) {
    return (
        <Flex align="center" className={styles.root}>
            {titleList.map((i, idx) => {
                const current = 1 << idx;
                
                return (
                    <Flex.Item key={i.type} onClick={() => changeStatus(current)}>
                        {/* 选中类名： selected */}
                        <span className={[styles.dropdown, ...current & titleStatus ? [styles.selected] : []].join(' ')}>
                            <span>{i.title}</span>
                            <i className="iconfont icon-arrow" />
                        </span>
                    </Flex.Item>
                )
            })}
        </Flex>
    )
}
