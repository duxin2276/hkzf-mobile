import React, { Component } from 'react'

import styles from './forminput.module.css'

export class FormInput extends Component {
    tipsMapper = {
        0: '错误',
        10: this.props.tipInfo || '您输入的内容不符合要求，请修改您的内容。',
        11: '您输入的内容为空',
        12: '您输入的内容太短了',
        13: '您输入的内容太长了',
        20: ''
    }

    state = {
        value: this.props.value,
        status: 20
    }

    // 字符串是否验证成功。
    get isValidated() {
        return this.state.status === 20;
    }

    // 组件内部报错文本的提示。
    get tips() {
        return this.tipsMapper[this.state.status]
    }

    validate(value) {
        const { onChange, name, regex = '.*', isEmpty, max = 1000, min = 0 } = this.props;
        let status = 0;

        const length = value.length;

        if (length) {
            if (length >= min && length <= max) {
                // 无论是字符串还是正则，都可以转换成正则。
                const reg = new RegExp(regex);

                status = reg.test(value) ? 20 : 10;
            } else if (length < min) {
                status = 12
            } else {
                status = 13
            }
        } else {
            status = isEmpty ? 20 : 11
        }

        // 修改组件内部的状态。
        this.setState({ status, value }, () => {
            // 将用户修改的值传递出去。
            onChange && onChange({ name, value, validated: this.isValidated })
        });
    }

    onChangeHandler({ target: { value } }) {
        this.validate(value);
    }

    onBlurHandler() {
        this.validate.call(this, this.state.value);
    }

    render() {
        const { isPassword } = this.props;
        const { value } = this.state;

        return (
            <>
                <div className={styles['input-box']}>
                    <input type={isPassword ? 'password' : 'text'} className={styles.input} value={value} onBlur={this.onBlurHandler.bind(this)} onChange={this.onChangeHandler.bind(this)} />
                </div>
                <p className={styles.tips}>{this.tips}</p>
            </>
        )
    }
}
