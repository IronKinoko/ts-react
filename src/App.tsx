import React from 'react'
import {hot} from 'react-hot-loader/root'
import {Link} from 'react-router-dom'


const App: React.FC = (props: { children?: React.ReactNode }) => {
    return (
        <div className="App">
            hello world
            <Link to={'/'}>home</Link>
            <Link to={'/about'}>about</Link>
            {props.children}
        </div>
    )
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App
