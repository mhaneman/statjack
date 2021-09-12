import './CountGraph.css'

import React from 'react'
import { ResponsiveContainer, Tooltip, LineChart, Line, YAxis, XAxis} from 'recharts';

const getCount = (card) => {
    if (typeof card === 'string' || card === 10)
        return -1;
    if (card <= 9 && card >= 7)
        return 0;
    return 1; 
}

function CountGraph({usedCards}) {
    
    let currentCount = 0;
    let data = usedCards.map((card, i) => {
        currentCount = getCount(card.number) + currentCount;
        return {order: i, count: currentCount};
    });

    return (
        <div className='countGraph'>
            <ResponsiveContainer width="95%" height={200}>
                <LineChart data={data}>

                    <Line type="monotone" dataKey="count" stroke="#8884d8" isAnimationActive = {false} />

                    <XAxis hide
                        type="number"
                        dataKey = "order"
                        allowDataOverflow = {true}
                        domain = {[0, 104]} 
                    />

                    <YAxis
                        allowDataOverflow = {true}
                        tickLine = {false}
                        ticks = {[-4, 4]}
                        domain = {[-8, 8]} 
                    />

                    {/* <Tooltip /> */}

                </LineChart>
            </ResponsiveContainer>

        </div>
    )
}

export default CountGraph

