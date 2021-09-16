import './CountGraph.css'

import React from 'react'
import { ResponsiveContainer, Tooltip, LineChart, Line, YAxis, XAxis} from 'recharts';

function CountGraph({ count }) {

    let runningCount = count.map((c, i) => {
        return {order: i, count: c};
    });

    let trueCount = count.map((c, i) => {
        return {order: i, count: c * (i/416)};
    });

    return (
        <div className='countGraph'>
            <ResponsiveContainer width="95%" height={200}>
                <LineChart data={runningCount}>

                    <Line type="monotone" dataKey="count" stroke="#8884d8" isAnimationActive = {false} />

                    <XAxis hide
                        type="number"
                        dataKey = "order"
                        allowDataOverflow = {true}
                        domain = {[0, 416]} 
                    />

                    <YAxis
                        allowDataOverflow = {true}
                        tickLine = {false}
                        ticks = {[0]}
                        domain = {[-30, 30]} 
                    />

                </LineChart>
            </ResponsiveContainer>

            <ResponsiveContainer width="95%" height={200}>
                <LineChart data={trueCount}>

                    <Line type="monotone" dataKey="count" stroke="#8884d8" isAnimationActive = {false} />

                    <XAxis hide
                        type="number"
                        dataKey = "order"
                        allowDataOverflow = {true}
                        domain = {[0, 416]} 
                    />

                    <YAxis
                        allowDataOverflow = {true}
                        tickLine = {false}
                        ticks = {[0]}
                        domain = {[-8, 8]} 
                    />

                </LineChart>
            </ResponsiveContainer>

        </div>
    )
}

export default CountGraph

