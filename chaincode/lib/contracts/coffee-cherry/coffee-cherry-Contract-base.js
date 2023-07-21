'use strict'


const { Contract } = require('fabric-contract-api');
const CoffeeCherry = require('../../models/coffee-cherry');

class CoffeeCherryContractBase extends Contract {
    constructor(namespace) {
        super(namespace);
    }
// [deliveredTo, batchNumber, deliveryId]
    _createCoffeeCherryCK(stub, keys) {
        return stub.createCompositeKey('CoffeeCherry', keys);
    }
    _createCoffeeCK(stub, keys) {
        return stub.createCompositeKey('Coffee', keys);
    }
    _createCoffeeGrowerCK(stub, id) {
        return stub.createCompositeKey('CoffeeGrower', [`${id}`]);
    }

    _createWarehouseCK(stub, id) {
        return stub.createCompositeKey("Warehouse", [`${id}`]);
      }

    async _getCoffeeCherry(stub, keys) {
        const redCherryCoffeeBytes = await stub.getState(this._createCoffeeCherryCK(stub, keys));
        return CoffeeCherry.from(redCherryCoffeeBytes);
    }

    async _doesCofffeeCheryExist(stub, keys){
        const redCherryCoffeeBytes = await stub.getState(this._createCoffeeCherryCK(stub, keys));
        return !! redCherryCoffeeBytes && redCherryCoffeeBytes.toString().length > 0;
    }
    _require(value, name) {
        if (!value) {
            throw new Error(`Parameter ${name} is missing.`);
        }
    }

    _toBuffer(obj) {
        return Buffer.from(JSON.stringify(obj));
    }

    _fromBuffer(buffer) {
        if (Buffer.isBuffer(buffer)) {
            if (!buffer.length) {
                return;
            }
        }

        return JSON.parse(buffer.toString('utf-8'));
    }
}

module.exports = { CoffeeCherryContractBase };