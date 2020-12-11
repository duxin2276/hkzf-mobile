import { Route, Redirect } from 'react-router-dom'
import { Auth } from '../utils'

export const AuthRoute = ({ path, component: Component, render, ...rest }) => (
    <Route {...rest} path={path} render={props => Auth.isLogin ?
        render ? render(props) : <Component {...props} /> :
        <Redirect to={{ pathname: '/login', backUrl: path }} />} />
)
