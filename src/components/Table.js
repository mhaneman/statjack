import './Table.css'

import { ReactComponent as PokerChip } from '../PokerChip.svg'


import Card from './Card'
import React from 'react'

function Table({player, chips, house, gameState}) {
    return (
        <div className = 'table'>

            <h3> {gameState.playerBetting ? "Good Luck!" : house.sum} {house.sum > 21 ? "Bust!" : null} </h3>
            <div className = 'table__cards'>
                {
                    house.hand.map(card => 
                        <Card className = 'table__card'
                            value = {card.number}
                            suit = {card.suit}
                        />
                    ) 
                }
                {
                    house.hand.length <= 1 ?
                    <Card className = 'table__card'
                    /> 
                    : null
                }
            </div>

            <h3> {player.sum} {player.sum > 21 ? "Bust!" : null} </h3>
          
            <div className = 'table__cards'>

                { 
                    player.hand.map(card => 
                    <Card className = 'table__card'
                        value = {card.number}
                        suit = {card.suit}
                        faceup = {true}
                    /> )
                }

            <div className = 'table__pocket'>
                <PokerChip className='pokerChip' />
                <h4>Pocket: {chips.pocket}</h4>
                <h4>Bet: {chips.bet}</h4>

            </div>

            </div>
        </div>
    )
}

export default Table;
