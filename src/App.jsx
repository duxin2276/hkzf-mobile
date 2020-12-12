import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

// 页面组件导入。
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import Rent from './pages/Rent'
import RentAdd from './pages/Rent/Add'
import RentSearch from './pages/Rent/Search'
import { AuthRoute } from './components/AuthRoute'

import { Provider } from './store'

class GlobalStore extends Component {
    state = {
        community: {}
    }

    setCommunity(value) {
        this.setState({ community: value })
    }

    render() {
        const { community } = this.state;

        return (
            <Provider value={{
                community,
                setCommunity: this.setCommunity.bind(this)
            }}>
                {this.props.children}
            </Provider>
        )
    }
}

export default class App extends Component {
    render() {
        return (
            <GlobalStore>
                <Router>
                    <div className="app">
                        <Route path="/" exact render={() => <Redirect to="/home" />} />
                        <Route path="/home" component={Home} />
                        <Route path="/citylist" component={CityList} />
                        <AuthRoute path="/map" component={Map} />
                        <Route path="/detail/:id" component={HouseDetail} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/rent" exact component={Rent} />
                        <Route path="/rent/add" component={RentAdd} />
                        <Route path="/rent/search" component={RentSearch} />

                        <AuthRoute path="/vip" render={props => <h1>邀请码：6TGO341, {props.location.pathname}</h1>} />
                    </div>
                </Router>
            </GlobalStore>
        )
    }
}
