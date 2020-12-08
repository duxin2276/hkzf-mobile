import React, { Component } from 'react';

export default class Sticky extends Component {
    render() {
        return (
            <div>
                {/* 用来永远顶开内容的框架 */}
                <div style={{height: 180}}>{this.props.children}</div>
            </div>
        )
    }
}
