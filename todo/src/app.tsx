import React from 'react';
import Icon from './icon.png';
import './style.css';
import './style.css';

export default function App () : JSX.Element  {
    return <>
    <img src={Icon} alt="Icon" style={{padding:20, margin:30}}/>
    <div className="hello">hi</div>
    </>;
}