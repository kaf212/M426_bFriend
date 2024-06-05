class CreditCardManager {
    constructor() {
        this.cards = [];
        this.maxCards = 5;
    }

    validateCard(card) {
        const mastercardRegex = /^5[1-5][0-9]{14}$/;
        return mastercardRegex.test(card.number) && card.expiry && card.cvc;
    }

    addCard(card) {
        if (this.cards.length >= this.maxCards) {
            return { success: false, message: "Cannot add more than 5 cards" };
        }

        if (!this.validateCard(card)) {
            return { success: false, message: "Invalid card details" };
        }

        this.cards.push(card);
        return { success: true, message: "Card added successfully" };
    }

    editCard(index, newCard) {
        if (index < 0 || index >= this.cards.length) {
            return { success: false, message: "Invalid card index" };
        }

        if (!this.validateCard(newCard)) {
            return { success: false, message: "Invalid card details" };
        }

        this.cards[index] = newCard;
        return { success: true, message: "Card edited successfully" };
    }

    getCards() {
        return this.cards.map(card => ({
            number: "**** **** **** " + card.number.slice(-4),
            expiry: card.expiry
        }));
    }

    getCard(index) {
        return this.cards[index] || null;
    }
}

module.exports = CreditCardManager;
