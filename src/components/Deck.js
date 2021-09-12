const initDeck = decks => {
    let deck = [];
    let numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A'];
    let suits = ['spades', 'clubs', 'hearts', 'diamonds'];

    for (let i = 0; i < decks; i++)
        for (let j of numbers) 
            for (let k of suits) 
                deck.push({number: j, suit: k})

    return deck;
}

class Deck {
    constructor(numberOfDecks) {
        this.deck = initDeck(numberOfDecks);
        this.usedCards = [];
    }

    getRandomCard() {
        let randNum = Math.floor((Math.random() * this.deck.length));
        let randCard = this.deck[randNum];

        this.usedCards.push(randCard);
        this.deck.splice(randNum, 1);
        
        return randCard;
    }

    getUsedCards() {
        return this.usedCards;
    }
}

export default Deck
