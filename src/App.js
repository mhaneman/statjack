import './App.css';

import Table from './components/Table';
import CountGraph from './components/CountGraph';

import {useState, useEffect} from 'react';

const initalizeShoe = shoeSize => {
    let deck = [];
    let numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    let suits = ['spades', 'clubs', 'hearts', 'diamonds'];

    for (let i = 0; i < shoeSize; i++)
        for (let j of numbers) 
            for (let k of suits) 
                deck.push({number: j, suit: k})

    return deck;
}

const getHandSum = (state) => {
    var sum = 0;
    var aces = 0;

    for (let i of state) {
        if (i.number === 'A')
            aces += 1;
        else if (typeof i.number === 'string')
            sum += 10;
        else 
            sum += i.number 
    }

    while (aces) {
        if (sum + 11 > 21)
            sum += 1;
        else
            sum += 11;
        aces -= 1;
    }

    return sum;
}

const getCount = (card) => {
    if (typeof card.number === 'string' || card.number === 10)
        return -1;
    if (card.number >= 7 && card.number <= 9)
        return 0;
    return 1;
}

function App() {

    const [gameState, setGameState] = useState(0);

    const [shoe, setShoe] = useState(initalizeShoe(8));
    const [count, setCount] = useState([]);

    const [player, setPlayer] = useState({hand: [], sum: 0});
    const [house, setHouse] = useState({hand: [], sum: 0});

    const [chips, setChips] = useState({bet: 10, pocket: 50});


    // get random card from deck and add it to the count
    const getRandomCard = (index) => {
        let randNum = Math.floor((Math.random() * shoe.length));
        let card = shoe.splice(randNum, 1)[0];
        setCount(prevItems => [...prevItems, (count.length ? count[count.length - 1] : 0) + getCount(card)]);
        return card;
    }

    const hit = (state, setState) => {
        let card = getRandomCard();
        let newHand = [...state.hand, card];
        setState({hand: newHand, sum: getHandSum(newHand)});
    }
    
    useEffect(() => {

        switch(gameState) {

            //initalize board
            case 1:
                let newHand = [getRandomCard()];
                setHouse({hand: newHand, sum: getHandSum(newHand)});
                newHand = [getRandomCard(), getRandomCard()];
                setPlayer({hand: newHand, sum: getHandSum(newHand)});
                
                setGameState(2);
                break;

            //check if user goes over 21
            case 2:
                if (player.sum > 21) {
                    setGameState(4);
                    hit(house, setHouse);
                }
                break;
            
            //house bets
            case 3:
                var hand = house.hand;
                var sum = house.sum;

                while (sum < 17) {
                    let card = getRandomCard();
                    hand = [...hand, card];
                    sum = getHandSum(hand);
                }
                setHouse({hand: hand, sum: sum});

                setGameState(4);
                break;

            // deterine bets
            case 4:
                switch (true) {
                    case player.sum > 21:
                        setChips({pocket: chips.pocket - chips.bet, bet: 10});
                        break;
                    
                    case player.sum > house.sum || house.sum > 21:
                        setChips({pocket: chips.pocket + chips.bet, bet: 10});
                        break;

                    case player.sum < house.sum:
                        setChips({pocket: chips.pocket - chips.bet, bet: 10});
                        break;

                    default:
                        console.log("default");
                }
                setGameState(5);
                break;
            
            //reset
            case 5:
                const timer = setTimeout(() => {
                    setHouse({hand: [], sum: 0});
                    setPlayer({hand: [], sum: 0});
                    setGameState(0);
                }, 2000);
                return () => clearTimeout(timer);
            
            default:
                console.log("default");
        }

    }, [gameState, player, house]);

    
    //handle button click
    const handleHit = () => {
        hit(player, setPlayer);
    }

    const handleStay = () => {
        setGameState(3);
    }

    const handleIncreaseBet = () => {
        if (chips.bet < chips.pocket)
            setChips({...chips, bet: chips.bet += 10});
    }

    const handleDecreaseBet = () => {
        if (chips.bet > 10)
        setChips({...chips, bet: chips.bet -= 10});
    }

    const handleSubmitBet = () => {
        setGameState(1);
    }

  return (
    <div className = 'app'>
        <Table 
            house = {house}
            player = {player}
            chips = {chips}
            gameState = {gameState}
        />

        <div className='actionBar'>
            <button onClick = { handleHit } disabled = { gameState !== 2 }> Hit </button>
            <button onClick = { handleStay } disabled = { gameState !== 2 }> Stay </button>
            <button onClick = { handleIncreaseBet } disabled = { gameState >= 1 }> Bet + </button>
            <button onClick = { handleDecreaseBet } disabled = { gameState >= 1 }> Bet - </button>
            <button onClick = { handleSubmitBet } disabled = { gameState >= 1 }> Submit Bet </button>
        </div>

        <CountGraph 
            count = {count} 
        />
    </div>
  );
}

export default App;
