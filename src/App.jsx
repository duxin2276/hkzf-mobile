import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

// 页面组件导入。
import Home from './pages/Home'
import CityList from './pages/CityList'
import Map from './pages/Map'
import HouseDetail from './pages/HouseDetail'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthRoute } from './components/AuthRoute'

export default class App extends Component {
    render() {
        return (
            <Router>
                <div className="app">
                    <Route path="/" exact render={() => <Redirect to="/home" />} />
                    <Route path="/home" component={Home} />
                    <Route path="/citylist" component={CityList} />
                    <AuthRoute path="/map" component={Map} />
                    <Route path="/detail/:id" component={HouseDetail} />
                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                    <AuthRoute path="/vip" render={props => <h1>邀请码：6TGO341, { props.location.pathname}</h1>} />
                </div>
            </Router>
        )
    }
}
