import React, { Component } from "react";
import { Carousel, Grid, Flex } from 'antd-mobile'

import './index.less'

import Nav1 from '../../../assets/images/nav-1.png'
import Nav2 from '../../../assets/images/nav-2.png'
import Nav3 from '../../../assets/images/nav-3.png'
import Nav4 from '../../../assets/images/nav-4.png'

const navList = [
    { title: '整租', src: Nav1, path: '/home/list' },
    { title: '合租', src: Nav2, path: '/home/list' },
    { title: '地图找房', src: Nav3, path: '/map' },
    { title: '去出租', src: Nav4, path: '/rent' },
]

export default class Index extends Component {
    state = {
        carouselList: [],
        groupList: []
    }

    async getCarouselList() {
        const res = await (await fetch('http://127.0.0.1:8080/home/swiper')).json();

        this.setState({ carouselList: res.body})
    }

    async getGroupList() {
        const res = await (await fetch('http://127.0.0.1:8080/home/groups?area=AREA|88cff55c-aaa4-e2e0')).json();

        this.setState({ groupList: res.body }, () => console.log(this.state))
    }

    componentDidMount() {
        this.getCarouselList();
        this.getGroupList();
    }

    renderCarousel() {
        const { carouselList } = this.state;
            
        return (
            <Carousel key={carouselList.length} infinite autoplay>
                {carouselList.map((i, idx) => (
                    <a key={idx} href="#">
                        <img src={`http://127.0.0.1:8080${i.imgSrc}`} alt=""/>
                    </a>
                ))}
            </Carousel>
        )
    }

    renderNavList() {
        return (
            <div className="nav-box">
                {navList.map((i, idx) => (
                    <div key={idx} className="item" onClick={() => this.props.history[i.path.startsWith('/home') ? 'replace' : 'push'](i.path)}>
                        <img src={i.src} alt="" />
                        <span>{i.title}</span>
                    </div>
                ))}
            </div>
        )
    }

    renderGroupList() {
        return (
            <div className="group">
                <h3 className="group-title">
                    租房小组 <span className="more">更多</span>
                </h3>

                {/* 宫格组件 */}
                <Grid
                    data={this.state.groupList}
                    columnNum={2}
                    square={false}
                    hasLine={false}
                    renderItem={item => (
                        <Flex className="group-item" justify="around" key={item.id}>
                            <div className="desc">
                                <p className="title">{item.title}</p>
                                <span className="info">{item.desc}</span>
                            </div>
                            <img src={`http://127.0.0.1:8080${ item.imgSrc }`} alt="" />
                        </Flex>
                    )}
                />
            </div>

        )
    }

    render() {
        return (
            <div className="index">
                {/* 轮播图区域 */}
                {this.renderCarousel()}
                {/* 导航区域 */}
                {this.renderNavList()}
                {/* 租房小组区域 */}
                {this.renderGroupList()}
            </div>
        )
    }
}
