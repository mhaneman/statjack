import './Table.css'

import Card from './Card'
import React from 'react'

function Table({dealerCards, dealerSum, playerCards, playerSum}) {
    return (
        <div className = 'table'>

            <h3> {dealerSum === 0 ? "Good Luck!" : dealerSum} {dealerSum > 21 ? "Bust!" : null} </h3>
            <div className = 'table__cards'>
                { 
                    dealerCards.map((card, i) => 
                        i === 0 && dealerSum === 0 ?
                        <Card className = 'table__card'
                            value = {card.number}
                            suit = {card.suit} 
                            faceup = {false}
                        /> 
                        :
                        <Card className = 'table__card'
                            value = {card.number}
                            suit = {card.suit} 
                            faceup = {true}
                        /> 
                    )
                }
            </div>

            <h3> {playerSum} {playerSum > 21 ? "Bust!" : null} </h3>
          
            <div className = 'table__cards'>

                { 
                    playerCards.map(card => 
                    <Card className = 'table__card'
                        value = {card.number}
                        suit = {card.suit}
                        faceup = {true}
                    /> )
                }
            </div>
        </div>
    )
}

export default Table;
