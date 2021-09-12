import './Card.css'

import React from 'react'
import { GiSpades, GiHearts, GiDiamonds, GiClubs } from 'react-icons/gi';

const Suit = (suit) => {
    switch (suit) {
        case 'spades':
            return <GiSpades />
        case 'hearts':
            return <GiHearts />
        case 'diamonds':
            return <GiDiamonds />
        case 'clubs':
            return <GiClubs />
        default:
            return <> </>
    }
}

function Card({value, suit, faceup}) {
    return (
        faceup ? 
            <div className='card' style = {{backgroundColor: 'rgb(73, 73, 73)'}}>
                <div className='card__value' >
                    <h3> {value} </h3>
                    { Suit(suit) }
                </div>
            </div>
        :
            <div className='card' style = {{backgroundColor: 'rgb(23, 23, 23)'}}>
            </div>
    )
}

export default Card;
