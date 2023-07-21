'use strict'

class CoffeeDailyPrice {
    constructor() {
        this.id = '';
        this.date = '';
        this.coffeeType = '';
        this.grade = '';
        this.price = '';
        this.currency = '';
        this.measurmentUnit = '';
        this.txId = '';
    }
    static from(bufferOrJson) {
        if (Buffer.isBuffer(bufferOrJson)) {
            if (!bufferOrJson.length) {
                return;
            }
            bufferOrJson = JSON.parse(bufferOrJson.toString('utf-8'));
        }

        const price = new CoffeeDailyPrice();
        price.id = bufferOrJson.id;
        price.date = bufferOrJson.date;
        price.coffeeType = bufferOrJson.coffeeType;
        price.grade = bufferOrJson.grade;
        price.price = bufferOrJson.price;
        price.currency = bufferOrJson.currency;
        price.measurmentUnit = bufferOrJson.measurmentUnit;
        price.txId = bufferOrJson.txId;
        return price;
    }

    toJson() {
        return JSON.stringify(this);
    }
    toBuffer() {
        return Buffer.from(this.toJson());
    }
}


module.exports = CoffeeDailyPrice;