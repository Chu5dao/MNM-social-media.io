import { Route, Navigate } from 'react-router-dom'

const PrivateRouter = (props) => {
    const firstLogin = localStorage.getItem('persist:root')
    return firstLogin ? <Route {...props} /> : <Navigate to="/" />
}

export default PrivateRouter