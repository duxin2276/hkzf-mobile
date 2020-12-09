import React, { Component } from 'react'

import styles from './forminput.module.css'

export class FormInput extends Component {
    render() {
        return (
            <>
                <div className={styles['input-box']}>
                    <input className={styles.input} type="text" />
                </div>
                <p className={styles.tips}>dfgdgdgdg</p>
            </>
        )
    }
}
