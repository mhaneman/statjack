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

    const [gameState, setGameState] = useState({
        placedBet: false,
        playerBetting: false,
        houseBetting: false,
    });

    const [shoe, setShoe] = useState(initalizeShoe(8));
    const [count, setCount] = useState([]);

    const [player, setPlayer] = useState({hand: [], sum: 0});
    const [house, setHouse] = useState({hand: [], sum: 0});

    const [chips, setChips] = useState({bet: 10, pocket: 50});


    // get random card from deck
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

    const houseLogic = () => {
        while (house.sum < 17) {
            hit(house, setHouse);
        }
    }

    // TODO: refactor this block of spaggetii
    
    useEffect(() => {

        // reset cards for new round
        if (!gameState.playerBetting && !gameState.houseBetting) {

            let newHand = [getRandomCard()];
            setHouse({hand: newHand, sum: getHandSum(newHand)});

            newHand = [getRandomCard(), getRandomCard()];
            setPlayer({hand: newHand, sum: getHandSum(newHand)});

            setGameState({playerBetting: true, houseBetting: false});
        }

        // dont let player place more bets over 21
        if (gameState.playerBetting && !gameState.houseBetting) {
            if (player.sum > 21) {
                chips.pocket -= chips.bet;
                setGameState({playerBetting: false, houseBetting: false});
            }
        }

        // the house bets
        if (!gameState.playerBetting && gameState.houseBetting) {
            if (house.sum >= 17) {
                const timer = setTimeout(() => {

                    if (player.sum > house.sum || house.sum > 21)
                        chips.pocket += chips.bet;
                    else if (player.sum < house.sum)
                        chips.pocket -= chips.bet;

                    setGameState({playerBetting: false, houseBetting: false});

                }, 2000);
                return () => clearTimeout(timer);

            } else {
                const timer = setTimeout(() => {

                    hit(house, setHouse);

                }, 1500);
                return () => clearTimeout(timer);
            }
        }

    }, [gameState, player, house]);

    //handle button click
    const handleHit = () => {
        hit(player, setPlayer);
    }

    const handleStay = () => {
        setGameState({playerBetting: false, houseBetting: true});
    }

    const handleIncreaseBet = () => {
        if (chips.bet < chips.pocket)
            setChips({...chips, bet: chips.bet += 10})
    }

    const handleDecreaseBet = () => {
        if (chips.bet > 10)
        setChips({...chips, bet: chips.bet -= 10})
    }

    const handleSubmitBet = () => {
        gameState.placedBet = true;
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
            <button onClick = { handleHit } disabled = { !gameState.playerBetting }> Hit </button>
            <button onClick = { handleStay } disabled = { gameState.houseBetting || !gameState.playerBetting }> Stay </button>
            <button onClick = { handleIncreaseBet }> Bet + </button>
            <button onClick = { handleDecreaseBet }> Bet - </button>
            <button onClick = { handleSubmitBet }> Submit Bet </button>
        </div>

        <CountGraph 
            count = {count} 
        />
    </div>
  );
}

export default App;
