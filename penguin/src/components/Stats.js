import React, { useEffect, useState } from 'react'
import styles from './Stats.module.css'
const Stats = (props) => {
    const [epoch, setEpoch] = useState(0)

    const setSeconds = () => {
        let secondsSinceEpoch = Math.round(Date.now() / 1000)
        return secondsSinceEpoch
    }
    setInterval(()=>{setEpoch(setSeconds)}, 1000)

    return (
        <div>
            <ul>
                <li><a href="https://www.kernel.org/doc/man-pages/" target="_blank">Official</a> &bull;&nbsp;</li>
                <li>results: {props.dataLength} &bull;&nbsp;</li>
                <li>epochTime: {epoch}&nbsp;</li>
            </ul>
        </div> 
    )
}

export default Stats
