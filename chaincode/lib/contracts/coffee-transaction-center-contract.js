'use strict'
const { Contract } = require('fabric-contract-api');
const getDate = require('../helper/get-date');
const CoffeeTransactionCenter = require('../models/coffee-transaction-center')
class CoffeeTransactionCenterContract extends Contract {
    constructor() {
        super('CoffeeTransactionCenterContract');
        this.txId = '';
    }

    async beforeTransaction(ctx) {
        this.txId = ctx.stub.getTxID();
        console.log(`${this.txId}`);
    }

    async initLedger(ctx) {
        console.log("CoffeeTransactionCenterContract");
    }

    async addNewTransactionCenter(ctx, place, address, size, capacity,
        coffeeProducers, farmSize, hasSortingBed, hasParkingPlace, hasDailyMarketPriceTickerBoard,
        hasDryWestDisposal, stablishedAt,  latitude, longitude) {
        this._require(place, 'place');
        this._require(address, 'address');
        this._require(size, 'size');
        this._require(capacity, 'capacity');
        this._require(coffeeProducers, 'coffeeProducers');
        this._require(farmSize, 'farmSize');
        this._require(hasSortingBed, 'hasSortingBed');
        this._require(hasParkingPlace, 'hasParkingPlace');
        //this._requireRegionalOrgan(ctx);
        const txCenter = CoffeeTransactionCenter.from({
            place: place,
            address: address,
            size: size,
            capacity: capacity,
            coffeeProducers: coffeeProducers,
            farmSize: farmSize,
            hasSortingBed: hasSortingBed,
            hasParkingPlace: hasParkingPlace,
            hasDailyMarketPriceTickerBoard: hasDailyMarketPriceTickerBoard,
            hasDryWestDisposal: hasDryWestDisposal,
            status: 'active',
            stablishedAt: stablishedAt,
            latitude: latitude,
            longitude: longitude,
            txId: this.txId
        }).toBuffer();
        await ctx.stub.putState(this._createCK(ctx.stub,), [this.txId].txCenter);

    }

    async deleteCoffeeTransactionCenter(ctx, txId) {
        this._require(txId, 'txId');

        await ctx.stub.deleteState(this._createCK(ctx.stub, txId));
    }

    async getCoffeeTransactionCenter(ctx, id) {

        const certificateBytes = await ctx.stub.getState(this._createCK(ctx.stub, [id]));
        if (!certificateBytes || certificateBytes.length === 0) {
            throw new Error(`${id} certificate not exist`);
        }
        return certificateBytes.toString();
    }



    async getAllCoffeeTransactionCenter(ctx) {
        const keys = [];
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey('CoffeeTransactionCenter', keys)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: key, Record: record });
        }
        console.info(allResults);
        return JSON.stringify(allResults);
    }

    _createCK(stub, keys) {
        return stub.createCompositeKey('CoffeeTransactionCenter', keys);
    }

    _require(value, name) {
        if (!value) {
            throw new Error(`Parameter ${name} is missing.`);
        }
    }

    _requireRegionalOrgan(ctx) {
        if (ctx.ClientIdentity.getMSPID() !== 'RegionalOrganMSP') {
            throw new Error('This chaincode function can only called by regional organ')
        }
    }

}

module.exports = CoffeeTransactionCenterContract;