import React from 'react';
import '../../css/teacher.styl';

function Teacher (props) {
    // console.log(`carloss: ${props.data}`)
    return (
        <li className="teacher">
            { props.name } <a href={`https://twitter.com/${props.twitter}`}>@{props.twitter}</a>
        </li>
    )
}

export default Teacher;