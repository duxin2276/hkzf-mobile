import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Flex, WingBlank, WhiteSpace, Toast } from 'antd-mobile'


import NavHeader from '../../components/NavHeader'

import styles from './index.module.css'
import { API } from '../../utils/api'
import { FormInput } from '../../components/FormInput'
import { Auth } from '../../utils'

// 验证规则：
// const REG_UNAME = /^[a-zA-Z_\d]{5,8}$/
// const REG_PWD = /^[a-zA-Z_\d]{5,12}$/

class Login extends Component {
    state = {
        username: ['', false],
        password: ['', false]
    }

    inputChangeHandler({ name, value, validated }) {
        this.setState({ [name]: [value, validated]})
    }

    async login() {
        const { username: [username], password: [password] } = this.state

        const { status, body, description} = await API.post('/user/login', { username, password });

        if (status === 200) {
            Auth.token = body.token;
            
        } else Toast.fail(description)
    }

    submitHandler(e) {
        e.preventDefault();
        const { username, password } = this.state

        if (username[1] && password[1]) this.login()
        else {
            this.refList.forEach(i => i.onBlurHandler())
            Toast.fail('请输入正确的内容。')
        }
    }

    refList = []

    render() {
        const { username, password } = this.state

        return (
            <div className={styles.root}>
                {/* 顶部导航 */}
                <NavHeader className={styles.navHeader}>账号登录</NavHeader>
                <WhiteSpace size="xl" />

                {/* 登录表单 */}
                <WingBlank>
                    <form onSubmit={this.submitHandler.bind(this)}>
                        <FormInput
                            ref={el => this.refList[0] = el}
                            name="username"
                            value={username[0]}
                            onChange={this.inputChangeHandler.bind(this)}
                            regex="^[a-zA-Z0-9]{3,20}$"
                            max={20}
                            min={3}
                        ></FormInput>
                        <FormInput
                            ref={el => this.refList[1] = el}
                            name="password"
                            value={password[0]}
                            onChange={this.inputChangeHandler.bind(this)}
                            max={20}
                            min={3}
                            isPassword
                        ></FormInput>
                        {/* <div className={styles.formItem}>
                            <input
                                className={styles.input}
                                name="username"
                                placeholder="请输入账号"
                                value={username}
                                onChange={this.inputChangeHandler.bind(this)}
                            />
                        </div> */}
                        {/* 长度为5到8位，只能出现数字、字母、下划线 */}
                        {/* <div className={styles.error}>账号为必填项</div> */}
                        {/* 长度为5到12位，只能出现数字、字母、下划线 */}
                        {/* <div className={styles.error}>账号为必填项</div> */}
                        <div className={styles.formSubmit}>
                            <button className={styles.submit} type="submit">登 录</button>
                        </div>
                    </form>
                    <Flex className={styles.backHome}>
                        <Flex.Item>
                            <Link to="/register">还没有账号，去注册~</Link>
                        </Flex.Item>
                    </Flex>
                </WingBlank>
            </div>
        )
    }
}

export default Login
