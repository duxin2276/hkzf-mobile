import React, { Component } from "react";
import { Carousel } from 'antd-mobile'

export default class Index extends Component {
    state = {
        carouselList: ['1', '2', '3']
    }

    async getCarouselList() {
        const res = await (await fetch('http://127.0.0.1:8080/home/swiper')).json();

        this.setState({ carouselList: res.body})
    }

    componentDidMount() {
        this.getCarouselList();
    }

    renderCarousel() {
        const { carouselList } = this.state;
            
        return (
            <Carousel>
                {carouselList.map(i => (
                    <a>
                        <img src="" alt=""/>
                    </a>
                ))}
            </Carousel>
        )
    }

    render() {
        return (
            <div>
                {/* 轮播图区域 */}
                
            </div>
        )
    }
}
