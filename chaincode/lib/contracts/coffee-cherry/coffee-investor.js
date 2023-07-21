

'use strict'
const { CoffeeCherryContractBase } = require('./coffee-cherry-Contract-base');
const CoffeeCherry = require('../../models/coffee-cherry');
const Coffee = require('../../models/coffee');
const getDate = require('../../helper/get-date');
class CoffeeCherryInvestorContract extends CoffeeCherryContractBase {
    constructor() {
        //  super('de.adeymeselesh.CoffeeCherryContract.coffeegrower.processor');
        super('CoffeeCherryInvestorContract');
        this.txId = '';
    }
    async beforeTransaction(ctx) {
        this.txId = ctx.stub.getTxID();
        console.log(`${this.txId}`);
    }
    async initLedger(ctx) {

        console.log('cherry coffee init on investor');
    }
    async buyCoffeeCherry(ctx, owner, batchNumber, deliveryId, paidPrice) {
        this._require(owner, 'owner');
        this._require(batchNumber, 'batchNumber');
        this._require(deliveryId, 'deliveryId');

        const coffeeCherryByte = await stub.getState(this._createCoffeeCherryCK(ctx.stub, [owner, batchNumber, deliveryId]));
        const coffeecherryInstance = CoffeeCherry.from(coffeeCherryByte);
        coffeecherryInstance.paidPrice = paidPrice;
        coffeecherryInstance.txDate = getDate();

        await ctx.stub.putState(this._createCoffeeCherryCK(ctx.stub, [owner, batchNumber, deliveryId]), coffeecherryInstance.toBuffer())
    }


    async coffeeProduction(ctx, bagId, bagSize,
        coffeeType, coffeeCherryBatchNo, batchNumber,
        measurmentUnit, productionPlace,
        owner) {
        this._require(bagId, 'bagId');
        this._require(bagSize, 'bagSize');
        this._require(coffeeType, 'coffeeType');
        this._require(coffeeCherryBatchNo, 'coffeeCherryBatchNo');
        this._require(batchNumber, 'batchNumber');
        this._require(measurmentUnit, 'measurmentUnit');

        this._require(productionPlace, 'productionPlace');
        this._require(owner, 'owner');

        const coffee = Coffee.from({
            bagId: bagId,
            bagSize: bagSize,
            coffeeType: coffeeType,
            coffeeCherryBatchNo: coffeeCherryBatchNo,
            batchNumber: batchNumber,
            measurmentUnit: measurmentUnit,
            productionDate: getDate(),
            productionPlace: productionPlace,
            owner: owner,
            txId: this.txId
        }).toBuffer();

        await ctx.stub.putState(this._createCoffeeCK(ctx.stub, [batchNumber, bagId]), coffee);
    }

    async coffeeGrading(ctx, batchNumber, grade, gradeBy) {
        this._require(batchNumber, 'batchNumber');
        this._require(grade, 'grade');
        this._require(gradeBy, 'gradeBy');
        const keys = [];
        keys.push(batchNumber);
      
        for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey('Coffee', keys)) {
            const strValue = JSON.parse(Buffer.from(value).toString('utf8'));
            const coffee = Coffee.from(strValue);
            coffee.grade = grade;
            coffee.gradeBy = gradeBy;
            coffee.gradeDate = getDate();
            await ctx.stub.putState(this._createCoffeeCK(ctx.stub, [batchNumber, coffee.bagId]), coffee.toBuffer());
        }
    }

    async coffeeWarehousing(ctx, owner, batchNumber, warehouseId, fromDate, toDate) {
        this._require(batchNumber, 'owner');
        this._require(batchNumber, 'batchNumber');
        this._require(warehouseId, 'warehouseId');
        // this._requireWarehouse(ctx.stub, warehouseId);
        const keys = [];
        keys.push(owner);
        keys.push(batchNumber);
        for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey('Coffee', keys)) {
            const strValue = JSON.parse(Buffer.from(value).toString('utf8'));
            const coffee = Coffee.from(strValue);
            console.info(coffee);
            coffee.warehouseId = warehouseId;
            coffee.fromDate = fromDate;
            coffee.toDate = toDate;
            await ctx.stub.putState(this._createCoffeeCK(ctx.stub, [batchNumber, coffee.bagId]), coffee.toBuffer());
        }
    }

    async getCoffeeCherryByOwner(ctx, owner){
        const keys = [];
        const allResults = [];

        keys.push(owner);
        for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey('CoffeeCherry', keys)) {
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


    async getCoffeeCherryDelivery(ctx, owner, batchNumber, deliveryId) {
        const coffeeCherryBytes = await ctx.stub.getState(this._createCoffeeCherryCK(ctx.stub, [owner, batchNumber, deliveryId]));
        if (!coffeeCherryBytes || coffeeCherryBytes.length === 0) {
            throw new Error(`${id} dpes not exist`);
        }
        return coffeeCherryBytes.toString();
    }
    async getCoffeeCherryBatchDelivery(ctx, owner, batchNumber) {
        const keys = [];
        const allResults = [];

        keys.push(owner);
        keys.push(batchNumber);

        for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey('CoffeeCherry', keys)) {
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

    async getAllCoffeeCherry(ctx) {
        const keys = [];
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey('CoffeeCherry', keys)) {
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

    async getCoffee(ctx, batchNumber, bagId) {
        const coffeeBytes = await ctx.stub.getState(this._createCoffeeCK(ctx.stub, [batchNumber, bagId]));
        if (!coffeeBytes || coffeeBytes.length === 0) {
            throw new Error(`${id} dpes not exist`);
        }
        return coffeeBytes.toString();
    }
    async getCoffeeBatch(ctx, batchNumber) {
        const keys = [];
        const allResults = [];
        keys.push(batchNumber);
        for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey('Coffee', keys)) {
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
    async getAllCoffee(ctx) {
        const keys = [];
        const allResults = [];
        for await (const { key, value } of ctx.stub.getStateByPartialCompositeKey('Coffee', keys)) {
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


    async _getAllCoffee(stub) {
        const keys = [];
        const allResults = [];
        for await (const { key, value } of stub.getStateByPartialCompositeKey('Coffee', keys)) {
            const strValue = Buffer.from(value).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(JSON.parse(strValue));
            console.info(strValue);
        }
        console.info(allResults);
        return allResults;
    }
}

module.exports = CoffeeCherryInvestorContract