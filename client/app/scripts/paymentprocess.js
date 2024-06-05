class PaymentProcessor {
    constructor(cardManager) {
        this.cardManager = cardManager;
        this.paymentMethods = ["Mastercard"];
        this.currentPayment = null;
    }

    startPayment(method, cardIndex, amount) {
        if (!this.paymentMethods.includes(method)) {
            return { success: false, message: "Invalid payment method" };
        }

        const card = this.cardManager.getCard(cardIndex);
        if (!card) {
            return { success: false, message: "Invalid card index" };
        }

        this.currentPayment = {
            method,
            card,
            amount,
            status: "pending",
            timeStarted: new Date().getTime()
        };

        return { success: true, message: `Payment of ${amount} started using ${method} ending in ${card.number.slice(-4)}` };
    }

    cancelPayment() {
        if (this.currentPayment) {
            this.currentPayment.status = "cancelled";
            this.currentPayment = null;
            return { success: true, message: "Payment cancelled" };
        } else {
            return { success: false, message: "No active payment to cancel" };
        }
    }

    completePayment() {
        if (!this.currentPayment) {
            return { success: false, message: "No active payment to complete" };
        }

        const currentTime = new Date().getTime();
        if (currentTime - this.currentPayment.timeStarted > 300000) { // 5 minutes
            this.currentPayment.status = "expired";
            this.currentPayment = null;
            return { success: false, message: "Payment time window expired" };
        }

        this.currentPayment.status = "completed";
        this.currentPayment = null;
        return { success: true, message: "Payment completed successfully" };
    }
}

module.exports = PaymentProcessor;
