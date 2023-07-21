'use strict'

class CoffeeTransactionCenter {
    constructor() {
        this.txId = '';
        this.place = ''; //ON_FARM, WASHED_AND_UNWASHED_COFFEE_PROCESSING_INDUSTRY, FIRST_LEVEL_COFFEE_TRANSACTION_CENTER, PLACE_MENTIONED_IN_CONTRACT, ECX, FORIEN_MARKET, WAREHOUSE, ON_TRANSPORTATION
        this.level = '';
        this.address = '';
        this.size = '';
        this.capacity = '';
        this.coffeeProducers = 0;
        this.farmSize = 0;
        this.hasSortingBed = false;
        this.hasParkingPlace = false;
        this.hasDailyMarketPriceTickerBoard = false;
        this.hasDryWestDisposal = false;
        this.status = ''; //active, in active
        this.stablishedAt = '';
        this.latitude = '';
        this.longitude = '';
        this.txId = '';
    }

    static from(bufferOrJson) {
        if (Buffer.isBuffer(bufferOrJson)) {
            if (!bufferOrJson.length) {
                return;
            }

            bufferOrJson = JSON.parse(bufferOrJson.toString('utf-8'));
        }

        const result = new CoffeeTransactionCenter();
        result.txId = bufferOrJson.id;
        result.place = bufferOrJson.place;
        result.level = bufferOrJson.level;
        result.address = bufferOrJson.address;
        result.size = bufferOrJson.size;
        result.capacity = bufferOrJson.capacity;
        result.coffeeProducers = bufferOrJson.coffeeProducers;
        result.farmSize = bufferOrJson.farmSize;
        result.hasSortingBed = bufferOrJson.hasSortingBed;
        result.hasParkingPlace = bufferOrJson.hasParkingPlace;
        result.hasDailyMarketPriceTickerBoard = bufferOrJson.hasDailyMarketPriceTickerBoard;
        result.hasDryWestDisposal = bufferOrJson.hasDryWestDisposal;
        result.status = bufferOrJson.status;
        result.stablishedAt = bufferOrJson.stablishedAt;
        result.latitude = bufferOrJson.latitude;
        result.longitude = bufferOrJson.longitude
        result.txId = bufferOrJson.txId;
        return result;
    }
    toJson() {
        return JSON.stringify(this);
    }
    toBuffer() {
        return Buffer.from(this.toJson());
    }
}

module.exports = CoffeeTransactionCenter;