import Deck from './components/Deck'
import Table from './components/Table'
import CountGraph from './components/CountGraph'

import React, { useState, useEffect } from 'react'


// //TODO : sort cards so aces are accounted for last
const getSum = (cards) => {
    var sum = 0;
    for (let i of cards) {
        if (i.number === 'A') {
            if (sum + 11 <= 21)
                sum += 11
            else
                sum += 1
        }
        else if (typeof i.number === 'string')
            sum += 10;
        else
            sum += i.number;
    }
    return sum;
}


let deck = new Deck(2);
function GameLoop() {

    const [dealerCards, setDealerCards] = useState([]);
    const [playerCards, setPlayerCards] = useState([]);

    const [dealerSum, setDealerSum] = useState(0);
    const [playerSum, setPlayerSum] = useState(0);

    const [playerStay, setPlayerStay] = useState(false);

    const [usedCards, setUsedCards] = useState([]);

    const initTable = () => {
        setDealerCards([deck.getRandomCard()]);
        setPlayerCards([deck.getRandomCard()]);
        
        setPlayerCards(prevItems => [...prevItems, deck.getRandomCard()]);
        setDealerCards(prevItems => [...prevItems, deck.getRandomCard()]);
    }

    // initalize the table
    useEffect(() => {
        initTable();
    }, []);


    // when the player 'stays' the dealer adds cards till bust or 17
    // then resets table
    // update the sum of the dealers cards if the player stays
    useEffect(() => {
        if (playerStay) {
            let sum = getSum(dealerCards);
            setDealerSum(sum);
            if (sum < 17) {
                const timeout = setTimeout(() => {
                    setDealerCards(prevItems => [...prevItems, deck.getRandomCard()]);
                }, 1000);
                return () => clearTimeout(timeout);
            } 
            else {
                const timeout = setTimeout(() => {
                    initTable();
                    setPlayerStay(false);
                }, 3000);
                return () => clearTimeout(timeout);
            }
        } else {
            setDealerSum(0);
        }
    }, [playerStay, dealerCards]);

    // update the sum of the players cards and check for bust
    useEffect(() => {
        let sum = getSum(playerCards);

        setPlayerSum(sum);

        if (sum > 21) {
            const timeout = setTimeout(() => {
                initTable();
            }, 3000);
            return () => clearTimeout(timeout);
        }
        
    }, [playerCards]);

    useEffect(() => {
        setUsedCards(deck.getUsedCards())
    });

    const hit = () => setPlayerCards(prevItems => [...prevItems, deck.getRandomCard()]);
    const doubleDown = () => setPlayerCards(prevItems => [...prevItems, deck.getRandomCard()]);
    const stay = () => setPlayerStay(true);
    
    return (
        <>
            <Table 
                dealerCards = {dealerCards}
                dealerSum = {dealerSum}

                playerCards = {playerCards}
                playerSum = {playerSum}
            />

            <button onClick = {hit}> Hit </button>
            <button onClick = {doubleDown}> Double Down </button>
            <button onClick = {stay}> Stay </button>

            <CountGraph 
                usedCards = {usedCards} 
            />
        </>
    )
}

export default GameLoop
