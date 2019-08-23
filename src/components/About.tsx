import React from 'react'
import {Link} from 'react-router-dom'

const About = (props: { children?: React.ReactNode }) => (
    <div>
        <span>about page</span>
        <Link to={'/about/child'}>Child</Link>
    </div>
)

export default About
