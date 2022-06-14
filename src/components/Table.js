import './Table.css'

import { ReactComponent as PokerChip } from '../PokerChip.svg'

import {useState, useEffect} from 'react'

import Card from './Card'

const useDelayedRender = delay => {
    const [delayed, setDelayed] = useState(true);
    useEffect(() => {
      const timeout = setTimeout(() => setDelayed(false), delay);
      return () => clearTimeout(timeout);
    }, []);
    return fn => !delayed && fn();
};

const DelayedCard = ({card, delay}) => {
    const delayedRender = useDelayedRender(delay);
    return (
        delayedRender(() =>   
            <Card className = 'table__card'
                value = {card.number}
                suit = {card.suit}
            />
        )
    );
}

const DelayedHand = ({cards, sums, delay}) => {
    return (
        cards.map((card, i) => 
            <DelayedCard
                card = {card}
                delay = {delay * i}
            />
        )
    );
}

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
