import './App.sass'
import React from 'react'
import { hot } from 'react-hot-loader/root'
const App: React.FC = (props: { children?: React.ReactNode }) => {
  return <div className="App"></div>
}

export default process.env.NODE_ENV === 'development' ? hot(App) : App
